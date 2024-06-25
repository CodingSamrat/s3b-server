function getExpiryTime(duration) {
    // 1d = Date.now() + One Day...
    const millisecondsInSecond = 1000;
    const secondsInMinute = 60;
    const minutesInHour = 60;
    const hoursInDay = 24;

    const regex = /^(\d+)([dhm])$/;
    const match = duration.match(regex);

    if (!match) {
        throw new Error('Invalid duration format');
    }

    const value = parseInt(match[1]);
    const unit = match[2];

    let milliseconds;
    switch (unit) {
        case 'd':
            milliseconds = value * hoursInDay * minutesInHour * secondsInMinute * millisecondsInSecond;
            break;
        case 'h':
            milliseconds = value * minutesInHour * secondsInMinute * millisecondsInSecond;
            break;
        case 'm':
            milliseconds = value * secondsInMinute * millisecondsInSecond;
            break;
        default:
            throw new Error('Unknown duration unit');
    }

    return new Date(Date.now() + milliseconds)
}


function getMillisecondToDay(duration) {
    // 1d = Date.now() + One Day...
    const millisecondsInSecond = 1000;
    const secondsInMinute = 60;
    const minutesInHour = 60;
    const hoursInDay = 24;

    const regex = /^(\d+)([dhm])$/;
    const match = duration.match(regex);

    if (!match) {
        throw new Error('Invalid duration format');
    }

    const value = parseInt(match[1]);
    const unit = match[2];

    let milliseconds;
    switch (unit) {
        case 'd':
            milliseconds = value * hoursInDay * minutesInHour * secondsInMinute * millisecondsInSecond;
            break;
        case 'h':
            milliseconds = value * minutesInHour * secondsInMinute * millisecondsInSecond;
            break;
        case 'm':
            milliseconds = value * secondsInMinute * millisecondsInSecond;
            break;
        default:
            throw new Error('Unknown duration unit');
    }

    return milliseconds
}


export { getExpiryTime, getMillisecondToDay }



// Example usage
// console.log(convertToMilliseconds('1d')); // Output: 86400000
// console.log(convertToMilliseconds('1h')); // Output: 3600000
// console.log(convertToMilliseconds('1m')); // Output: 60000
