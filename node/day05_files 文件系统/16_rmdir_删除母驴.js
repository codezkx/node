const path = require('path');
const fs = require('fs');
const { Buffer } = require('buffer');
const { ancientPoetry } = require('./data');


/* 
    fs.rmdir(path[, options], callback)
        path <string> | <Buffer> | <URL>
        options <Object>
            maxRetries <integer> 如果遇到 EBUSY、EMFILE、ENFILE、ENOTEMPTY 或 EPERM 错误，Node.js 将在每次尝试时以 retryDelay 毫秒的线性退避等待时间重试该操作。 此选项表示重试次数。 如果 recursive 选项不为 true，则忽略此选项。 默认值: 0。
            recursive <boolean> 如果为 true，则执行递归目录删除。 在递归模式下，操作将在失败时重试。 默认值: false。 已弃用。
            retryDelay <integer> 重试之间等待的时间（以毫秒为单位）。 如果 recursive 选项不为 true，则忽略此选项。 默认值: 100。
        callback <Function>
            err <Error>


异步的 rmdir(2)。 除了可能的异常之外，没有为完成回调提供任何参数。

在文件（而不是目录）上使用 fs.rmdir()，则在 Windows 上会导致 ENOENT 错误，在 POSIX 上会导致 ENOTDIR 错误。

要获得类似于 rm -rf Unix 命令的行为，则使用具有选项 { recursive: true, force: true } 的 fs.rm()。

*/
const filePath = path.resolve(path.dirname(__filename), 'auto_mkdir');

fs.mkdir(filePath, (err) => {
    if (err) throw new Error(err);
    console.log(`创建目录 ---${filePath} ---- 成功`);
    setTimeout(() => {
        fs.rmdir(filePath, (err) => {
            if (err) throw new Error(err);
            console.log(`删除目录 ---${filePath} ---- 成功`);
        })
    }, 2000);
})
