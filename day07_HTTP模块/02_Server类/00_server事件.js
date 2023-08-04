const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    res.statusMessage = 'Not found';
    res.statusCode = 404;
    res.end();
});

server.on('clientError', (err, socket) => { // 无法验证   客户端错误
    console.log(socket);

    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// server.on('connect', (request, socket, head) => {  // 客户请求不能使用同destroy方法
//     request.on('data', (chunk) => {
//         console.log(chunk, 'request->chunk')
//     })
//     socket.on('data', (chunk) => {
//         console.log(chunk, 'sockett->chunk')
//     })
//     console.log(head.toString(), 'head') // 客户端发送过来的数据
// });

// server.on('connections', (socket) => {
//     console.log('socket服务连接！！！');
// });

server.on('close', () => {
    console.log('服务关闭');
});

server.on('request', (request, response) => {
    request.on('data', (chunk) => {
        console.log(chunk, 'chunk');
    });
});

// server.close((err) => {
//     if (err) throw new Error(err);
// }); // 停止服务器接受新连接并关闭连接到该服务器的所有未发送请求或等待响应的连接。 参见 net.Server.close()

// server.closeAllConnections(); // 关闭所有连接到此服务器的连接。

// server.closeIdleConnections(); // 关闭连接到此服务器的所有未发送请求或等待响应的连接。

// console.log(server.listening, 'listening'); // true 指示服务器是否正在监听连接。

server.requestTimeout = 1000;

server.setTimeout(1000, () => {
    console.log('请求超时！');
});

// console.log(server.timeout, 'timeout'); // 注意setTimeout方法如果使用msecs参数，则等同于把msecs设置给了server.timeout




