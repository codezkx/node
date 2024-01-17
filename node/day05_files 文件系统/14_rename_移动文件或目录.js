const path = require('path');
const fs = require('fs');
const { Buffer } = require('buffer');
const { ancientPoetry } = require('./data');

const mkdirPath = path.resolve(__dirname, 'mkdir1');

const readPath = path.resolve(__dirname, 'readFile');


/* 
    fs.rename(oldPath, newPath, callback)
        oldPath <string> | <Buffer> | <URL>
        newPath <string> | <Buffer> | <URL>
        callback <Function>
            err <Error>
    将 oldPath 处的文件异步重命名为作为 newPath 提供的路径名。 如果 newPath 已经存在，则它将被覆盖。 如果 newPath 是目录，则会引发错误。 除了可能的异常之外，没有为完成回调提供任何参数。

*/

// fs.rename(readPath, mkdirPath, (err) => {
//     if (err) throw new Error(err)
// })

// fs.rename(mkdirPath, readPath, (err) => {
//     if (err) throw new Error(err)
// })


