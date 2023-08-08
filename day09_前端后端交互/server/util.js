
const getQuery = (str) => {
    if (!str) {
        return '';
    }
    let queryList = str.split('&');
    const qeury = {}
    queryList.forEach(query => {
        const mapList = query.split('=');
        qeury[mapList[0]] = mapList[1];
    })
    return qeury
}
module.exports = {
    getQuery
}