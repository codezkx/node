const express = require('express');
const cors = require('cors'); // 导入跨域中间件

// 执行express
const app = express();

// 跨域处理
app.use(cors({
    "origin": true, //true 设置为 req.origin.url
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE", //容许跨域的请求方式
    "allowedHeaders": "x-requested-with,Authorization,token, content-type", //跨域请求头
    "preflightContinue": false, // 是否通过next() 传递options请求 给后续中间件 
    "maxAge": 1728000, //options预验结果缓存时间 20天
    "credentials": true, //携带cookie跨域
    "optionsSuccessStatus": 200 //options 请求返回状态码
}))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 路由导入
const { userRouter, finalTeamRouter } = require('./routes');

// 使用路由中间件
app.use('/users', userRouter);
app.use('/final/team', finalTeamRouter);

// express 内置的中间件
app.post('/user', (req, res, next) => {
    console.log(req.body);
    // req.on('data', (chunk) => {
    //     res.send('express.json');
    // });
    res.send('express.json');
});

module.exports = app
