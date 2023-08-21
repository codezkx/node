const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    // console.log(req.baseUrl, 'baseUrl') // 基本路径 /user(主路径路径)
    // console.log(req.originalUrl, 'originalUrl'); // 完整路径: /user?username=uzi&password=123456
    // console.log(req.url, 'url') // 当清路由的完整路径: /?username=uzi&password=123456 
    // console.log(req.range(1000), 'range');
    // console.log(req.ip, 'ip');
    try {
        const { username, password } = req.query;
        if (username === 'uzi' && password === '123456') {
            res.send(200, {
                code: 200,
                data: {
                    userInfo: {
                        userId: 006,
                        userName: 'UZI',
                        description: '英雄联盟S14全球总决赛总冠军!!!',
                    },
                },
                message: '登录成功',
                success: true,
            });
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;