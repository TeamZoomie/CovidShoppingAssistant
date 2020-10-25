export function getCurrentBusynessFromTimezone(populartimes, utcHourDiff=8) {
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