const path = require('path');
const fs = require('fs');
const { Buffer } = require('buffer');
const { ancientPoetry } = require('./data');

const filePath = path.resolve(__dirname, 'readFile/');

/* 
    fs.stat(path[, options], callback)
        path <string> | <Buffer> | <URL>
        options <Object>
            bigint <boolean> 返回的 <fs.Stats> 对象中的数值是否应为 bigint。 默认值: false。
        callback <Function>
            err <Error>
            stats <fs.Stats>

    异步的 stat(2)。 回调有两个参数 (err, stats)，其中 stats 是 <fs.Stats> 对象。

    如果出现错误，err.code 将是 常见系统错误 之一。

    fs.stat() 遵循符号链接。 使用 fs.lstat() 查看链接本身。

    不建议在调用 fs.open()、fs.readFile() 或 fs.writeFile() 之前使用 fs.stat() 检查文件是否存在。 而是，用户代码应该直接打开/读取/写入文件，并在文件不可用时处理引发的错误。

    要检查文件是否存在而不对其进行操作，建议使用 fs.access()。
*/


fs.stat(filePath, { bigint: true }, (err, stats) => {
    if (err) throw new Error(err);
    // console.log(stats, 'stats');
    /* 
        Stats {
    dev: 2114, //设备的数字标识符
    ino: 48064969, //文件系统特定的文件索引节点编号
    mode: 33188, //描述文件类型和模式的位字段
    nlink: 1, //文件存在的硬链接数
    uid: 85, //拥有该文件（POSIX）的用户的数字型用户标识符
    gid: 100, //拥有该文件（POSIX）的群组的数字型群组标识符
    rdev: 0, //如果文件被视为特殊文件，则此值为数字型设备标识符
    size: 527, //文件的大小（以字节为单位）
    blksize: 4096, //用于 I/O 操作的文件系统块的大小
    blocks: 8, //为此文件分配的块数
    atimeMs: 1318289051000.1, //访问此文件的时间戳
    mtimeMs: 1318289051000.1, //修改此文件的时间戳
    ctimeMs: 1318289051000.1, //更改此文件的时间戳
    birthtimeMs: 1318289051000.1, //创建时间的时间戳
    atime: 'Mon, 10 Oct 2020 23:24:11 GMT', //文件数据最近被访问的时间。
    mtime: 'Mon, 10 Oct 2020 23:24:11 GMT', //文件数据最近被修改的时间。
    ctime: 'Mon, 10 Oct 2020 23:24:11 GMT', //文件状态最近被改变的时间（修改索引节点数据）。
    birthtime: 'Mon, 10 Oct 2020 23: 24: 11 GMT' //文件创建的时间。
}
    */
})


/* 
    fs.statfs(path[, options], callback)
        path <string> | <Buffer> | <URL>
        options <Object>
            bigint <boolean> 返回的 <fs.StatFs> 对象中的数值是否应为 bigint。 默认值: false。
        callback <Function>
            err <Error>
            stats <fs.StatFs>
        
        异步的 statfs(2)。 返回有关包含 path 的已安装文件系统的信息。 回调有两个参数 (err, stats)，其中 stats 是 <fs.StatFs> 对象。
*/

fs.statfs(filePath, { bufgint: true }, (err, stats) => {
    if (err) throw new Error(err);
    // console.log(stats, 'stats');
    /* 
        statfs.bavail #非特权用户可用的空闲块。

        statfs.bfree#文件系统中的空闲块。

        statfs.blocks #文件系统中的总数据块。

        statfs.bsize #最佳传输块大小。

        statfs.ffree #文件系统中的空闲文件节点。

        statfs.files #文件系统中的文件节点总数。

        statfs.type #文件系统的类型。
    */
})

/* 
    fs.fstat(fd[, options], callback)
        fd <integer>  // 使用ope回调
        options <Object>
            bigint <boolean> 返回的 <fs.Stats> 对象中的数值是否应为 bigint。 默认值: false。
        callback <Function>
            err <Error>
            stats <fs.Stats>
    使用文件描述符的 <fs.Stats> 调用回调。
*/
fs.open(filePath, (err, fd) => {
    if (err) throw new Error(err);
    fs.fstat(fd, {bigint: true},(err, state) => {
        if (err) throw new Error(err);
        console.log(`${filePath}--->目录的信息：`, state);
    })
});
// fs.fstat()


/* 
    fs.lstat(path[, options], callback)
        path <string> | <Buffer> | <URL>
        options <Object>
            bigint <boolean> 返回的 <fs.Stats> 对象中的数值是否应为 bigint。 默认值: false。
        callback <Function>
            err <Error>
            stats <fs.Stats>
        
    获取路径引用的符号链接的 <fs.Stats>。 回调有两个参数 (err, stats)，其中 stats 是 <fs.Stats> 对象。 lstat() 与 stat() 相同，除了如果 path 是符号链接，则被统计的是链接本身，而不是它引用的文件。
*/

// fs.lstat()



