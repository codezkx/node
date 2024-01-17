const fs = require('fs');
const path = require('path');
const { Buffer } = require('node:buffer');


// | 符号 | 含义                                     |
// | ---- | ---------------------------------------- |
// | r    | 读文件，文件不存在报错                   |
// | r+   | 读取并写入，文件不存在报错               |
// | rs   | 同步读取文件并忽略缓存                   |
// | w    | 写入文件，不存在则创建，存在则清空       |
// | wx   | 排它写入文件                             |
// | w+   | 读取并写入文件，不存在则创建，存在则清空 |
// | wx+  | 和w+类似，排他方式打开                   |
// | a    | 追加写入                                 |
// | ax   | 与a类似，排他方式写入                    |
// | a+   | 读取并追加写入，不存在则创建             |
// | ax+  | 作用与a+类似，但是以排他方式打开文件     |

const pathFile = path.resolve(path.dirname(__filename), 'readFile');
/* 
    fs.writeFile(file, data[, options], callback)
        参数
            file <string> | <Buffer> | <URL> | <integer> 文件名或文件描述符
            data <string> | <Buffer> | <TypedArray> | <DataView> | <Object>
            options <Object> | <string>
                encoding <string> | <null> 默认值： 'utf8'
                mode <integer> 默认值： 0o666
                flag <string> 参见 支持文件系统 flags。 默认值: 'w'。
                signal <AbortSignal> 允许中止正在进行的写入文件
            callback <Function>
                err <Error> | <AggregateError>


        当 file 是文件名时，将数据异步地写入文件，如果文件已存在则替换该文件。 
        data 可以是字符串或缓冲区。

        当 file 是文件描述符时，其行为类似于直接调用 fs.write()（推荐）。 请参阅以下有关使用文件描述符的说明。

        如果 data 是缓冲区，则忽略 encoding 选项。

        mode 选项仅影响新创建的文件。 有关详细信息，请参阅 fs.open()。

*/

fs.readdir(pathFile, (err, files) => {
    if (!files?.length) return 
    files.forEach(file => {
        const verify = ['.text'].includes(path.extname(file))
        if (verify) {
            const buf = Buffer.from('你好贵州');
            // 异步写入类容
            const _file = path.join(pathFile, file); // 转成绝对路径
            fs.writeFile(_file, buf, (err) => { // 文件不存在则创建 有则覆盖
                console.log(err)
            })
        }
    })
})


