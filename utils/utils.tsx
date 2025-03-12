export function formatNumber(value: number): string {
    if (value >= 1000000000) return (value / 1000000000).toFixed(1) + "B";
    if (value >= 1000000) return (value / 1000000).toFixed(1) + "M";
    if (value >= 1000) return (value / 1000).toFixed(1) + "K";
    return value.toString();
}

export function getUnixValues() {
    const todayUnix = Math.floor(Date.now() / 1000)
    const sixMonthsAgoUnix = Math.floor((Date.now() - 6 * 30 * 24 * 60 * 60 * 1000) / 1000)
    return {
        todayUnix,
        sixMonthsAgoUnix,
    }
}

export function unixTimeToMonthYear  (timestamp: number)  {
    const date = new Date(timestamp * 1000);
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return date.toLocaleDateString('en-US', options)
};
