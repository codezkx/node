const path = require('node:path');
const { Buffer } = require('node:buffer');
/* 
    - **ascii** - 仅支持 7 位 ASCII 数据。如果设置去掉高位的话，这种编码是非常快的。
    - **utf8** - 多字节编码的 Unicode 字符。许多网页和其他文档格式都使用 UTF-8 。
    - **utf16le** - 2 或 4 个字节，小字节序编码的 Unicode 字符。支持代理对（U+10000 至 U+10FFFF）。
    - **ucs2** - **utf16le** 的别名。
    - **base64** - Base64 编码。
    - **latin1** - 一种把 **Buffer** 编码成一字节编码的字符串的方式。
    - **binary** - **latin1** 的别名。
    - **hex** - 将每个字节编码为两个十六进制字符。
    Buffer.from
*/



const buffer = Buffer.from('runoob', 'ascii'); // 默认encoding utf-8
// console.log(buffer); // 缓存区对象  <Buffer 72 75 6e 6f 6f 62>

const bufStrHex = buffer.toString('hex'); // hex 十六进制
// console.log(bufStrHex); // 72756e6f6f62

const bufStrBase64 = buffer.toString('base64'); //
// console.log(bufStrBase64); // cnVub29i


/* 
    创建Buffer类
*/
// 创建一个长度为10， 且用0填充的Buffer
const buf1 = Buffer.alloc(10);  // 默认 encoding utf-8
// console.log(buf1, buf1[1] === 0); // <Buffer 00 00 00 00 00 00 00 00 00 00>

const buf2 = Buffer.alloc(10, 'a', 'utf-8'); // 默认是utf-8
// console.log('buf2', buf2);

const allocUnsafe = Buffer.allocUnsafe(10);
// console.log(allocUnsafe); // <Buffer c8 e4 03 05 01 00 00 00 ee a9>

const from1 = Buffer.from([1, 2, 3]);
// console.log(from1);




/* 
    写入缓存区

        write
            参数
                string <string> 要写入 buf 的字符串。
                offset <integer> 开始写入 string 之前要跳过的字节数。 默认值: 0。
                length <integer> 要写入的最大字节数（写入的字节数不会超过 buf.length - offset）。 默认值: buf.length - offset。
                encoding <string> string 的字符编码。 默认值: 'utf8'。
            返回： <integer> 写入的字节数。
*/
const buf3 = Buffer.alloc(20);

const write = buf3.write('你好');
// console.log('write', write); // 表示写入的字节数  一个字文代表三个字节

const write1 = buf3.write('www.runoob.com')
// console.log("写入字节数 : "+  write1); // 写入字节数 : 14





/*
    从缓存区读取数据
        参数
            - **encoding** - 使用的编码。默认为 'utf8' 。
            - **start** - 指定开始读取的索引位置，默认为 0。
            - **end** - 结束位置，默认为缓冲区的末尾。
        **返回值**
            解码缓冲区数据并使用指定的编码返回字符串。
 */
const _path = path.basename(__dirname);
const pathLen = _path.length;
const buf4 = Buffer.alloc(pathLen);
buf4.write(_path);
// console.log(buf4); // <Buffer 64 61 79 30 34 5f 42 75 66 66 65 72>
// console.log(buf4.toString('utf-8')); // 读取BUffe中的值 day04_Buffer
// console.log(buf4.toString('utf-8', 0, 5)); // day04





/* 
    将 Node Buffer 转换为 JSON 对象的函数语法格式如下：
        利用
         JSON的方法
            stringify
            parse
*/

const buf5 = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5]);
const bufJson1 = JSON.stringify(buf5);
// console.log(bufJson1, 'bufJson1'); // {"type":"Buffer","data":[1,2,3,4,5]} bufJson1
const ordinaryO = {
    a: '普通对象',
};
const ordinaryJson = JSON.stringify(ordinaryO);
// console.log(ordinaryJson); // {"a":"普通对象"}

// 获取值
const copy = JSON.parse(bufJson1, (key, value) => {
    return value && value.type === 'Buffer' ?
        Buffer.from(value.data) :
        value
})
// console.log(copy);

/* 
    Node 缓冲区合并
        Buffer.concat(list[, totalLength])
        -   **list** - 用于合并的 Buffer 对象数组列表。
-           **totalLength** - 指定合并后Buffer对象的总长度。
*/
const buf6 = Buffer.from('菜鸟教程: ');
const buf7 = Buffer.from('www.runoob.com');
const buf8 = Buffer.concat([buf6, buf7]);
console.log(buf8.toString());




/* 
    缓冲区比较
        buf.compare(target[, targetStart[, targetEnd[, sourceStart[, sourceEnd]]]])
            参数
                target <Buffer> | <Uint8Array> 用于比较 buf 的 Buffer 或 Uint8Array。
                targetStart <integer> target 内开始比较的偏移量。 默认值: 0。
                targetEnd <integer> target 中结束比较（不包括）的偏移量。 默认值: target.length。
                sourceStart <integer> buf 内开始比较的偏移量。 默认值: 0。
                sourceEnd <integer> buf 中结束比较（不包括）的偏移量。 默认值: buf.length。
            返回一个数字，表示 **buf** 在 **otherBuffer** 之前，之后或相同。

            将 buf 与 target 进行比较并返回数字，该数字指示 buf 在排序顺序中是在 target 之前、之后还是与 target 相同。 比较基于每个 Buffer 中的实际字节序列。

                1、如果 target 与 buf 相同，则返回 0
                2、如果排序时 target 应该在 buf 之前，则返回 1。
                3、如果排序时 target 应该在 buf 之后，则返回 -1。
*/
const buf9 = Buffer.from('ABC');
const buf10 = Buffer.from('DEF');
const buf11 = Buffer.from('ABCD');

const compareResilt = buf9.compare(buf9);
// console.log(compareResilt); // 1

const compareResilt1 = buf9.compare(buf10);
// console.log(compareResilt1); // -1

const compareResilt2 = buf10.compare(buf9);
// console.log(compareResilt2); // 1




/* 
    拷贝缓存区
        buf.copy(targetBuffer[, targetStart[, sourceStart[, sourceEnd]]])
            参数
                target <Buffer> | <Uint8Array> 要复制到的 Buffer 或 Uint8Array。
                targetStart <integer> target 内开始写入的偏移量。 默认值: 0。
                sourceStart <integer> buf 内开始复制的偏移量。 默认值: 0。
                sourceEnd <integer> buf 内停止复制的偏移量（不包括）。 默认值: buf.length。
            返回： <integer> 复制的字节数。
*/
const buf12 = Buffer.from('abcdefghijkl');
const buf13 = Buffer.from('RUNOOB');

const copyLen = buf12.copy(buf13, 2);
// console.log(copyLen); // 4
// console.log(buf13.toString()); // RUabcd 注意只会覆盖target现有长度




/* 
    裁剪缓存区
        buf.subarray([start[, end]])
            参数：
                start <integer> 新的 Buffer 将开始的位置。 默认值: 0。
                end <integer> 新的 Buffer 将结束的位置（不包括在内）。 默认值: buf.length。
            返回： <Buffer>
        
        返回新的 Buffer，其引用与原始缓冲区相同的内存，但由 start 和 end 索引进行偏移和裁剪。

        指定 end 大于 buf.length 将返回与 end 等于 buf.length 相同的结果。

        该方法继承自 TypedArray.prototype.subarray()。

        修改新的 Buffer 切片会修改原来 Buffer 中的内存，因为两个对象分配的内存是重叠的。
*/
const buf14 = Buffer.from('runoob');
const buf15 = buf14.subarray(0, 2);
// console.log(buf15.toString());


/* 
    
    Node 缓冲区长度计算语法如下所示：
        buf.length;

*/

const buf16 = Buffer.from('www.runoob.com');
console.log(buf16.length) // 14
console.log(Buffer.poolSize) // 8192


const blob = Buffer.blob(['1', '2'])

console.log(blob)





























































