const fs = require('fs');
const path = require('path');
const textFile = path.resolve(path.dirname(__filename), 'readFile');

/* 
    fs.readFile(path[, options], callback)
        参数
            path <string> | <Buffer> | <URL>
            options <string> | <Object>
                encoding <string> 默认值： 'utf8'
                withFileTypes <boolean> 默认值： false
            callback <Function>
                err <Error>
                files <string[]> | <Buffer[]> | <fs.Dirent[]>

        读取目录的内容。 回调有两个参数 (err, files)，其中 files 是目录中文件名的数组，不包括 '.' 和 '..'。

        可选的 options 参数可以是指定编码的字符串，也可以是具有 encoding 属性（指定用于传给回调的文件名的字符编码）的对象。 如果 encoding 设置为 'buffer'，则返回的文件名将作为 <Buffer> 对象传入。

        如果 options.withFileTypes 设置为 true，则 files 数组将包含 <fs.Dirent> 对象
*/

// 异步读取
// fs.readdir(textFile, {
//     encoding: 'utf-8',
//     // withFileTypes: true, 
//     recursive: true,
// }, (err, files) => {
//     files.forEach((file, index) => {
//         const filePath = path.resolve(textFile, file)
//         fs.readFile(filePath, (err, buf) => { // 异步读取
//             console.log(buf, 1)
//             // const bufStr = buf.toString()
//             // console.log(bufStr);
//         });
//     })
// })

// 同步读取   注意的是同步读取是没有回调函数的
const files = fs.readdirSync(textFile, {
    encoding: 'utf-8',
    // withFileTypes: true, 
    recursive: true,
})
files.forEach((file, index) => {
    const filePath = path.resolve(textFile, file)
    fs.readFile(filePath, (err, buf) => { // 异步读取
        console.log(buf, 2)
        // const bufStr = buf.toString()
        // console.log(bufStr);
    });
})






