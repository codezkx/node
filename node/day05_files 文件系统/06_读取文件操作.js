const path = require('path');
const fs = require('fs');
const { Buffer } = require('buffer');

/* 
    fs.read(fd, buffer, offset, length, position, callback)
        参数
            fd <integer>
            buffer <Buffer> | <TypedArray> | <DataView> 数据将写入的缓冲区。
            offset <integer> 要写入数据的 buffer 中的位置。
            length <integer> 读取的字节数。
            position <integer> | <bigint> | <null> 指定从文件中开始读取的位置。 如果 position 为 null 或 -1 ，则将从当前文件位置读取数据，并更新文件位置。 如果 position 是整数，则文件位置将保持不变。
            callback <Function>
                err <Error>
                bytesRead <integer>
                buffer <Buffer>

        
        从 fd 指定的文件中读取数据。

        回调被赋予三个参数，(err, bytesRead, buffer)。

        如果未同时修改文件，当读取的字节数为零时，则到达文件末尾。

        如果此方法作为其 util.promisify() 版本被调用，则返回具有 bytesRead 和 buffer 属性的 Object 的 promise。

        注意需要配合fs.open api 使用
*/
const filePath = path.join(path.dirname(__filename), 'readFile', 'text.text')
fs.open(filePath, 'r', '0666', (err, fd) => {
    let buf = Buffer.alloc(12); // buf表示read最大读取内存， 这里只能读取12字节
    // 相当于把读取的数据存储到buf缓存区去
    fs.read(fd, buf, 0, 9, 0, (err, bytesRead, buffer) => { // 异步读取
        if (err) throw new Error(err);
        // text.text => 文件内容： 异步写入
        console.log('字段数:', bytesRead, '缓存区:', buffer.toString()); // 字段数: 9 缓存区: 异步写
    })

    // 同步读取   注意的是buf的值是自己定义的 buf
    const bytesRead = fs.readSync(fd, buf, 0, 9, 0);
    console.log('readSync 同步读取', bytesRead, '缓存区: ', buf.toString()); // readSync 同步读取 9 缓存区:  异步写

})

// 异步读取文件内容
fs.readFile('./readFile/text.text', (err, data) => {
    console.log(data.toString()); // 异步写入
})

// 同步读取文件内容
const fileContent = fs.readFileSync('./readFile/text.text');
console.log('文件内容: ', fileContent.toString()); // 文件内容:  异步写入


/* 
    fs.symlink(target, path[, type], callback)
        target <string> | <Buffer> | <URL>
        path <string> | <Buffer> | <URL>
        type <string> | <null> 默认值： null
        callback <Function>
            err <Error>
    如果 type 参数不是字符串，则 Node.js 将自动检测 target 类型并使用 'file' 或 'dir'。 如果 target 不存在，将使用 'file'。 Windows 交接点要求目标路径是绝对路径。 使用 'junction' 时，target 参数将自动规范化为绝对路径。

    符号链接文件的好处是:
        可以指向任何类型的文件或目录
        可随时改变所指向的目标文件或目录
        符号链接文件变化不大,节省磁盘空间


    需要注意的是:
        符号链接文件指向的目标文件可以是本地文件,也可以是网络文件
        符号链接文件实际上和目标文件是独立的,修改链接文件本身不会影响目标文件
        使用fs.readlink可以读取符号链接文件指向的目标路径。

*/
fs.symlink('./readFile', './readFileTow', (err) => { // 如果readFileTow存在则报错，这里相当于把readFile 目录的文件复制一份放到readFileTow中去
    if (err) throw new Error(err);

})

/* 
    fs.readlink(path[, options], callback)
        path <string> | <Buffer> | <URL>
        options <string> | <Object>
            encoding <string> 默认值： 'utf8'
        callback <Function>
            err <Error>
            linkString <string> | <Buffer>
        读取 path 引用的符号链接的内容。 回调有两个参数 (err, linkString)。
        可选的 options 参数可以是指定编码的字符串，也可以是具有 encoding 属性（指定用于传给回调的链接路径的字符编码）的对象。 如果将 encoding 设置为 'buffer'，则返回的链接路径将作为 <Buffer> 对象传入。

    注意： 必须使用symlink 创建一个符号链接文件



    fs.realpath 与 fs.readlink 类似,都是用于读取文件真实路径,但 fs.realpath 可以解决所有符号链接、软链接和 Junction 链接。

    fs.readlink 常用于读取符号链接指向的文件路径,然后进行后续操作。

    它与 fs.symlink 配合使用,可以创建和读取符号链接。

    所以,fs.readlink 的作用就是读取符号链接文件的真实路径。

    相比之下,fs.readlinkSync 是 fs.readlink 的同步版本,不需要回调函数。


*/

fs.readlink('./readFileTow', (err, linkStr) => {
    // if (err) throw new Error(err);
    console.log('linkStr: ', linkStr); // ./readFile

})

/* 
    fs.readv(fd, buffers[, position], callback)
        参数
            fd <integer>
            buffers <ArrayBufferView[]>
            position <integer> | <null> 默认值： null
            callback <Function>
                err <Error>
                bytesRead <integer>
                buffers <ArrayBufferView[]>

        从 fd 指定的文件读取并使用 readv() 写入 ArrayBufferView 的数组。

        position 是从文件开头应该读取数据的偏移量。 如果 typeof position !== 'number'，则从当前位置读取数据。

        回调将被赋予三个参数： err、bytesRead 和 buffers。 bytesRead 是从文件中读取的字节数。

        如果此方法作为其 util.promisify() 版本被调用，则返回具有 bytesRead 和 buffers 属性的 Object 的 promise。

        注意
            fs.readv 的优势是:
                能更高效地读取文件内容到多个 buffers 中
                避免因为内存拷贝而引起的性能问题
            所以,fs.readv 的主要作用是:允许一次性读取文件内容到多个 buffers 中,性能更高。
*/

fs.open(filePath, 'r', '0666', (err, fd) => {
    const buffers = [Buffer.alloc(10)];
    fs.readv(fd, buffers, (err, bytesRead, buffers) => {
        if (err) throw new Error(err);
        console.log('bytesRead: ', bytesRead);
        console.log('buffers: ', buffers);

    })
});



