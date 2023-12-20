const timeSpend = (start, end) => {
    let minuteSpend = end - start;
    if (end < start) {
        minuteSpend += 24 * 60;
        return minuteSpend;
    };
    return minuteSpend;
};

module.exports = timeSpend;