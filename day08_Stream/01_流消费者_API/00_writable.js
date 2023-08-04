const http = require('http');
const fs = require('fs');
const stream = require('stream');
const path = require('path');

const filePath = path.resolve(path.dirname(process.cwd()), 'img/1.png');

const writableStream = fs.createWriteStream(filePath);
// const writableStream = new stream.Writable()
// 返回创建此 Writable 时传入的 highWaterMark 的值。
console.log(writableStream.writableHighWaterMark)
// 强制所有写入的数据都缓存在内存中。
writableStream.cork()

writableStream.write('some ');
writableStream.write('data ');

// 此属性包含队列中准备写入的字节数（或对象数）。 该值提供有关 highWaterMark 状态的内省数据。
console.log(writableStream.writableLength) // 10
// process.nextTick(() => writableStream.uncork());


// 注销流
// writableStream.destroy()

// 如果对 stream.write(chunk) 的调用返回 false，则 'drain' 事件将在适合继续将数据写入流时触发。
writableStream.on('drain', () => {
    console.log('drain');
});

// readable.pipe() 方法将 Writable 流绑定到 readable，使其自动切换到流动模式并将其所有数据推送到绑定的 Writable。 数据流将被自动管理，以便目标 Writable 流不会被更快的 Readable 流漫过。
writableStream.on('pipe', (src) => {
    console.log('pipe');
});

// readable.unpipe() 方法分离先前使用 stream.pipe() 方法附加的 Writable 流。
writableStream.on('unpipe', () => {
    console.log('unpipe');
});

// 流写入结束后触发
writableStream.on('finish', () => {
    console.log('finish');
});

// 流close时触发
writableStream.on('close', () => {
    console.log('close');
});

// 写入流或则管道数据错误时触发
writableStream.on('error', () => {
    console.log('error');
});



