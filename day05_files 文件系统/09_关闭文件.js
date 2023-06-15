const path = require('path');
const fs = require('fs');
const { Buffer } = require('buffer');
const { ancientPoetry } = require('./data');

const filePath = path.normalize(path.dirname(__filename) + '/writeFile/close.text')

// 有读写操作的时候   flag 必须是可读写才做的参数
fs.open(filePath, 'a+', '0666', (err, fd) => {
    if (err) throw new Error(err);
    const buf = Buffer.from(ancientPoetry);
    fs.write(fd, buf, 0, buf.length, 0, (err, written, buffer) => {
        fs.fsync(fd, (err) => {
            if (err) throw new Error(err);
            fs.close(fd, (err) => {
                if (err) throw new Error(err);
                console.log('close: ', fd);
                const readBuf = Buffer.alloc(10);
                // 此时fd文件描述符已经失效，无法读取文件内容
                fs.read(fd, readBuf, 0, 10, 0, (err, bytesRead, buffer) => {
                    console.log(bytesRead, 'bytesRead')
                    if (err) throw new Error(err);
                    
                })
            })
        })
    })

})

