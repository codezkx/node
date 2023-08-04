const fs = require('fs');
const path = require('path');
const http = require('http');
const { Buffer } = require('node:buffer');

const filePath = path.dirname(__filename, 'logs.text');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/',
  method: 'GET',
};

const req = http.request(options, (res) => {
  // console.log(res.headers, 'headers');
  // console.log(res.rawHeaders, 'rawHeaders');
  // data = JSON.stringify(res)
  // fs.writeFile(filePath, Buffer.from(data), (err) => {
  //   if (err) throw new Error(err);
  // })
  console.log(`statusCode: ${res.statusCode}`);
  res.on('data', (chunk) => {
    console.log(chunk);
  });
});

req.on('error', (error) => {
    console.error(error);
});

req.on('close', () => {
  console.log('close 事件触发');
});

req.on('finish', () => { // 当发送请求时触发。 更具体地说，当响应头和正文的最后一段已移交给操作系统以通过网络传输时，则将触发此事件。 这并不意味着服务器已经收到任何东西。
  console.log('finish 事件触发');
});

req.end();
  
