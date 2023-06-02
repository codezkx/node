const path = require('path');

/* 
    delimiter: 属性
    return: <string> 提供特定于平台的路径定界符
*/
console.log(path.delimiter)
console.log(process.env.PATH)
console.log(process.env.PATH.split(path.delimiter))
