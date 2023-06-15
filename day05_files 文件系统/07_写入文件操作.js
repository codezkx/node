const path = require('path');
const fs = require('fs');
const { Buffer } = require('buffer');
const { ancientPoetry } = require('./data/index.js');

/* 
    fs.write(fd, buffer, offset[, length[, position]], callback)
        参数
            fd <integer> 使用fs.open打开成功后返回的文件描述符
            buffer <Buffer> | <TypedArray> | <DataView> 一个Buffer对象，v8引擎分配的一段内存。 将 buffer 写入 fd 指定的文件。
            offset <integer> 默认值：0    确定要写入的缓冲区部分
            length <integer> 默认值：buffer.byteLength - offset  是整数，指定要写入的字节数
            position <integer> | <null> 默认值： null  指从文件开头数据应被写入的偏移量。 如果 typeof position !== 'number'，则数据将写入当前位置。
            callback <Function> 
                err <Error>
                bytesWritten <integer> bytesWritten实际写入字节数
                buffer <Buffer> | <TypedArray> | <DataView> buffer被读取的缓存区对象
                写入操作执行完成后回调函数，bytesWritten实际写入字节数，buffer被读取的缓存区对象
*/
const filePath = path.resolve(path.dirname(__filename), 'writeFile/write.text');
fs.open(filePath, 'w', '0666', (err, fd) => {
    const buf = Buffer.from(ancientPoetry);
    // 理解上面的参数  注意的是 length = buffer.byteLength - offset
    fs.write(fd, buf,  1, buf.length - 1, 0, (err, bytesWritten, buffer) => {
        if (err) throw new Error(err);
        console.log('bytesWritten: ', bytesWritten);
        console.log('buffer: ', buffer); // 写入的buf数据
    })
})

/* 
    fs.writev(fd, buffers[, position], callback)
        参数：
            fd <integer>
            buffers <ArrayBufferView[]>
            position <integer> | <null> 默认值： null
            callback <Function>
                err <Error>
                bytesWritten <integer>
                buffers <ArrayBufferView[]>

        使用writev()将ArrayBufferView的数组写入fd指定的文件。
        position 是该数据应写入的文件开头的偏移量。 如果 typeof position !== 'number'，则数据将写入当前位置。

        回调将被赋予三个参数： err、bytesWritten 和 buffers。 bytesWritten 是从 buffers 写入的字节数。

        如果这个方法是 util.promisify() 的，它返回具有 bytesWritten 和 buffers 属性的 Object 的 promise。

        在同一个文件上多次使用 fs.writev() 而不等待回调是不安全的。 对于这种情况，请使用 fs.createWriteStream()。

        在 Linux 上，以追加模式打开文件时，位置写入不起作用。 内核会忽略位置参数，并始终将数据追加到文件末尾。
*/
fs.open(filePath, 'w', '0666', (err, fd) => {
    // 将Buffer数据写入到指定的文件中
    const buf = [Buffer.from(ancientPoetry), Buffer.from('作则：无名')];
    fs.writev(fd, buf, buf.length, (err, bytesWritten, buffers) => {
        if (err) throw new Error(err);
        console.log('bytesWritten: ', bytesWritten);
        console.log('buffers: ', buffers.toString());
    });
})

