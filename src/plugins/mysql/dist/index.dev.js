"use strict";

var mysql = require('mysql2');

var connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'zkx1308725201',
  database: 'db_music'
}); // const statement = `INSERT INTO products SET ?;`;
// const phoneJson = require('../../assets/data/phone.json');
// for (let phone of phoneJson) {
//     console.log(phone, 'phone')
//     // connection.query(statement, phone);
// }

connection.query('SELECT * FROM brand', function (err, results, fields) {
  console.log(err, 'error');
  console.log(results, 'results'); // 表中查到的数据

  console.log(fields, 'fields'); // 表的字段名

  connection.destroy();
});
module.exports = {};