const http = require('http');
const fs = require('fs');
const { PassThrough, Writable } = require('stream');
const path = require('path');

const filePath = path.resolve(path.dirname(__filename), 'text.text');
const readable = fs.createReadStream(filePath);
readable.setEncoding('utf8');

readable.on('data', (chunk) => {

    if (readable.isPaused()) {
        readable.pause()
        console.log('暂停data事件');
    }
    console.log('Received a chunk of data with ' + chunk.length + ' bytes');
    console.log(chunk.toString());
    
    // 给定 Readable 流的属性 encoding 的获取器。 可以使用 readable.setEncoding() 方法设置 encoding 属性。 如何没有设置encoding则返回null
    console.log('encoding: ', readable.readableEncoding);

    // 此属性反映 Readable 流的当前状态。
    console.log('readableFlowing: ', readable.readableFlowing);

    // 返回创建此 Readable 时传递的 highWaterMark 的值。
    console.log('readableHighWaterMark: ', readable.readableHighWaterMark);
    
    console.log('readableLength: ', readable.readableLength)
});
/* 
    具体来说，在任何给定的时间点，每个 Readable 都处于三种可能的状态之一：

        readable.readableFlowing === null
        readable.readableFlowing === false
        readable.readableFlowing === true
    当 readable.readableFlowing 为 null 时，则不提供消费流数据的机制。 因此，流不会生成数据。 在此状态下，为 'data' 事件绑定监听器、调用 readable.pipe() 方法、或调用 readable.resume() 方法会将 readable.readableFlowing 切换到 true，从而使 Readable 在生成数据时开始主动触发事件。

    调用 readable.pause()、readable.unpipe() 或接收背压将导致 readable.readableFlowing 设置为 false，暂时停止事件的流动但不会停止数据的生成。 在此状态下，为 'data' 事件绑定监听器不会将 readable.readableFlowing 切换到 true。
*/
console.log(readable.readableFlowing); // false

//   导致显式暂停的 Readable 流恢复触发 'data' 事件，将流切换到流动模式。
readable.resume();
console.log(readable.readableFlowing); // true

/* 
    当有可从流中读取的数据或已到达流的末尾时，则将触发 'readable' 事件。 实际上，'readable' 事件表明流有新的信息。 如果数据可用，则 stream.read() 将返回该数据。 
*/
readable.on('readable', () => {
    if (readable.readable) {
        console.log(`这意味着流尚未被破坏或触发 'error' 或 'end'。`)
    }
    //   readable.read()会触发 'data' 事件。
    const chunk = readable.read();
    if (chunk) {
        console.log('readable: ', chunk.toString());
    }
});

readable.on('end', () => {
    console.log('end');
});
 
readable.on('close', () => {
    console.log('close');
});

readable.on('error', (err) => {
    console.log(err);
});








