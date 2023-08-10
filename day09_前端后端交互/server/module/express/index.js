const path = require('path');
const fs = require('fs');
const http = require('http');
const EventEmitter = require('events');
const { getQuery } = require('../../util');

const eventEmitter = new EventEmitter();
const cacheRouteName = [];
let instantiation = null;
class requesetServer {
    constructor(server) {
        this.server = server;
        this.requesetCallback = null
        server.on('request', (req, res) => {
            this.response = res;
            let url = req.url
            const requestMethod = req.method?.toLocaleUpperCase() || 'GET';
            if (['GET'].includes(requestMethod)) {
                const queryList = url.split('?');
                url = queryList[0];
                req.query = getQuery(queryList[1]);
                this.requeset = req;
            }
            if (['POST'].includes(requestMethod)) {
                req.on('data', (chunk) => {
                    req.body = chunk.toString();
                    this.requeset = req;
                })
            }
            console.log(1);
            eventEmitter.on('triggerRouter', (method) => {
                if (requestMethod === method) {
                    if (!cacheRouteName.includes(url)) {
                        res.statusCode = 404
                        res.statusMessage = '404 Not Found'
                        res.end();
                    }
                    this.requesetCallback?.(req, res);
                } else {
                    res.statusCode = 404
                    res.statusMessage = '请求方法不对'
                    res.end();
                }
            })
        })
    }

    router(path, callback) {
        callback(path, {requeset: this.requeset, response: this.response});
    }

    get(path, cb) {
        eventEmitter.emit('triggerRouter', 'GET')
        this.requesetCallback = cb; // 把路由回调函数传入
        
    }

    psot(path, cb) {
        eventEmitter.emit('triggerRouter', 'POST')
        this.requesetCallback = cb; // 把路由回调函数传入
    }
}

const createServerinstantia = (server) => {
    instantiation = new requesetServer(server);
    return (path, cb) => {
        cacheRouteName.push(path);
        return instantiation
    }
}

const useRouter = () => {
    return instantiation
}

const express = () => {
    const _req = null;
    const _res = null;
    const server = http.createServer((req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Content-Type", "application/json")
        res.setHeader('Access-Control-Allow-Headers', 'x-requested-with,Authorization,token, content-type');
        res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH");
        res.setHeader('Access-Control-Max-Age', 1728000);
    })
    
    const port = 3000
    server.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    })
    return {
        use: createServerinstantia(server),
    }
}

module.exports = express;
module.exports.Router = useRouter;

