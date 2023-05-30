const path = require('path');

/* 
    path.normalize(path)
        path <string>
        返回： <string>

    path.normalize() 方法规范化给定的 path，解析 '..' 和 '.' 片段。

    当找到多个连续的路径片段分隔符（例如 POSIX 上的 / 和 Windows 上的 \ 或 /）时，则它们将被平台特定路径片段分隔符（POSIX 上的 / 和 Windows 上的 \）的单个实例替换。 保留尾随的分隔符。

    如果 path 是零长度字符串，则返回 '.'，表示当前工作目录。

*/

console.log(path.normalize('/foo/bar//baz/asdf/quux'));
// /foo/bar/baz/asdf/quux   把 //  替换成/

console.log(path.normalize('/foo/bar/baz/asdf/quux/..'));
// /foo/bar/baz/asdf 符合获取文件规则


