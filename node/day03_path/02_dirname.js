const path = require('path');

/* 
    `path.dirname()`方法返回一个`path`的目录名，类似于Unix中的`dirname`命令。
     获取传入的path路径上一级的目录 
        /Users/zhengkexiang/Desktop/VUE3/project/node/day03
        /Users/zhengkexiang/Desktop/VUE3/project/node

*/
console.log(__filename);
// /Users/zhengkexiang/Desktop/VUE3/project/node/day03/02_dirname.js
console.log(path.dirname(__filename));
// 返回：/Users/zhengkexiang/Desktop/VUE3/project/node/day03

console.log(process.cwd());
// /Users/zhengkexiang/Desktop/VUE3/project/node/day03
console.log(path.dirname(process.cwd()))
// /Users/zhengkexiang/Desktop/VUE3/project/node
