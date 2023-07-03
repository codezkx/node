const http = require('http');
const fs = require('fs');
const { Buffer } = require('buffer');
const path = require('path');

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/',
    method: 'GET',
};

let req = http.request(options, (res) => {
    console.log('状态吗:' + res.statusCode);
    console.log('响应头:' + JSON.stringify(res.headers));
    res.on('data', (chunk) => {
        console.log('响应内容', chunk.toString());
    });
});

req.end();

// 取消请求
// req.destroy(err => {
//     console.log(err, '取消请求');
//     if (err) throw new Error(err);
// })

req.on('error', (err) => {
    if (err) {
        // console.log(err, 'err');
    };
});

// 建立连接过程中，为该连接分配端口时
req.on('socket', (socket) => {
    // 设置
    socket.setTimeout(1);
    socket.on('timeout', () => {
        req.destroy()
        // req.destroyed 是否取消了请求
        console.log(req.destroyed ? '请求被取消了......' : '正在请求......');
    });
    // console.log(socket, 'socket');
});

