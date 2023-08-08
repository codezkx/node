const toString = Object.prototype.toString

export const formatQuery = (data) => {
    if (toString.call(data) !== "[object Object]") {
        return '';
    }
    let query = null;
    const keys = Object.keys(data)
    const len = keys.length - 1
    keys?.forEach((k, index) => {
        if (index === 0) {
            query = '?';
        }
        const str =  len !== index ? `${k}=${data[k]}&` : `${k}=${data[k]}`
        query += str
    })
    return query
}
