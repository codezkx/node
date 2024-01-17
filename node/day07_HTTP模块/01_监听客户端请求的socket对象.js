const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    const out = fs.createWriteStream(path.join(__dirname, './assets/imge/vue_log.png'));
    // console.log(req, 'req')
    out.write(`method=${req.method}`);
    out.write(`url=${req.url}`);
    out.write(`headers=${JSON.stringify(req.headers)}`);
    out.write(`httpVersion=${req.httpVersion}`);

    const body = [];
    req.on('data', function (data) {
        body.push(data);
    });
    req.on('end', () => {
        let result = Buffer.concat(body);
        console.log(result.toString(), 'result.toString()');
    })
}).listen(9003, 'localhost');


