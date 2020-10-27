import classifyPoint from 'robust-point-in-polygon';
import polylabel from 'polylabel';
import { Permutation } from 'js-combinatorics';
import PF from 'pathfinding';


export function getCurrentBusynessFromTimezone(populartimes, utcHourDiff=10) {
    if (populartimes.length !== 7) {
        return -1;
    }

    const currentTime = new Date();
    const hour =  (currentTime.getUTCHours() + utcHourDiff) % 24;
    const day = ((currentTime.getDay() - 1) % 7 + 7) % 7

    return populartimes[day].data[hour];
}

export function getBusynessText(busyness) {
    if (busyness == 0) {
        return 'Empty'
    } else if (0 < busyness && busyness < 20) {
        return 'Quiet';
    } else if (20 <= busyness && busyness < 40) {
        return 'Reasonably quiet';
    } else if (40 <= busyness && busyness < 60) {
        return 'Somewhat busy';
    } else if (60 <= busyness && busyness < 80) {
        return 'Busy';
    } else if (80 <= busyness && busyness) {
        return 'Very busy';
    }
    return 'No crowd data'
}

export function isWalkable(store, point, includeBorder=false) {
    if (classifyPoint(store.background, point) >= 0) {
        return false;
    }
    for (let geoType of ['shelves', 'registers', 'selfServe']) {
        for (const entry of store[geoType]) {
            const geo = entry.geo || entry;
            const result = classifyPoint(geo, point);
            if (!includeBorder) {
                if (result == 0) {
                    return false;
                }
            }
            if (result < 0) {
                return false;
            }
        }
    }
    return true;
}

export function generatePath(store, gridData, tasks, scaleFactor=15) {

    let geoCentres = []
    for (let task of tasks) {
        const geo = store.categories[task][0].geo;
        geoCentres.push(polylabel([geo], 1.0));
    }

    // Work out entry points for each task
    const ITERATIONS = 5;

    let entryPoints = [];        
    for (let t = 0; t < tasks.length; t++) {

        let found = false;
        const centre = geoCentres[t];
        let i = 0;
        while (i < ITERATIONS) {
            for (let dir of [[0, 1], [0, -1], [1, 0], [-1, 0]]) {
                const [x, y] = centre.map(e => Math.round(e) + i * dir[i]);
                if (isWalkable(store, [x, y], true)) {
                    entryPoints.push([x, y]);
                    found = true;
                    gridData[y][x] = 0;
                    break;
                }
            }

            if (found) break;
            i++;
        }

        if (!found) {
            tasks.splice(t, 1);
            geoCentres.splice(t, 1);
            t--;
        }
    }

    if (tasks.length === 0) {
        return [[], [], []]
    }

    // Compute paths
    const finder = new PF.AStarFinder({ weight: 4 });
    let grid = new PF.Grid(gridData)

    let paths = Array(tasks.length).fill().map(() => Array(tasks.length).fill([]));
    let dist = Array(tasks.length).fill().map(() => Array(tasks.length).fill(-1));

    for (let i = 0; i < tasks.length; i++) {
        for (let j = 0; j < tasks.length; j++) {
            if (j !== i) {
                // Compute shortest path
                let [x1, y1] = entryPoints[i];
                let [x2, y2] = entryPoints[j];
                let path = finder.findPath(x1, y1, x2, y2, grid.clone());

                paths[i][j] = path;
                dist[i][j] = path.length - 1;
            }
        }
    }

    // Just hardcode the first one for now
    let [ex, ey] = store.entries[0];
    let entrancePaths = Array(tasks.length).fill([]);
    let entranceDist = Array(tasks.length).fill([]);

    for (let i = 0; i < tasks.length; i++) {
        let path = finder.findPath(ex, ey, entryPoints[i][0], entryPoints[i][1], grid.clone());
        entrancePaths[i] = path;
        entranceDist[i] = path.length - 1;
    }

    // Loop through combinations (easiest)
    let min = Infinity;
    let best = [...Array(tasks.length).keys()]
    let permutations = new Permutation([...Array(tasks.length).keys()])

    for (let p of [...permutations]) {
        let pathCost = 0;
        for (let [i, t] of p.entries()) {
            if (i !== 0) {
                pathCost += dist[p[i - 1]][t]
            }
        }
        pathCost += entranceDist[p[0]];
        if (pathCost < min) {
            min = pathCost;
            best = p;
        }
    }
    let path = [];
    path.push(...PF.Util.compressPath(entrancePaths[best[0]]));
    for (let i = 1; i < tasks.length; i++) {
        let newPath = PF.Util.compressPath(paths[best[i - 1]][best[i]])
        path.push(...newPath)
    } 

    let tooltips = [];
    for (let i = 0; i < tasks.length; i++) {
        tooltips.push({
            order: best.indexOf(i),
            category: tasks[i],
            position: geoCentres[i].map(e => e * scaleFactor)
        })
    }

    return [path, tooltips, best];
}

export function buildGrid(store, width, height) {
    let grid = Array(height).fill().map(() => Array(width).fill(1));
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            if (isWalkable(store, [i, j])) {
                grid[j][i] = 0;
            }
        }
    }
    return grid;
}

export function groupListData(list) {
    const listGroups = {};
    for (let [id, item] of Object.entries(list.items)) {
        if (!(item.category in listGroups)) {
            listGroups[item.category] = {
                id: Object.keys(listGroups).length,
                header: item.category,
                category: item.category,
                subItems: [],
            }
        } 
        listGroups[item.category].subItems.push({ ...item, id });
    }
    return listGroups;
}