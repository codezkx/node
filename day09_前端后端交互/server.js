const path = require('path');
const fs = require('fs');
const http = require('http');

const server = http.createServer((req, res) => {
    console.log('123')
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json")
    res.setHeader('Access-Control-Allow-Headers', 'x-requested-with,Authorization,token, content-type');
    res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH");
    res.setHeader('Access-Control-Max-Age', 1728000);
    const method = req.method,
        url = req.url;
    console.log(url, 'url')
    if (method === 'GET' && url === '/user') {
        const o = {
            code: 200,
            message: "OK",
            data: {
                useInfo: {
                    userName: '神',
                    message: '钦定的名额'
                }
            },
            success: true
        }
        res.end(JSON.stringify(o));
    } else if(method === 'POST' && url === '/final/team') {
        const o = {
            code: 200,
            message: "OK",
            data: [
                {
                    name: 'JDG',
                },
                {
                    name: 'BGL',
                },
                {
                    name: 'EDG',
                },
                {
                    name: 'WEB',
                },
            ],
            success: true
        }
        res.end(JSON.stringify(o));
    } else {
        res.statusCode = 404
        res.statusMessage = '404 Not Found'
        res.end();
    }
})

const port = 3000
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})