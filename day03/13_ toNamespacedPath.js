const path = require('path');

/* 
    path.toNamespacedPath(path)

        path <string>
        返回： <string>

        仅在 Windows 系统上，返回给定 path 的等效 命名空间前缀路径。 如果 path 不是字符串，则 path 将不加修改地返回。

        此方法仅在 Windows 系统上有意义。 在 POSIX 系统上，该方法是不可操作的，并且始终返回 path 而不进行修改。

*/

console.log(path.toNamespacedPath(process.cwd()))
// /Users/zhengkexiang/Desktop/VUE3/project/node/day03


