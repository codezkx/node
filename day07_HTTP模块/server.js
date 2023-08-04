const http = require('http');
const fs = require('fs');
const { Buffer } = require('buffer');
const path = require('path');
const crypto = require('crypto');

const server = http.createServer((request, response) => {
    // response.end('请求成功');
    response.writeHead(200,
        {
            'Content-Type': 'application/json',
            'Trailer': 'Content-MD5'
        }
    );
    const pathFile = path.join(__dirname, 'logs.text');
    let readStream = fs.createReadStream(pathFile);
    const md5 = crypto.createHash('md5');
    readStream.on('data', (data) => {
        response.write(data);
        md5.update(data);
        console.log(data, 'data');
    });
    readStream.on('end', () => {
        response.addTrailers({
            'Content-MD5': md5.digest('hex')
        });
        response.end(JSON.stringify({
            ata: 'Hello World!',
        }));
    });
    response.end();
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
