const path = require('path');
const fs = require('fs');
const { Buffer } = require('buffer');
const { ancientPoetry } = require('./data');

const filePath = path.format({
    root: __dirname,
    base: '/writeFile/fsync.text'
})

/* 
    fs.fsync(fd, callback)   同步磁盘缓存  保持同步遇到的时候自然资道如何使用
        fd <integer>
        callback <Function>
            err <Error>

    请求将打开文件描述符的所有数据刷新到存储设备。 具体实现是操作系统和设备特定的。 有关更多详细信息，请参考 POSIX fsync(2) 文档。 除了可能的异常之外，没有为完成回调提供任何参数。
*/

fs.open(filePath, 'a+', '0666', (err, fd) => {
    if (err) throw new Error(err);
    // const buf = Buffer.from(ancientPoetry);
    const buf = Buffer.from('你好,我是海牙');
    fs.write(fd, buf, 0, 9, 0, (err, written, buffer) => {
        if (err) throw new Error(err);
        console.log('written: ', written);
        fs.write(fd, buf, 9, buf.length - 9, null, (err, written1, buffer1) => {
            if (err) throw new Error(err);
            console.log('written1: ', written1);
            // 同步
            fs.fsync(fd, (err) => {
                if (err) throw new Error(err);
            })
            fs.close(fd);
        })

    })
    
})

fs.fstat