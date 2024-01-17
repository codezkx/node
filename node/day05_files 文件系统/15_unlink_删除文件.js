const path = require('path');
const fs = require('fs');
const { Buffer } = require('buffer');
const { ancientPoetry } = require('./data');

const filePath = path.resolve(path.dirname(__filename), 'auto_mkdir')

/* 
    fs.unlink(path, callback)
        path <string> | <Buffer> | <URL>
        callback <Function>
            err <Error>

    异步地删除文件或符号链接。 除了可能的异常之外，没有为完成回调提供任何参数。

    fs.unlink() 不适用于目录，无论是空目录还是其他目录。 要删除目录，请使用 fs.rmdir()。

*/

fs.mkdir(filePath, {recursive: true},(err, mkdirPath) => { // 创建一个目录
    if (err) throw new Error(err);
    const buf = Buffer.from('你好！我是自动创建的文件，学习node时只有用心学，并不会难！')
    const _path = path.resolve(filePath, 'text.text')
    fs.writeFile(_path, buf, (err) => { // 创建一个文件
        if (err) throw new Error(err);
        setTimeout(() => {
            fs.unlink(_path, (err) => { // 删除一个目录
                if (err) throw new Error(err);
                console.log(`${_path}------> 文件删除成功！！！！！`)
            })
        }, 2000);
    })

})


 