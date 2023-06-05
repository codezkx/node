// import path from 'path';
// import fs from 'fs';
// import { Buffer } from 'buffer';
// import module from 'module'
const path = require('path');
const fs = require('fs');
const { Buffer } = require('buffer');

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

const copyFiles = (src, target, flag) => {
    fs.readFile(src, (err, data) => {
        fs.writeFile(target, data, { flag }, (err) => {
            if (err) {
                throw new Error('出现错误');
            }
            console.log('ok')
        })
    })
}

const src = path.resolve(__dirname, 'readFile', 'text.text');
const target = path.resolve(__dirname, 'readFile', 'append.text');
copyFiles(src, target, 'wx'); // 文件不存在则创建 有则覆盖

