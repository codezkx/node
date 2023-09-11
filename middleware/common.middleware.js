const path = require('path')
const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const baseUrl = process.cwd()

module.exports = function (app) {
    app.use(cors({
        "origin": true, //true 设置为 req.origin.url
        "methods": "GET,HEAD,PUT,PATCH,POST,DELETE", //容许跨域的请求方式
        "allowedHeaders": "x-requested-with,Authorization,token, content-type, content-disposition", //跨域请求头
        "preflightContinue": false, // 是否通过next() 传递options请求 给后续中间件 
        "maxAge": 1728000, //options预验结果缓存时间 20天
        "credentials": true, //携带cookie跨域
        "optionsSuccessStatus": 200 //options 请求返回状态码
      }))
      
      // view engine setup
    app.set('views', path.join(baseUrl, 'views'));
    app.set('view engine', 'jade');
    
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(baseUrl, 'public/picture')));
}