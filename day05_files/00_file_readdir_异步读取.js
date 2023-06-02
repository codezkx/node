const fs = require('fs');
const path = require('path');
const textFile = path.resolve(path.dirname(__filename), 'readFile');

/* 
    fs.readFile(path[, options], callback)
        参数
            path <string> | <Buffer> | <URL> | <integer> 文件名或文件描述符
            options <Object> | <string>
                encoding <string> | <null> 默认值： null
                flag <string> 参见 支持文件系统 flags。 默认值: 'r'。
                signal <AbortSignal> 允许中止正在进行的读取文件
            callback <Function>
                err <Error> | <AggregateError>
                data <string> | <Buffer>
*/

fs.readdir(textFile, {
    encoding: 'utf-8',
    // withFileTypes: true, 
    recursive: true,
}, (err, files) => {
    files.forEach((file, index) => {
        const filePath = path.resolve(textFile, file)
        fs.readFile(filePath, (err, buf) => { // 异步读取
            console.log(buf)
            // const bufStr = buf.toString()
            // console.log(bufStr);
        });
    })
})








