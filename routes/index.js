var express = require('express');
var router = express.Router();
const server = require('../server/test.server')
server.connec(1);
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
