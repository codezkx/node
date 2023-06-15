const path = require('path');
const fs = require('fs');
const { Buffer } = require('buffer');


/* 
    fs.accessSync(path[, mode])#
        path <string> | <Buffer> | <URL>
        mode <integer> 默认值： fs.constants.F_OK
    
    同步地测试用户对 path 指定的文件或目录的权限。 mode 参数是可选的整数，指定要执行的可访问性检查。 mode 应该是值 fs.constants.F_OK 或由 fs.constants.R_OK、fs.constants.W_OK 和 fs.constants.X_OK 中的任何一个（例如 fs.constants.W_OK | fs.constants.R_OK）的按位或组成的掩码。 检查 文件访问常量 以获得 mode 的可能值。

    如果任何可访问性检查失败，将抛出 Error。 否则，该方法将返回 undefined。

*/


// 同步创建
const makepSync = (dir) => {
    let parts = dir.split(path.sep); // sep 返回系统的文件目录分隔符
    for (let i = 1; i <= parts.length; i++) {
        let parent = parts.slice(0, i).join(path.sep);
        if (!parent) { // 去除空字符串
            continue
        }
        try {
            fs.accessSync(parent);
        } catch (err) {
            console.log(parent, 'parent');
            fs.mkdirSync(parent);
        }
    }
}

const newDirname = path.resolve(path.dirname(__filename), '异步创建目录');
// makepSync(newDirname);

// 异步创建
const makepAsync = (dir, callback) => {
    if (!dir) {
        return false;
    };
    let parts = dir.split(path.sep)
    let i = 1
    function next() {
        if (i > parts.length) {
            return callback && callback();
        }
        let parent = parts.slice(0, i++).join(path.sep);
        fs.access(parent, err => {
            if (err) {
                fs.mkdir(parent, next);
            } else {
                next();
            }
        })
    }
    next();
}

const asyncDirname = path.resolve(path.dirname(__filename), '异步创建目录');

makepAsync(asyncDirname);
