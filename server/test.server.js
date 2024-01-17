const connection = require('../plugins/mysql/database');

class Server {
    async connec(brandId) {
        // ??占位符execute不支持
        // const [result] = await connection.qeury(`SELECT ?? FROM ?? WHERE id = ?`, ['name' ,'brand', brandId]);

        // 有使用这个形式来传入查询的sql语句
        // var sql = "SELECT * FROM ?? WHERE ?? = ?";
        // var inserts = ['users', 'id', 1];
        // sql = connection.format(sql, inserts);
        // console.log(sql) // // SELECT `username`, `email` FROM `users` WHERE id = 1
        
        const [result] = await connection.execute(`SELECT * FROM brand WHERE id = ?`, [brandId]);
        // console.log(connection.config)
        // console.log(result, 'result')
    }
}

module.exports = new Server