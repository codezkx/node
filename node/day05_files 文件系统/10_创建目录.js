const path = require('path');
const fs = require('fs');
const { Buffer } = require('buffer');
const { ancientPoetry } = require('./data');

/* 
    fs.mkdir(path[, options], callback)
        参数：
            path <string> | <Buffer> | <URL>
            options <Object> | <integer>
                recursive <boolean> 默认值： false
                mode <string> | <integer> Windows 上不支持。 默认值: 0o777。
            callback <Function>
                err <Error>
                path <string> | <undefined> 仅当创建目录时将 recursive 设置为 true。


        异步地创建目录。

        回调给出一个可能的异常和创建的第一个目录路径（如果 recursive 为 true），(err[, path])。 当 recursive 为 true 时，如果没有创建目录，则 path 仍然为 undefined。

        可选的 options 参数可以是指定 
            mode（权限和粘性位）的整数，也可以是具有 mode 属性和 
            recursive 属性（指示是否应创建父目录）的对象。 当 path 是已存在的目录时，调用 fs.mkdir() 仅在 recursive 为 false 时才导致错误。
*/
const pathFile = path.resolve(path.dirname(__filename), 'mkdir');
fs.mkdir(pathFile, { recursive: true }, (err, path) => {
    if (err) throw new Error(err);
    console.log('path: ', path);
})

/* 
    fs.mkdtemp(prefix[, options], callback)
        prefix <string>
        options <string> | <Object>
            encoding <string> 默认值： 'utf8'
        callback <Function>
            err <Error>
            directory <string>
    
    在当前目录下创建唯一的临时目录。

    生成六个随机字符，附加在所需的 prefix 后面以创建唯一的临时目录。 由于平台的不一致，请避免在 prefix 中尾随 X 字符。 某些平台，尤其是 BSD，可能返回六个以上的随机字符，并将 prefix 中的尾随 X 字符替换为随机字符。

    创建的目录路径作为字符串传递给回调的第二个参数。

    可选的 options 参数可以是指定编码的字符串，也可以是具有 encoding 属性（指定要使用的字符编码）的对象。

*/

fs.mkdtemp('temp-dir-', (err, directory) => {
    if (err) throw new Error(err);
    console.log(directory, 'directory');
})








