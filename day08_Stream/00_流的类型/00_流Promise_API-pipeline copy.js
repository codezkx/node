const fs = require('fs');
const path = require('path');
const { pipeline } = require('node:stream/promises');
const zlib = require('node:zlib');

const filePath = path.join(path.dirname(process.cwd()), 'img/1.png');

/* 
    stream.pipeline() 是 Node.js 中 Stream 模块提供的一个功能强大的函数,用于构建数据管道。

    它主要用来:
        将多个流式操作连接起来,形成管道。
        让流操作可以焦点地运行,而不是嵌套地运行。

    主要功能如下:
        将多个流操作连接到一个管道中
        错误自动冒泡,错误发生时整个管道关闭
        管道中的流自动地添加和移除
        可以同步或者异步地运行管道

    参数:
        source1:数据的来源流,如文件流、Socket 等
        transform1、transform2:管道中的流操作,如 zlib.createGzip()
        destination:数据的目标流,如文件流
        callback:可选的回调函数,用于处理错误或数据传输完成时的动作
    作用:
        将 source1 到 destination 这段流式处理连接成一个管道
        transform1 和 transform2 是中间的流处理操作
        一旦任何一个流出错,整个管道都会关闭
        callback 会在整个管道完成或出错时被调用
        总的来说,stream.pipeline() 的作用是方便地构建数据流管道,让流操作能更加高效地运行。

    stream.pipeline(source[, ...transforms], destination[, options])#

    stream.pipeline(streams[, options])
        streams <Stream[]> | <Iterable[]> | <AsyncIterable[]> | <Function[]>
        source <Stream> | <Iterable> | <AsyncIterable> | <Function>  // 原始流
            返回： <Promise> | <AsyncIterable>
        ...transforms <Stream> | <Function> // 转化/通道
            source <AsyncIterable> 
            返回： <Promise> | <AsyncIterable>
        destination <Stream> | <Function> // 最终的流
            source <AsyncIterable>
            返回： <Promise> | <AsyncIterable>
        options <Object>
            signal <AbortSignal> 信号
            end <boolean>
            返回： <Promise> 管道完成时执行。
*/

async function run() {
    const ac = new AbortController()
    const signal = ac.signal // 信号
    return res = await pipeline(
        fs.createReadStream(filePath),
        zlib.createGzip(),
        fs.createWriteStream('1.png.gz'),
        {signal},
    );
}
run().catch(console.error); // AbortError

