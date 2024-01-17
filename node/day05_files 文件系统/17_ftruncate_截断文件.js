const path = require('path');
const fs = require('fs');
const { Buffer } = require('buffer');
const { ancientPoetry } = require('./data');

/* 
    fs.ftruncate(fd[, len], callback)
        fd <integer>
        len <integer> 默认值： 0
        callback <Function>
            err <Error>
    
    截断文件描述符。 除了可能的异常之外，没有为完成回调提供任何参数。

    有关更多详细信息，请参阅 POSIX ftruncate(2) 文档。

    如果文件描述符引用的文件大于 len 个字节，则文件中将仅保留前 len 个字节。
*/
const pathFile = path.resolve(__dirname, 'readFile/text.text')

fs.open(pathFile, 'r+', (err, fd) => { // 开启文件
    if (err) throw new Error(err);
    fs.ftruncate(fd, 1, (err) => { // 截取文件
        if (err) throw new Error(err);
        fs.close(fd); // 关闭文件
    })
});
