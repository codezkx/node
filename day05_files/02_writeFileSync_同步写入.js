const path = require('path');
const fs = require('fs');
const { Buffer } = require('buffer');

const fileResolvePath = path.resolve(process.cwd(), 'readFile');
/* 
    fs.writeFileSync(file, data[, options])
        参数
            file <string> | <Buffer> | <URL> | <integer> 文件名或文件描述符
            data <string> | <Buffer> | <TypedArray> | <DataView> | <Object>
            options <Object> | <string>
                encoding <string> | <null> 默认值： 'utf8'
                mode <integer> 默认值： 0o666
                flag <string> 参见 支持文件系统 flags。 默认值: 'w'。


        返回 undefined。

        mode 选项仅影响新创建的文件。 有关详细信息，请参阅 fs.open()。

        有关详细信息，请参阅此 API 的异步版本的文档： fs.writeFile().
*/

fs.readdir(fileResolvePath, (err, files) => {
    console.log(files, 'files')
    if (!files?.length) return
    files.forEach(file => {
        const verify = ['.text'].includes(path.extname(file));
        if (verify) {
            const _file = path.join(fileResolvePath, file);
            const buffer1 = Buffer.from('同步写入');
            const buffer = Buffer.from('异步写入');
            fs.writeFileSync(_file, buffer1, (err) => {
            }); // 同步写入
            fs.writeFile(_file, buffer, (err) => {
            }); // 异步写入
        }
    })
})









