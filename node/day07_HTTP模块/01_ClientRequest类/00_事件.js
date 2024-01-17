const http = require('http');
const net = require('net');
const { URL } = require('url');

// 创建HTTP隧道代理
const proxy = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('ok');
});

proxy.on('connect', (req, clientSocket, head) => {
    // 连接到原始服务器
    const { port, hostname } = new URL(`http://${req.url}`);
    console.log(port, hostname, 'hostname');
    const serverSocket = net.connect(port || 80, hostname, () => {
        clientSocket.write('HTTP/1.1 200 Connection Established\r\n' +
            'Proxy-agent: Node.js-Proxy\r\n' +
            '\r\n');
        serverSocket.write(head);
        serverSocket.pipe(clientSocket);
        serverSocket.pipe(serverSocket);
    });
});

// 现在代理正在运行
proxy.listen(3000, '127.0.0.1', () => {
    // 向隧道代理发出请求
    const options = {
        port: 3000,
        host: '127.0.0.1',
        method: 'CONNECT',
        path: '127.0.0.1:3000',
    }
    const req = http.request(options);
    req.end();
    req.on('connect', (res, socket, head) => {
        console.log('got connected!');
        // 通过HTTP隧道发出请求
        socket.write('GET / HTTP/1.1\r\n' +
            'Host: www.google.com:80\r\n' +
            'Connection: close\r\n' +
            '\r\n');
        socket.on('data', (chunk) => {
            console.log(chunk.toString());
        });
        socket.on('end', () => {
            proxy.close();
        });
        socket.on('error', (err) => {
            if (err) throw Error(err);
        });
        socket.end('socket 完成请求!');
    });
    req.on('error', (err) => {
        console.log('err:', err);
    });
});


