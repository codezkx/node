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
  console.log(`statusCode: ${res.statusCode}; statusMessage: ${res.statusMessage}`);
  res.on('data', (chunk) => {
    console.log(chunk);
  });
});

req.on('error', (err) => {
  console.log(err)
  // if (err) throw new Error(err);
});

req.end();

// req.destroy(err => {
//   console.log(err)
// });
  