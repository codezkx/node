const express = require('express');
const { successMessage } = require('../utils/rsaControl.js');
const { authenticateToken } = require('../middlewares/jwt.js');

const router = express.Router();

const sleep = (delay) => {
    const now = Date.now();
    while( Date.now() - now < delay ) {

    }
}
/* GET users listing. */
router.get('/testApi1', authenticateToken, function (req, res, next) {

  res.send(successMessage('你好我是测试1'));
});

router.get('/testApi2', authenticateToken, function (req, res, next) {
  res.send(successMessage('你好我是测试2'));
});

module.exports = router;
