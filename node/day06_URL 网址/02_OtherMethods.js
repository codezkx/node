const url = require('url');
const { fileURLToPath } = require('url');
/* url.domainToASCII(domain)#
版本历史
domain <string>
返回： <string>
返回 domain 的 Punycode ASCII 序列化。 如果 domain 是无效域，则返回空字符串。

它执行与 url.domainToUnicode() 相反的操作。

import url from 'node:url';

console.log(url.domainToASCII('español.com'));
// Prints xn--espaol-zwa.com
console.log(url.domainToASCII('中文.com'));
// Prints xn--fiq228c.com
console.log(url.domainToASCII('xn--iñvalid.com'));
// Prints an empty string拷贝 
*/
console.log(url.domainToASCII('español.com')); // xn--espaol-zwa.com

/* 
    url.domainToUnicode(domain)#
        domain <string>
        返回： <string>
        返回 domain 的 Unicode 序列化。 如果 domain 是无效域，则返回空字符串。

        它执行与 url.domainToASCII() 相反的操作。

        import url from 'node:url';

        console.log(url.domainToUnicode('xn--espaol-zwa.com'));
        // Prints español.com
        console.log(url.domainToUnicode('xn--fiq228c.com'));
        // Prints 中文.com
        console.log(url.domainToUnicode('xn--iñvalid.com'));
        // Prints an empty string拷贝 
*/
console.log(url.domainToUnicode('xn--espaol-zwa.com'));


/* 
    url.fileURLToPath(url)#
        url <URL> | <string> 要转换为路径的文件网址字符串或网址对象。
        返回： <string> 完全解析的特定于平台的 Node.js 文件路径。
    
    此函数可确保正确解码百分比编码字符，并确保跨平台有效的绝对路径字符串。

    import { fileURLToPath } from 'node:url';

    const __filename = fileURLToPath(import.meta.url);

    new URL('file:///C:/path/').pathname;      // Incorrect: /C:/path/
    fileURLToPath('file:///C:/path/');         // Correct:   C:\path\ (Windows)

    new URL('file://nas/foo.txt').pathname;    // Incorrect: /foo.txt
    fileURLToPath('file://nas/foo.txt');       // Correct:   \\nas\foo.txt (Windows)

    new URL('file:///你好.txt').pathname;      // Incorrect: /%E4%BD%A0%E5%A5%BD.txt
    fileURLToPath('file:///你好.txt');         // Correct:   /你好.txt (POSIX)

    new URL('file:///hello world').pathname;   // Incorrect: /hello%20world
    fileURLToPath('file:///hello world');      // Correct:   /hello world (POSIX)拷贝 
*/
// const filename = fileURLToPath();
console.log(fileURLToPath('file:///C:/path/')); // /C:/path/


/* 
    url.format(URL[, options])#
        URL <URL> 一个 WHATWG URL 对象
        options <Object>
            auth <boolean> 如果序列化的网址字符串应包含用户名和密码，则为 true，否则为 false。 默认值： true。
            fragment <boolean> 如果序列化的网址字符串应包含片段，则为 true，否则为 false。 默认值： true。
            search <boolean> 如果序列化的网址字符串应包含搜索查询，则为 true，否则为 false。 默认值： true。
            unicode <boolean> true 如果出现在网址字符串的主机组件中的 Unicode 字符应该被直接编码而不是 Punycode 编码。 默认值： false。
    返回： <string>
    返回 WHATWG URL 对象的 URL String 表示的可自定义序列化。

    网址对象具有 toString() 方法和 href 属性，用于返回网址的字符串序列化。 但是，这些都不能以任何方式自定义。 url.format(URL[, options]) 方法允许对输出进行基本的自定义。

    import url from 'node:url';
    const myURL = new URL('https://a:b@測試?abc#foo');

    console.log(myURL.href);
    // Prints https://a:b@xn--g6w251d/?abc#foo

    console.log(myURL.toString());
    // Prints https://a:b@xn--g6w251d/?abc#foo

    console.log(url.format(myURL, { fragment: false, unicode: true, auth: false }));
    // Prints 'https://測試/?abc'拷贝 
*/
const myUrl = new URL('https://a:b@測試?abc#foo');
console.log(url.format(myUrl, {fragment: false, unicon: true, auth: false}))


/* url.pathToFileURL(path)#
新增于: v10.12.0
path <string> 要转换为文件网址的路径。
返回： <URL> 文件网址对象。
该函数确保 path 被绝对解析，并且在转换为文件网址时正确编码网址控制字符。

import { pathToFileURL } from 'node:url';

new URL('/foo#1', 'file:');           // Incorrect: file:///foo#1
pathToFileURL('/foo#1');              // Correct:   file:///foo%231 (POSIX)

new URL('/some/path%.c', 'file:');    // Incorrect: file:///some/path%.c
pathToFileURL('/some/path%.c');       // Correct:   file:///some/path%25.c (POSIX)拷贝 */




/* url.urlToHttpOptions(url)#
版本历史
url <URL> 要转换为选项对象的 WHATWG URL 对象。
返回： <Object> 选项对象
protocol <string> 要使用的协议。
hostname <string> 要向其触发请求的服务器的域名或 IP 地址。
hash <string> 网址的片段部分。
search <string> 网址的序列化的查询部分。
pathname <string> 网址的路径部分。
path <string> 请求的路径。 应包括查询字符串（如果有）。 例如。 '/index.html?page=12'. 当请求路径包含非法字符时抛出异常。 目前，只有空格被拒绝，但将来可能会改变。
href <string> 序列化的网址。
port <number> 远程服务器的端口。
auth <string> 基本身份验证，即 'user:password' 计算授权标头。
该实用函数按照 http.request() 和 https.request() API 的预期将网址对象转换为普通选项对象。

import { urlToHttpOptions } from 'node:url';
const myURL = new URL('https://a:b@測試?abc#foo');

console.log(urlToHttpOptions(myURL));
{
  protocol: 'https:',
  hostname: 'xn--g6w251d',
  hash: '#foo',
  search: '?abc',
  pathname: '/',
  path: '/?abc',
  href: 'https://a:b@xn--g6w251d/?abc#foo',
  auth: 'a:b'
}
</string> */
