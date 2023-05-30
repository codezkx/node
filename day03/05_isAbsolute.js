const path = require('path');


/* 
    path.isAbsolute(path)
        path <string>
        return： <boolean>

        path.isAbsolute() 方法确定 path 是否为绝对路径。

        如果给定的 path 是零长度字符串，则将返回 false。
*/

console.log(path.isAbsolute(process.cwd())); // 绝对路径
console.log(path.isAbsolute('../05_isAbsolute.js'));

// 在 POSIX 上： 

// path.isAbsolute('/foo/bar'); // true
// path.isAbsolute('/baz/..');  // true
// path.isAbsolute('qux/');     // false
// path.isAbsolute('.');        // false 


// 在 Windows 上：

// path.isAbsolute('//server');    // true
// path.isAbsolute('\\\\server');  // true
// path.isAbsolute('C:/foo/..');   // true
// path.isAbsolute('C:\\foo\\..'); // true
// path.isAbsolute('bar\\baz');    // false
// path.isAbsolute('bar/baz');     // false
// path.isAbsolute('.');           // false 