const fs = require('fs');
const path = require('path');
const { Buffer } = require('buffer');
const http = require('http');

const server = http.createServer((request, response) => {
    
    response.statusCode = 200;
    response.on('close', () => {
        console.log('close触发');
    })
    response.end('ok');
})

const port = 3000;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

server.close((err) => {})


