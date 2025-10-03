const path = require('path');

module.exports = {
    host: '127.0.0.1',
    root: process.cwd(),
    port: 3000,
    uploadURL: 'http://127.0.0.1:3000/',
    maxFileSize: 102400000,
    uploadPath: path.join(process.cwd(), '/public/'),
}