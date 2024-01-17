const mysql = require('mysql2');
const config = require('./confjg');

// 池化
const pool = mysql.createPool({
    host: config.MYSQL_HOST,
    port: config.MYSQL_PORT,
    user: config.MYSQL_USER,
    password: config.MYSQL_PASSWORD,
    database: config.MYSQL_DATABASE,
})

pool.getConnection((err, conn) => {
    if (err) {
        console.log('数据库连接失败！！！', err)
    } else {
        console.log('数据库连接成功！！！')
    }
});


// 关闭连接
// pool.end(() => {

// })

// 事件
pool.on('connection', function (connection) {
    connection.config.body_ = '你好'
}); 

// 切换用户和改变连接状态(不兼容createPool创建的连接)
// connection.changeUser({user : 'john'}, function(err) {
// if (err) throw err;
// });


module.exports = pool.promise();