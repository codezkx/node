const express = require('express');
const { getPubKeyPem } = require('../core/rsaControl');
const router = express.Router();

/* GET users listing. */
router.get('/publicKey', function (req, res, next) {
  res.set('Content-Type', 'application/x-pem-file');
  const pub_key = getPubKeyPem()
  res.send({
    data: {pub_key},
    err: null,
    success: true,
    code: 0
  });
});

module.exports = router;
