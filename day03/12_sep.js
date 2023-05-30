const path = require('path');

/* 
    path.sep
        <string>

    提供特定于平台的路径片段分隔符：
        Windows 上是 \
        POSIX 上是 /

*/

console.log('foo/bar/baz'.split(path.sep));
// Returns: ['foo', 'bar', 'baz'] )

// 在 Windows 上：

// 'foo\\bar\\baz'.split(path.sep);
// Returns: ['foo', 'bar', 'baz'] 