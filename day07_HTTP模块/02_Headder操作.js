const http = require('http');
const fs = require('fs');
const path = require('path');

// const server = http.createServer((req, res) => {
//     /* 
//         response.setHeader('Content-Type','text/html;charset=utf-8');
//         response.getHeader('Content-Type');
//         response.removeHeader('Content-Type');
//         response.headersSent 判断响应头是否已经发送
//     */
//     res.setHeader('Content-Type','text/html;charset=utf-8');
//     res.getHeader('Content-Type');
//     res.removeHeader('Content-Type');
//     // res.headersSent 判断响应头是否已经发送
//     console.log(resopnse.headersSent?"响应头已经发送":"响应头未发送!");
//     res.writeHead(200, 'ok');
//     res.sendDate = false;   
//     console.log(resopnse.headersSent?"响应头已经发送":"响应头未发送!");
// }).listen(5500, '127.0.0.1')

const port = 3000;

const server = http.createServer((req, res) => {
  console.log(res)
  res.sendDate = false;
  res.statusCode = 200; // 返回的状态码
  res.setHeader('Content-Type', ['text/plains', 'utf-8']); // 设置请求头
  res.setHeader('X-Foo', 'bar');
  // 判断表头是否发送headersSent
  console.log(res.headersSent ? "响应头已经发送" : "响应头未发送!");
  res.writeHead(200, 'ok');
  console.log(res.headersSent ? "响应头已经发送" : "响应头未发送!");
  // res.setHeader('Cookie', 'name=自定义请求头');
  res.end('Hello World!\n'); // 发送的数据
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
