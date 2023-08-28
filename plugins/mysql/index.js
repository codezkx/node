// const mysql = require('mysql2');


const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'zkx1308725201',
    database: 'db_music',
})

const statement = `INSERT INTO products SET ?;`;
const phoneJson = require('../../assets/data/phone.json');

for (let phone of phoneJson) {
    connection.query(statement, phone);
}

// function connection() {
//     const connection = mysql.createConnection({
//         host: 'localhost',
//         port: 3306,
//         user: 'rott',
//         password: 'YES',
//         database: 'db_music',
//     })
    
//     const statement = `INSERT INTO products SET ?;`;
//     const phoneJson = require('../../assets/data/phone.json');
    
//     for (let phone of phoneJson) {
//         connection.query(statement, phone);
//     }
// }


// module.exports = connection