const connection = require('../plugins/mysql/database');

class FileServer {
    async create({ id, name, url, size, mimetype, user_id }) {
        const statement = 'INSERT INTO picture (id, name, url, size, mimetype, user_id) VALUES (?, ?, ?, ?, ?, ?);';
        const [result] = await connection.execute(statement, [id, name, url, size, mimetype, user_id])
        return result;
    }

    async qeuryImageInfo(userId) {
        const statement = 'SELECT * FROM picture WHERE user_id = ?';
        const [result] = await connection.execute(statement, [userId])
        return result
    }
}

module.exports = new FileServer();
