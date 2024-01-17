const path = require('path');
const fs = require('fs');
const { Buffer } = require('buffer');
const { ancientPoetry } = require('./data');

const filePath = path.join(__dirname, 'mkdir');
/* 
    fs.access(path[, mode], callback)
        path <string> | <Buffer> | <URL>
        mode <integer> 默认值： fs.constants.F_OK
        callback <Function>
            err <Error>

    测试用户对 path 指定的文件或目录的权限。 mode 参数是可选的整数，指定要执行的可访问性检查。 mode 应该是值 fs.constants.F_OK 或由 fs.constants.R_OK、fs.constants.W_OK 和 fs.constants.X_OK 中的任何一个（例如 fs.constants.W_OK | fs.constants.R_OK）的按位或组成的掩码。 检查 文件访问常量 以获得 mode 的可能值。

    最后一个参数 callback 是回调函数，其使用一个可能的错误参数调用。 如果任何可访问性检查失败，则错误参数将是 Error 对象。 以下示例检查 package.json 是否存在，以及是否可读或可写。


    注意：
        在调用 fs.open()、fs.readFile() 或 fs.writeFile() 之前，不要使用 fs.access() 检查文件的可访问性。 这样做会引入竞争条件，因为其他进程可能会在两次调用之间更改文件的状态。 而是，用户代码应直接打开/读取/写入文件，并处理无法访问文件时引发的错误。
*/

console.log(fs.constants, 'fs.constants')

fs.access(filePath, fs.constants.X_OK, (err) => {
    console.log(err);
})

