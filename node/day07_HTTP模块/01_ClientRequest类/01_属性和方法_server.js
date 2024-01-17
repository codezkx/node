const http = require('http');
const fs = require('fs');
const { Buffer } = require('buffer');
const path = require('path');
const crypto = require('crypto');

const server = http.createServer((request, response) => {
	// console.log(response, 'headers')
    // response.end('请求成功');
    response.on('data', (data) => {
        console.log(data, 'response');
        response.write(data);
    });
    console.log(request.url)
    request.on('data', (chunk) => {
        console.log(chunk, 'request'); // 请求方法使用的是post则可以接收数据
    })
    request.on('end', () => {
        response.writeHead(200,
            {
                'Content-Type': 'text/plain',
                'Trailer': 'Content-MD5'
            }
        );
        response.end('Hello World!');
    })
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
