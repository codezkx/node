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
    console.log(chunk.toString());
  });
});

req.on('error', (error) => {
    console.error(error);
});
  
req.end();
  
