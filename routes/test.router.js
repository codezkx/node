const querystring = require('querystring');
const http = require('http');
const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    res.setHeader("Cache-Control", "no-cache")
    try {
        res.locals.model = {
            title: "上海大师赛!",
            description: "将由CN赛区夺得总冠军!"
        }

        res.status(200);
        res.render("test");
    } catch(err) {
        next(err);
    }
});

router.get('/jsonp', (req, res, next) => {
    const params = querystring.parse(req.url.split('?')[1]);
    console.log(JSON.stringify(params))
    const callback = params.callback;
    res.writeHead(200, { 'Content-Type': 'text/javascript' });
    res.write(`${callback}({test: "我是服务器数据"})`);
    res.end();
})

module.exports = router;
