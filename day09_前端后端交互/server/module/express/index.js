const path = require('path');
const fs = require('fs');
const http = require('http');
const { getQuery } = require('../../util');
const { user, finalTeam} = require('../../router')

class requesetServer {
    constructor(server) {
        this.server = server;
        this.requesetCallback = null
        this.cacheRouteName = []
        server.on('request', (req, res) => {
            this.response = res;
            const method = req.method?.toLocaleUpperCase() || 'GET';
            const path = req.url
            if (method === 'GET') {
                const queryList = path.split('?');
                const url = queryList[0];
                req.query = getQuery(queryList[1]);
                this.requeset = req;
                this.requesetCallback(req, res);
            } else if (method === 'POST') {
                req.on('data', (chunk) => {
                    req.body = chunk.toString();
                    this.requeset = req;
                    this.requesetCallback(req, res);
                })
            }
        })
    }

    use(path, module) {
        this.cacheRouteName.push(path); // 缓存请求路径
    }

    router(path, callback) {
        callback(path, {requeset: this.requeset, response: this.response});
    }

    get(path, cb) {
        this.requesetCallback = cb; // 把路由回调函数传入
    }

    psot(path, cb) {
        this.requesetCallback = cb; // 把路由回调函数传入
    }
}

const useRouter = (server) => {
    const instantiation = new requesetServer(server);
    return (path, route) => {
        console.log(path)
        return instantiation
    }
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
        use: useRouter(server),
    }
}

module.exports = express