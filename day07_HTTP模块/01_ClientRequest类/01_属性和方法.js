const fs = require('fs');
const path = require('path');
const { Buffer } = require('buffer');
const http = require('http');

const options = {
	hostname: 'localhost',
	port: 3000,
	path: '/',
  method: 'post',
  headers: {
    foo: 'uzi'
  }
}

const req = http.request(options, (res) => {
  res.on('data', (chunk) => {
    console.log(chunk);
  });
});

/* 
  name <string>
  value <any>
    为标头对象设置单个标头值。 如果该标头已经存在于待发送的标头中，则其值将被替换。 在此处使用字符串数组发送具有相同名称的多个标头。 非字符串值将不加修改地存储。 因此，request.getHeader() 可能返回非字符串值。 但是，非字符串值将转换为字符串以进行网络传输。

*/
req.setHeader('Content-type', 'text/html'); // 设置请求头
req.setHeader('Cookie', ['type=ninja', 'language=javascript']);

/* 
  返回当前传出标头的浅拷贝。 由于使用了浅拷贝，因此无需额外调用各种与标头相关的 http 模块方法即可更改数组值。 返回对象的键是标头名称，值是相应的标头值。 所有标头名称均为小写。
*/
req.getHeaders(); // 获取搜索请求头返回一个数据对象
  // [Object: null prototype] {
  //   host: 'localhost:3000',
  //   'content-type': 'text/html',
  //   cookie: [ 'type=ninja', 'language=javascript' ]
  // }
// const headers = req.getHeaders(); // 返回遍历的对象数据
// for (key in headers) {
  // console.log(key, ': ', headers[key]);
      // host :  localhost:3000
      // content-type :  text/html
      // cookie :  [ 'type=ninja', 'language=javascript' ]
// }



/* 
  返回包含当前传出标头的唯一名称的数组。 所有标头名称均为小写。
*/
req.getHeaderNames(); // 获取请求头的key值
// [ 'host', 'content-type', 'cookie' ]

// req.on('error', (err) => {
//   console.log(err, '1');
// });

/* 
  返回包含当前传出原始标头的唯一名称的数组。 标头名称返回并设置了它们的确切大小写。
*/
req.getRawHeaderNames();
// [ 'foo', 'Host', 'Content-type', 'Cookie' ]

/* 
  如果 name 标识的标头当前设置在传出标头中，则返回 true。标头名称匹配不区分大小写。
*/
req.hasHeader('cookie'); // true


/* .maxHeadersCount
  限制最大响应头计数。 如果设置为 0，则不会应用任何限制。
*/
req.maxHeadersCount // null


/* 
  请求的路径。
*/
req.path // "/"

/* 
  请求的方法。
*/
req.method //GET

/* 
  请求的主机。
*/
req.host // localhost

/* 
  请求的协议。
*/
req.protocol // http:

/* 
  删除已定义到标头对象中的标头。
*/
req.removeHeader('Cookie')
// console.log(req.getHeaders())
// [Object: null prototype] {
//   foo: 'uzi',
//   host: 'localhost:3000',
//   'content-type': 'text/html'
// }


/* 
  请求是否通过重用的套接字发送。当通过启用保持活动的代理发送请求时，可能会重用底层套接字。 但是如果服务器在不幸的时候关闭连接，客户端可能会遇到 'ECONNRESET' 错误。
*/
req.reusedSocket //false


/* 
  writable.uncork() 方法会刷新自调用 stream.cork() 以来缓冲的所有数据。

  当使用 writable.cork() 和 writable.uncork() 管理写入流的缓冲时，使用 process.nextTick() 推迟对 writable.uncork() 的调用。 这样做允许对在给定 Node.js 事件循环阶段中发生的所有 writable.write() 调用进行批处理。
*/
// req.uncork()


/* 
  在调用 request.end() 之后是 true。 此属性不指示数据是否已刷新，为此则使用 request.writableFinished 代替。
*/
req.writableEnded // false // 数据不一定请求完

/* 
  如果所有数据都已在 'finish' 事件触发之前立即刷新到底层系统，则为 true。
*/
req.writableFinished // false  所有数据请求成功


const writeReq = req.write('麻烦返回对应的数据。', (err) => {
  if (err) throw new Error(err)
})



// console.log(req.destroyed); // false // 判断请求时否调用了destroy
// req.destroy(err => { // 会触发close事件和error事件
//   if (err) throw new Error(err); 
// });
// console.log(req.destroyed); // true

// req.end();









