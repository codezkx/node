const http = require('http');
const fs = require('fs');
const path = require('path');
/* 
http.createServer([options][, requestListener])
    options <Object>
        connectionsCheckingInterval: 以毫秒为单位设置间隔值，以检查不完整请求中的请求和标头超时。 默认值： 30000。
        headersTimeout: 设置从客户端接收完整 HTTP 标头的超时值，以毫秒为单位。 有关详细信息，请参阅 server.headersTimeout。 默认值： 60000。
        highWaterMark <number> 可选择覆盖所有 socket' readableHighWaterMark 和 writableHighWaterMark。 这会影响 IncomingMessage 和 ServerResponse 的 highWaterMark 属性。 默认值： 参见 stream.getDefaultHighWaterMark()。
        insecureHTTPParser <boolean> 使用不安全的 HTTP 解析器，当为 true 时接受无效的 HTTP 标头。 应避免使用不安全的解析器。 有关详细信息，请参阅 --insecure-http-parser。 默认值： false。
        IncomingMessage <http.IncomingMessage> 指定要使用的 IncomingMessage 类。 用于扩展原始的 IncomingMessage。 默认值： IncomingMessage。
        keepAlive <boolean> 如果设置为 true，则它会在收到新的传入连接后立即在套接字上启用保持活动功能，类似于在 [socket.setKeepAlive([enable][, initialDelay])][socket.setKeepAlive(enable, initialDelay)] 中所做的事情。 默认值： false。
        keepAliveInitialDelay <number> 如果设置为正数，则它会设置在空闲套接字上发送第一个保持活跃探测之前的初始延迟。 默认值： 0。
        keepAliveTimeout: 在完成写入最后一个响应之后，在套接字将被销毁之前，服务器需要等待额外传入数据的不活动毫秒数。 有关详细信息，请参阅 server.keepAliveTimeout。 默认值： 5000。
        maxHeaderSize <number> 可选地覆盖此服务器接收到的请求的 --max-http-header-size 值，即请求标头的最大长度（以字节为单位）。 默认值： 16384 (16 KiB)。
        noDelay <boolean> 如果设置为 true，则它会在收到新的传入连接后立即禁用 Nagle 算法。 默认值： true。
        requestTimeout: 设置从客户端接收整个请求的超时值（以毫秒为单位）。 有关详细信息，请参阅 server.requestTimeout。 默认值： 300000。
        requireHostHeader <boolean> 它强制服务器以 400（错误请求）状态代码响应任何缺少 Host 标头（如规范要求）的 HTTP/1.1 请求消息。 默认值： true。
        joinDuplicateHeaders <boolean> 它使用 , 连接请求中多个标头的字段行值，而不是丢弃重复项。 有关详细信息，请参阅 message.headers。 默认值： false。
        ServerResponse <http.ServerResponse> 指定要使用的 ServerResponse 类。 用于扩展原始的 ServerResponse。 默认值： ServerResponse。
        uniqueHeaders <Array> 只应发送一次的响应标头列表。 如果标头的值是数组，则子项将使用 ; 连接。
    requestListener <Function>

    返回： <http.Server>

    返回 http.Server 的新实例。

    requestListener 是自动添加到 'request' 事件的函数。
*/
const requestListener = (response, request) => {
    // console.log(response, 'response');
    console.log(request, 'request');
    console.log('服务已启动');
};

const server = http.createServer({}, requestListener);
// console.log(server, 'server');
/* 
    Server {
  maxHeaderSize: undefined,
  insecureHTTPParser: undefined,
  requestTimeout: 300000,
  headersTimeout: 60000,
  keepAliveTimeout: 5000,
  connectionsCheckingInterval: 30000,
  requireHostHeader: true,
  joinDuplicateHeaders: undefined,
  _events: [Object: null prototype] {
    request: [Function: requestListener],
    connection: [Function: connectionListener]
  },
  _eventsCount: 2,
  _maxListeners: undefined,
  _connections: 0,
  _handle: null,
  _usingWorkers: false,
  _workers: [],
  _unref: false,
  allowHalfOpen: true,
  pauseOnConnect: false,
  noDelay: true,
  keepAlive: false,
  keepAliveInitialDelay: 0,
  httpAllowHalfOpen: false,
  timeout: 0,
  maxHeadersCount: null,
  maxRequestsPerSocket: 0,
  [Symbol(IncomingMessage)]: [Function: IncomingMessage],
  [Symbol(ServerResponse)]: [Function: ServerResponse],
  [Symbol(kCapture)]: false,
  [Symbol(async_id_symbol)]: -1,
  [Symbol(http.server.connections)]: ConnectionsList {},
  [Symbol(http.server.connectionsCheckingInterval)]: Timeout {
    _idleTimeout: 30000,
    _idlePrev: [TimersList],
    _idleNext: [TimersList],
    _idleStart: 79,
    _onTimeout: [Function: bound checkConnections],
    _timerArgs: undefined,
    _repeat: 30000,
    _destroyed: false,
    [Symbol(refed)]: false,
    [Symbol(kHasPrimitive)]: false,
    [Symbol(asyncId)]: 2,
    [Symbol(triggerId)]: 1
  },
  [Symbol(kUniqueHeaders)]: null
}
*/

server.on('request', requestListener);

/* 
    server.listen([port[, host[, backlog]]][, callback])
        port <number>
        host <string>
        backlog <number> server.listen() 函数的通用参数。
        callback <Function>。
    返回： <http.Server>

*/

server.listen('5500', () => {
    console.log('服务器端开始监听!');
});

// server.close((err) => {
//     if (err) throw new Error(err);
// });

// connection 事件
server.on('connection', (socket) => {
    console.log('客户端连接已经建立');
});

// server.on('close', () => {
//     console.log('服务器关闭');
// });
// error事件监听
// const server1 = http.createServer({}, requestListener);
// server1.listen('81', () => {
//     console.log('服务器端开始监听!');
// });

// server1.on('error', (e) => {
//     if(e.code == 'EADDRINUSE'){
//         console.log('端口号已经被占用!');   
//    }
// })






