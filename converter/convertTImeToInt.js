const convertTimeToInt = (timeStr) => {
    const obj = new Date(`1970-01-01T${timeStr}Z`);
    const hours = obj.getUTCHours();
    const minutes = obj.getUTCMinutes();
    const seconds = obj.getUTCSeconds();
    const timeInMinutes = hours*60 + minutes + seconds/60;
    return timeInMinutes;
};

module.exports = convertTimeToInt;