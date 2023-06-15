const path = require('path');
const fs = require('fs');
const { Buffer } = require('buffer');
const { ancientPoetry } = require('./data');

const filePath = path.resolve(__dirname, 'mkdir');

fs.exists(filePath, (exists) => {
    console.log(`${filePath} ${exists ? '文件存在' : '文件不存在'} `);
    // /Users/zhengkexiang/Desktop/VUE3/project/node/day05_files/mkdir 文件存在
})



