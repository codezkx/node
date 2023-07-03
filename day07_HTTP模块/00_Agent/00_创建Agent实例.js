const http = require('http');
const fs = require('fs');
const path = require('path');
const { buffer } = require('buffer');

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/',
    method: 'GET',
}
const keepAliveAgent = new http.Agent({ keepAlive: true });
// options.agent = keepAliveAgent;
const getServer = http.request(options, (res) => { 
    
})
getServer.end()


