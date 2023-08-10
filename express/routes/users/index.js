const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
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