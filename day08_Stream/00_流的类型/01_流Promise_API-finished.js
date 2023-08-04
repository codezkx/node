const fs = require('fs');
const path = require('path');
const { pipeline } = require('node:stream/promises');
const zlib = require('node:zlib');
const stream = require('node:stream')

const filePath = path.resolve(path.dirname(process.cwd()), 'test/1.text');

/* 
    stream.finished() 是 Node.js 中 Stream 模块提供的一个函数,用来检测流是否关闭完成。

    stream.finished(stream, callback)
        stream <Stream>
        options <Object>
            error <boolean> | <undefined>  hasErrors:忽略错误,默认为 false
            readable <boolean> | <undefined> 指定读取缓冲区的最大长度,默认256字节
            writable <boolean> | <undefined> 指定写入缓冲区的最大长度,默认1字节
            signal: <AbortSignal> | <undefined> 中止信号
        返回： <Promise> 当流不再可读或可写时执行。

    参数:
        stream:要检测的流对象
        callback:当流关闭完成时调用的回调函数
    作用:
        用来检查流 stream 是否已经完成(end 事件被触发)
        一旦 stream 结束,callback 就会被调用
    
    主要用途时:
        检查流操作是否已经完成,以便做后续处理
        在流操作完成后清理资源,释放文件句柄等
*/

const readStream = fs.createReadStream(filePath);
// console.log(readStream);
stream.finished(readStream, () => {
    readStream.close(() => { // 关闭读取流
        console.log('File handler closed.')
     });
});

readStream.on('data', (chunk) => {
    console.log(chunk.toString());
});
