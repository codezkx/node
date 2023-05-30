const path = require('path');

/* 
    path.relative(from, to)
        from <string>
        to <string>
        返回： <string>

    path.relative() 方法根据当前工作目录返回从 from 到 to 的相对路径。 如果 from 和 to 都解析为相同的路径（在分别调用 path.resolve() 之后），则返回零长度字符串。

    如果零长度字符串作为 from 或 to 传入，则将使用当前工作目录而不是零长度字符串

*/

const relative = path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb')

console.log(relative)
// ../../impl/bbb // 相同的路径被../../ 代替。 不同路径则是第二个参数的路径覆盖第一个参数



