const mysql = require('mysql2');
const config = require('./confjg');

const pool = mysql.createPool({
    host: config.MYSQL_HOST,
    port: config.MYSQL_PORT,
    user: config.MYSQL_USER,
    password: config.MYSQL_PASSWORD,
    database: config.MYSQL_DATABASE,
});

// 直接使用连接池    pool.query() 和 pool.execute()
// pool.query('SELECT * FROM brand', (err, results, fileds) => {
//     console.log(results, 'results');
// })

// 手动从池中获取连接并稍后返回
// pool.getConnection((err, conn) => {
//     console.log(err, 'err')
//     conn.query('SELECT * FROM brand', (err, results, fileds) => {
//         console.log(results, 'results');
//     })
// })


// const connection = mysql.createConnection({
//     host: 'localhost',
//     port: '3306',
//     user: 'root',
//     password: 'zkx1308725201',
//     database: 'db_music',
// })

// const statement = `INSERT INTO products SET ?;`;
// const phoneJson = require('../../assets/data/phone.json');

// 向数据库写入数据
// for (let phone of phoneJson) {
//     console.log(phone, 'phone')
//     // connection.query(statement, phone);
// }

// -------------- 转义查询值 ------------
// $id = 1
// $query = `SELECT * FROM brand WHERE id = ${$id}`; // 这种不要直接使用
// 需要使用mysql.escape(),connection.escape()或pool.escape()方法来执行此操作：
// const sql = 'SELECT * FROM users WHERE id = ' + connection.escape($quer);
// connection.query(sql, (err, results, fields) => {
//     console.log(err, 'error');
//     console.log(results, 'results'); // 表中查到的数据
//     // console.log(fields, 'fields'); // 表的字段名
//     connection.destroy();
// })

// connection.execute("SELECT * FROM brand",
//     ['Rick C-137', 53],
//     (err, results, fields) => {
//         console.log(results); // 结果集
//         console.log(fields); // 额外元数据（如果有）
    
//         // 如果再次执行相同的语句，他将从缓存中选取
//         // 这能有效的节省准备查询时间获得更好的性能
//     }

// )

/* -------------插入数据------------------ */
// const post  = {id: 1, title: 'Hello MySQL'};
// const query = connection.query('INSERT INTO posts SET ?', post, function (error, results, fields) {
//   if (error) throw error;
//   // Neat!
// });
// console.log(query.sql); // INSERT INTO posts SET `id` = 1, `title` = 'Hello MySQL'

module.exports = {}