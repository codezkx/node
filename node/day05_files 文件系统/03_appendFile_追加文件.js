const path = require('path');
const fs = require('fs');
const { Buffer } = require('buffer');

const filePath = path.resolve(process.cwd(), 'readFile', 'text.text');

/* 
    fs.appendFile(path, data[, options], callback)
        参数
            path <string> | <Buffer> | <URL> | <number> 文件名或文件描述符
            data <string> | <Buffer>
            options <Object> | <string>
                encoding <string> | <null> 默认值： 'utf8'
                mode <integer> 默认值： 0o666
                flag <string> 参见 支持文件系统 flags。 默认值: 'a'。
            callback <Function>
                err <Error>

                
        异步地将数据追加到文件，如果该文件尚不存在，则创建该文件。 data 可以是字符串<Buffer>。
        mode 选项仅影响新创建的文件。 有关详细信息，请参阅 fs.open()。

*/
// fs.readdir(filePath, (err, files) => {
//     if (files?.length) return
//     files.forEach(file => {
        
//     })
// })

// 追加数据到对应文件，如果文件存在则添加到对应文件中，如果不存在则创建该文件并把数据添加其中
fs.appendFile(filePath, Date.now() + '\n', (err) => {
    if (err) {
        throw new Error(err);
        return false;
    }
    console.log('ok');
})

// 创建append.text文件
const appendFile = path.resolve(__dirname, 'readFile', 'append.text')
console.log(appendFile, 'appendFile')
fs.appendFile(appendFile, '你好：' + Date.now() + '\n', (err) => {
    if (err) {
        throw new Error(err);
        return false;
    }
    console.log('添加完毕');
})


