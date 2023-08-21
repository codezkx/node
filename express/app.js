const path = require('path');
const express = require('express');
const cors = require('cors'); // 导入跨域中间件
const crypto = require('crypto');

// 执行express
const app = express();

/* ------------------------- 第三方中间件-------------------------------- */
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
/**
 * @description
 *  1. express.row 用于处理二进制的数据
 *  2. express.text 用于处理文本数据
 *  3. express.urlencoded 用于处理&a=123&b=455这种格式的数据 
 */
app.use(express.urlencoded({ extended: false })); 
// 获取静态资源中间件
const publicPath = path.join(__dirname, 'public')
app.use(express.static(publicPath));

/* ------------------------- app实例方法---------------------- */
// 匹配所有的路由，不区分请求方法。
// app.all('/user', (req, res, next) => {
//     console.log(req.method, 'app.all');
//     res.send(200)
// });


// 如： '/user/:id' 这样的路由匹配成功时，才会执行下面的代码
// app.param('id', (req, res, next, id) => {
//     console.log('1 params --------- ', req.params);
//     req.user = req.params;
//     next()
// })

// app.get('/user/:id', (req, res, next) => {

//     res.send(200)
//     next()
// })

/* -------------------路由使用----------------------------------------- */
// 路由导入
const {
    userRouter,
    finalTeamRouter,
    imageFlie
} = require('./routes');

// 使用路由中间件
app.use('/user', userRouter);
app.use('/final/team', finalTeamRouter);
app.use('/image/flie', imageFlie);


// express 内置的中间件r
app.post('/user', (req, res, next) => {
    // console.log(req); // 需要express.json()中间件
    // req.on('data', (chunk) => {
    //     res.send('express.json');
    // });
    res.send('express.json');
});

/* -----------------全局属性locals------------------------ */
// app.locals 可以直接设置值

/* -----------------------Node 错误处理--------------------*/
Error.stackTraceLimit = 10
const error = new Error('错误处理');
// console.log(error.stack)

/* ---------------------Confidentiality 保密------------------- */
const hash = crypto.createHash('md5');
// 可任意多次调用update()
// console.log('Hello world');
// console.log('Hello, nodejs');

// console.log(hash.digest('hex'));

// AES对称加密
function aesEncrypt(data, key) {
    const cipher = crypto.createCipher('aes192', key);
    var crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

function aesDecrypt(encrypted, key) {
    const decipher = crypto.createDecipher('aes192', key);
    var decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

var data = 'Hello, this is a secret message!';
var key = 'Password!';
var encrypted = aesEncrypt(data, key);
var decrypted = aesDecrypt(encrypted, key);

console.log('Plain text: ' + data);
console.log('Encrypted text: ' + encrypted);
console.log('Decrypted text: ' + decrypted);

// RSA 不对称加密

module.exports = app;
