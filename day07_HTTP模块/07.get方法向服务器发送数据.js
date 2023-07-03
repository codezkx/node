const http = require('http');
const fs = require('fs');
const { Buffer } = require('buffer');
const path = require('path');

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/',
    method: 'GET',
};

// 可以使用get方法向服务器发送数据
const getServer = http.get(options, (res) => {
    const { statusCode, headers } = res;
    console.log(res.httpVersion, 'trailers')
    const contentType = res.headers['content-type'];
    let error = '';
    if (statusCode !== 200) {
        error = new Error('Request Failed.\n' +
            `Status Code: ${statusCode}`);
    } else if (!/^application\/json/.test(contentType)) {
        error = new Error('Invalid content-type.\n' +
            `Expected application/json but received ${contentType}`);
    }
    if (error) {
        console.error(error.message);
        res.resume();
        return false
    }
    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => {
        rawData += chunk
    })
    res.on('end', () => {
        try {
            // const parsedData = JSON.parse(rawData);
            console.log(rawData);
        } catch (e) {
            console.log(e.message);
        }
    })

}).on('error', (e) => {
    console.log(`Got error: ${e.message}`);
});



getServer.end()