const path = require('path')
import { EventEmitter } from 'node:events';

/* 
    模块作用域
        当前模块的目录名。 相当于 __filename 的 `path.dirname()`
*/
console.log(__dirname); // 当前文件 目录的路径

console.log(__filename); // 当前文件的文件路径

/** 
 * 
 * @description
 * 获取当前文件的父级目录。
 *  如：root1/root2/a.js   
 *      path.dirname('root1/root2/a.js') -> 'root1/root2'
 *      path.dirname('root1/root2') -> 'root1'  
 * 
 */
console.log(path.dirname(__filename)); // path 模块详细介绍

exports.a = 1; // 当前文件导出的数据
console.log(exports);


global.a = '我是a';
console.log(global === global.global); // true
console.log(global); // 当前模块哦的全局对象  

/* 
    process.cwd(): 当前项目的目录路径 

*/
// console.log(process);

// 可以使用__dirname 来配置加载路径
const ex = require(`${__dirname}/export.js`);
console.log(ex, 'ex');

console.log(require.resolve(__filename)) // 解析的模块路径。

console.log(require.resolve.paths(__filename)) // '模块的搜索路径'。

console.log(performance, 'performance')

conso0le.log(import)