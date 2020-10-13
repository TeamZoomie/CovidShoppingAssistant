import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';
import { Button } from '@ui-kitten/components';
import Svg, {
    G,
    Circle,
    Path,
    Polygon,
    Polyline,
    Line,
    Rect,
    Text
  } from 'react-native-svg';
import ZoomableSvg from 'zoomable-svg';
import polylabel from 'polylabel';
import classifyPoint from 'robust-point-in-polygon';
import { Permutation } from 'js-combinatorics';
import PF from 'pathfinding';
import stores from '../store-maps/stores';

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    root: {
        paddingBottom: 8
    },
    container: {
        backgroundColor: '#ecf0f1',
    },
});

const theme = {
    background: '#E6E6E6',
    base: '#fff',
    shelves: '#DDDDDD',
    registers: '#ADADAD',
    categories: {
        fruitVeg: '#A1FFBC',
        naturalWholeFoods: '#68A379',
        kitchenAccessories: '#5C5C5C',
        canned: '#5C5C5C',
        gardenAccessories: '#C9F3BF'
    },
    path: '#3b8ada',
    tooltipBorder: '#656565'
};


const SCALE_FACTOR = 15;

function rescale(geo) {
    return geo.map(([x, y]) => [x * SCALE_FACTOR, y * SCALE_FACTOR]);
}

function Tooltip(props) {
    const { text, geo, width, height, position } = props;
    const [x, y] = position;
    const [pointerWidth, pointerHeight] = [20, 7];
    const pointer = [
        [x - pointerWidth / 2, y - pointerHeight], 
        [x, y], 
        [x + pointerWidth / 2, y - pointerHeight]
    ];
    const fontSize = 25;

    return (
        <G font-size={fontSize}>
            <Path
                d={`M${x - width / 2 + 5},${y - height - pointerHeight}
                    h${width - 10}
                    q5,0 5,5
                    v${height - 10}
                    q0,5 -5,5
                    h${(-width / 2 + pointerWidth / 2) + 5}
                    L${x},${y}
                    L${pointer[0][0]},${pointer[0][1]}
                    h${(-width / 2 + pointerWidth / 2) + 5}
                    q-5,0 -5,-5
                    v${-height + 10}
                    q0,-5 5,-5
                    z
                `}
                fill="#fff"
                stroke={theme.tooltipBorder}
                strokeWidth={3}
            />
            <Text  
                x={x} 
                y={y - pointerHeight - height / 2 + fontSize / 2} 
                fill="black"
                textAnchor="middle"
                height={fontSize}
                width={width}
                dy={fontSize * -0.25}
                // style={{textAlignVertical: 'center'}}
            >
                    {text}
            </Text>
        </G>
    )
} 


class MapSVG extends Component {

    state = {
        selected: undefined,
        walkablePoints: []
    }

    onPress = (id, type) => {
        console.log('selected geo ' + id + ' type ' + type)
        this.setState({ selected: { id, type } })
    }

    onBackgroundPress = () => {
        console.log('background press')
        this.setState({ selected: undefined });
    }

    render() {
        const { store, theme, path, tooltips, entrance, transform } = this.props;
        const labels = {
            fruitVeg: 'Fruit & Vegetables',
            naturalWholeFoods: 'Natural & Whole foods',
            kitchenAccessories: 'Kitchen Accessories',
            gardenAccessories: 'Garden Accessories',
            canned: 'Canned Foods'
        };

        const debug = this.props.debug || false;
        let selected = this.state.selected !== undefined;
        const selectedGeo = selected ? 
                            store.categories[this.state.selected.type][this.state.selected.id].geo :
                            [];
        const rescaledPath = path.length > 0 ? rescale(path) : [];
        return (
            <Svg width={width} height={500} onPress={this.onBackgroundPress}>
                <G transform={transform}>
                    <Polygon
                        points={store.background.map(p => p.map(a => a * SCALE_FACTOR).join(',')).join(' ')}
                        fill={theme.base}
                    />
                    {store.shelves.map((shelf, id) => (
                        <Polygon
                            key={id}
                            points={shelf.geo.map(p => p.map(a => a * SCALE_FACTOR).join(',')).join(' ')}
                            fill={theme.shelves}
                        />
                    ))}
                    {store.registers.map((r, id) => (
                        <Polygon
                            key={id}
                            points={r.geo.map(p => p.map(a => a * SCALE_FACTOR).join(',')).join(' ')}
                            fill={theme.registers}
                        />
                    ))}
                    {store.selfServe.map((counter, id) => (
                        <Polygon
                            key={id}
                            points={counter.geo.map(p => p.map(a => a * SCALE_FACTOR).join(',')).join(' ')}
                            fill={theme.registers}
                        />
                    ))}
                    {Object.entries(store.categories).map(([k, v]) => (
                        v.map((entry, id) => {
                            const selected = this.state.selected && this.state.selected.id === id && this.state.selected.type === k;
                            const points = entry.geo.map(p => p.map(a => a * SCALE_FACTOR));
                            return (
                                <Polygon
                                    key={id}
                                    points={points.map(p => p.join(',')).join(' ')}
                                    fill={theme.categories[k]}
                                    onPress={() => this.onPress(id, k)}
                                />
                            );
                        })
                    ))}
                    {path.length > 0 && (
                        <Path
                            d={"M " + rescaledPath[0].join(',') + rescaledPath.slice(1).map(([x, y]) => `L ${x},${y}`).join(" ")}
                            stroke={theme.path}
                            strokeWidth={7}
                            strokeDasharray='25, 2'
                        />
                    )}
                    <Rect
                        x={entrance[0] - 30}
                        y={entrance[1] - 25}
                        width={60}
                        height={30}
                        rx={5}
                        fill="#fff"
                        stroke={theme.tooltipBorder}
                        strokeWidth={3}
                    />
                    <Text
                        x={entrance[0]} 
                        y={entrance[1]} 
                        fill="black"
                        textAnchor="middle"
                        height={30}
                        width={70}
                        dy={25 * -0.25}
                    >
                        Entry
                    </Text>
                    {/* {tooltips && tooltips.map((tooltip, i) => (
                        <Tooltip 
                            key={i}
                            width={130}
                            height={40}
                            text={labels[tooltip.category]} 
                            position={tooltip.position}
                            // geo={tooltip.geo}
                        />
                    ))} */}
                    {selected && (
                        <Tooltip 
                            width={130}
                            height={40}
                            text={labels[this.state.selected.type]} 
                            position={polylabel([selectedGeo], 1.0).map(e => e * SCALE_FACTOR)}
                        />
                    )}
                    {debug && this.props.walkablePoints.map(([x, y], id) => (
                        <Circle
                            key={id}
                            r={1}
                            cx={x}
                            cy={y}
                            fill="red"
                        />
                    ))}
                </G>
            </Svg>
        );  
    }
}
  
export default class Map extends Component {
    state = {
        type: 1,
        constrain: true,
        constraints: {
            // combine: 'dynamic',
            // scaleExtent: [width / height, 5],
            // translateExtent: [[0, 0], [100, 100]],
        },
        walkablePoints: [],
        entryPoints: [],
        path: [],
        store: stores.coles,
        width: 62,
        height: 26,
    };

    componentDidMount() {
        let grid = this.buildGrid();
        this.generatePath(grid, this.props.tasks);
    }

    isWalkable(point, includeBorder=false) {
        if (classifyPoint(this.state.store.background, point) >= 0) {
            return false;
        }
        for (let geoType of ['shelves', 'registers', 'selfServe']) {
            for (const entry of this.state.store[geoType]) {
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

    buildGrid() {
        let grid = Array(this.state.height).fill().map(() => Array(this.state.width).fill(1));
        for (let i = 0; i < this.state.width; i++) {
            for (let j = 0; j < this.state.height; j++) {
                if (this.isWalkable([i, j])) {
                    grid[j][i] = 0;
                }
            }
        }
        return grid;
    }

    generatePath(grid_data, tasks) {
        let geoCentres = []
        for (let task of tasks) {
            const geo = this.state.store.categories[task][0].geo;
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
                    if (this.isWalkable([x, y], true)) {
                        entryPoints.push([x, y]);
                        found = true;
                        grid_data[y][x] = 0;
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

        // Compute paths
        const finder = new PF.AStarFinder({ weight: 4 });
        let grid = new PF.Grid(grid_data)

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
        let [ex, ey] = this.state.store.entries[0];
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
                category: tasks[i],
                position: geoCentres[i].map(e => e * SCALE_FACTOR)
            })
        }
        this.setState({ path, tooltips });
    }

    render() {
        const { constrain, constraints } = this.state;
        return (
            <View style={{ backgroundColor: theme.background }} onPress={this.onBackgroundPress}>
                <ZoomableSvg
                    vbWidth={500}
                    vbHeight={500}
                    width={width}
                    height={height}
                    initialTop={-150}
                    initialLeft={-50}
                    initialZoom={1}
                    // doubleTapThreshold={300}
                    meetOrSlice="meet"
                    svgRoot={MapSVG}
                    childProps={{ 
                        store: stores.coles, 
                        theme,
                        path: this.state.path,
                        tooltips: this.state.tooltips,
                        debug: false,
                        entrance: this.state.store.entries[0].map(e => e * SCALE_FACTOR)
                    }}
                    constrain={constrain ? constraints : null}
                />
            </View>
        );
    }
}