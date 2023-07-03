const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;

/* 
  response.write(chunk[, encoding][, callback])#
    chunk <string> | <Buffer> | <Uint8Array>
    encoding <string> 默认值： 'utf8'
    callback <Function>
  返回： <boolean>

如果此方法被调用且 response.writeHead() 还没被调用，则会切换到隐式的标头模式并刷新隐式的标头。

这会发送一块响应正文。 可以多次调用此方法以提供正文的连续部分。

当请求方法或响应状态不支持内容时，不允许写入正文。 如果尝试写入正文以获取 HEAD 请求或作为 204 或 304 响应的一部分，则会抛出代码为 ERR_HTTP_BODY_NOT_ALLOWED 的同步 Error。

chunk 可以是字符串或缓冲区。 如果 chunk 是字符串，则第二个参数指定如何将其编码为字节流。 当刷新数据块时将调用 callback。

这是原始的 HTTP 正文，与可能使用的更高级别的多部分正文编码无关。

第一次调用 response.write() 时，它会将缓存的标头信息和正文的第一个块发送给客户端。 第二次调用 response.write() 时，Node.js 会假定数据将被流式传输，并单独发送新数据。 也就是说，响应被缓冲到正文的第一个块。

如果整个数据被成功刷新到内核缓冲区，则返回 true。 如果所有或部分数据在用户内存中排队，则返回 false。 当缓冲区再次空闲时，则将触发 'drain'。

*/

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', ['text/plains', 'utf-8']); // 设置请求头
  // res.writeHead(200, 'ok');
  const o = {
    name: 'z',
    age: 26,
    signature: '为爱起航，至死方休！！！'
  }
  const jsonO = JSON.stringify(o)
  const cachWrite = res.write(jsonO, (err) => {
    if (err) throw new Error(err)
  })
  console.log(cachWrite, 'cachWrite')
  // const earlyHintsLinks = [
  //   '</styles.css>; rel=preload; as=style',
  //   '</scripts.js>; rel=preload; as=script',
  // ];
  // res.writeEarlyHints({
  //   'link': earlyHintsLinks,
  //   'x-trace-id': 'id for diagnostics',
  // });
  
  res.end('Hello World!\n'); // 发送的数据
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
