const path = require('path');

const filename = process.cwd(__filename); // 返回当前目录

/* 
    path.extname(path)
    path <string>
    return： <string>
    path.extname() 方法返回 path 的扩展名，即 path 的最后一部分中从最后一次出现的 .（句点）字符到字符串的结尾。 如果 path 的最后一部分中没有 .，或者除了 path 的基本名称（参见 path.basename()）的第一个字符之外没有 . 个字符，则返回空字符串。
*/

console.log(path.extname(__filename));
// .js
path.extname('index.html');
// Returns: '.html'

path.extname('index.coffee.md');
// Returns: '.md'

path.extname('index.');
// Returns: '.'

path.extname('index');
// Returns: ''

path.extname('.index');
// Returns: ''

path.extname('.index.md');
// Returns: '.md' 