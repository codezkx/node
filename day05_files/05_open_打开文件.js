const path = require('path');
const fs = require('fs');
const { Buffer } = require('buffer');
const { opendir } = require('node:fs/promises')

// 排它：  如果文件不存在则创建， 存在则报错
// | 符号 | 含义                                     |
// | ---- | ---------------------------------------- |
// | r    | 读文件，文件不存在报错                   |
// | r+   | 读取并写入，文件不存在报错               |
// | rs   | 同步读取文件并忽略缓存                   |
// | w    | 写入文件，不存在则创建，存在则清空       |
// | wx   | 排它写入文件    |
// | w+   | 读取并写入文件，不存在则创建，存在则清空 |
// | wx+  | 和w+类似，排他方式打开                   |
// | a    | 追加写入                                 |
// | ax   | 与a类似，排他方式写入                    |
// | a+   | 读取并追加写入，不存在则创建             |
// | ax+  | 作用与a+类似，但是以排他方式打开文件     |

const filePath = path.resolve(__dirname, 'readFile', 'text.text');

// 获取目下的所有文件
// fs.readdir(filePath, (err, files) => {
//     console.log(filePath)
// })

fs.open(filePath, 'r', '0600', (err, fd) => {
    if (err) {
        throw new Error(err);
    }
    console.log(fd);
    fs.readFile(fd, (err, data) => { // 这里读取需要更具open的flag参数来确定是否是读取， 如果flag是w或者a者跟写入和追加有关, 只有是 r 时data才会有数据
        console.log(data)
    })
    fs.writeFile(fd, 'hollo', { flag: 'a+' }, (err) => { // 同上 为a 和 w会写入文件反之不会

    });
});

/* 
    fs.opendir(path[, options], callback)
    参数
        path <string> | <Buffer> | <URL>
        options <Object>
            encoding <string> | <null> 默认值： 'utf8'
            bufferSize <number> 当从目录读取时，在内部缓冲的目录条目数。 值越大，性能越好，但内存使用率越高。 默认值： 32
        callback <Function>
            err <Error>
            dir <fs.Dir>

    其作用是:打开指定的目录,返回一个目录流(directory stream),用于后续读取这个目录中的文件。

    另外,fs 模块中还提供了两个相关方法:
        fs.readdir(): 一次性读取整个目录内容
        fs.opendir(): 打开目录流,可以读多个项目
*/
// 读取 readFile 下的目录流
const opendirFn = async () => {
    const dir = await opendir('./readFile'); // 直接opendir在fs中到处来使用
    // console.log(dir)
    for await (const dirent of dir) {
        // console.log(dirent.name);
    }
}
opendirFn()

//  dir 是一个promise   获取指定目录下的文件 第一种方式
fs.opendir('./readFile', async (err, dir) => {
    for await (const dirent of dir) {
        console.log(dirent); // 获取文件信息
    }
})

//  dir 是一个promise   获取指定目录下的文件 第二种方式
fs.opendir('./readFile',async (err, dir) => {
    for await (const dirent of dir) {
        console.log(dirent); // 获取文件信息
    }
})
