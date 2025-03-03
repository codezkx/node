const express = require('express');
const { getPubKeyPem } = require('../core/rsaControl');
const { successMessage, errMessage } = require('../core/utils/resMessage.js');
const { authenticateToken } = require('../middleware/jwt.js');

const router = express.Router();

/* GET users listing. */
router.get('/testApi1', authenticateToken, function (req, res, next) {
  res.send(successMessage('你好我是测试1'));
});

router.get('/testApi2', authenticateToken, function (req, res, next) {
  res.send(successMessage('你好我是测试2'));
});

module.exports = router;
