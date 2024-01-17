const fs = require('fs');
const http = require('http');
const path = require('path');
const { Buffer } = require('buffer');

/* 
    response.setTimeout(msecs[, callback])#
        msecs <number>
        callback <Function>
    返回： <http.ServerResponse>

    将套接字的超时值设置为 msecs。 如果提供了回调，则将其添加为响应对象上 'timeout' 事件的监听器。

    如果没有向请求、响应或服务器添加 'timeout' 监听器，则套接字在超时时会被销毁。 如果将句柄分配给请求、响应或服务器的 'timeout' 事件，则必须显式处理超时套接字。
*/

const server = http.createServer((request, response) => {
    // 
    const serverReponse = response.setTimeout(1, () => {
        console.log('请求超时');
        response.statusCode = 500;
        response.end('请求超时！！！');
    });
    console.log(serverReponse.statusCode, 'serverReponse');
})

const port = 3000;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
