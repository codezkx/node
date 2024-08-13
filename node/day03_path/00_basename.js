const path = require('path');

const _basename = process.cwd();
/* 
    path.basename
        path <string>
        suffix <string> 要删除的可选后缀
    path.basename() 方法返回 path 的最后一部分，类似于 Unix basename 命令。 忽略尾随 目录分隔符。
        目录分割符： 
            Windows 上是 \
            POSIX 上是 /
    suffix： 是区分大小写的
*/
const baseName = path.basename(_basename);
const baseName1 = path.basename(_basename, '/1');
const baseName2 = path.basename(_basename, '.JS');
const baseName3 = path.basename('common.ts', '.ts');

console.log(baseName);
console.log(baseName1);
console.log(baseName2);
console.log(baseName3);

// day0300_path.js
// day0300_path
// day0300_path.js    后缀没有被过滤
