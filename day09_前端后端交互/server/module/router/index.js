
const getModuleExports = () => {
    return new Promise((res, rej) => {
        res(null)
    }).then(() => {
        const result = require('../express');
        return result
    })
}



module.exports = getModuleExports()

