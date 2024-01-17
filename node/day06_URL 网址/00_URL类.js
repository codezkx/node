const { URL } = require('url');
const { Blob, resolveObjectURL } = require('buffer');

console.log(URL);
/* 
   [class URL] {
        canParse: [Function: canParse],
        createObjectURL: [Function: createObjectURL],
        revokeObjectURL: [Function: revokeObjectURL]
    } 

*/


/* 
    URL.canParse(input[, base])
        参数
            input <string> 要解析的绝对或相对的输入网址。 如果 input 是相对的，则需要 base。 如果 input 是绝对的，则忽略 base。 如果 input 不是字符串，则首先是 转换为字符串。
            base <string> 如果 input 不是绝对的，则为要解析的基本网址。 如果 base 不是字符串，则首先是 转换为字符串。
        返回： 
            <boolean>
    检查相对于 base 的 input 是否可以解析为 URL。
*/
URL.canParse('bar', 'https://a:123@example.org:8080/') // true

/* 
    URL.createObjectURL(blob)#
    blob <Blob>
        返回： <string>
        创建表示给定的 <Blob> 对象并且可用于稍后检索 Blob 的 'blob:nodedata:...' 网址字符串。

    const {
        Blob,
        resolveObjectURL,
    } = require('node:buffer');

    const blob = new Blob(['hello']);
    const id = URL.createObjectURL(blob);

    // later...

    const otherBlob = resolveObjectURL(id);
    console.log(otherBlob.size); 拷贝
    已注册的 <Blob> 存储的数据将保留在内存中，直到调用 URL.revokeObjectURL() 将其删除。

    Blob 对象已在当前线程中注册。 如果使用工作线程，则在工作线程内注册的 Blob 对象将不能被其他工作线程或主线程使用。
*/

const blob = new Blob(['hello'], {type: 'test/plain'});
console.log(blob, 'blob'); // Blob { size: 5, type: 'test/plain' }
const blobId = URL.createObjectURL(blob); //  blob:nodedata:60515040-d354-4a12-b71f-18188bf2deec

const resolveBlob = resolveObjectURL(blobId); // 解析 'blob:nodedata:...'，关联的使用先前调用 URL.createObjectURL() 注册的 <Blob> 对象。
console.log(resolveBlob, 'resolveBlob') // Blob { size: 5, type: 'test/plain' }
    

/* 
    URL.revokeObjectURL(id)#
        id <string> 先前调用 URL.createObjectURL() 返回的 'blob:nodedata:... 网址字符串。
        删除由给定标识符标识的已存储的 <Blob>。 尝试撤销未注册的 ID 将静默失败。
*/

const revoke = URL.revokeObjectURL(blobId);



const url = new URL('/foo?name=uzi', 'https://a:123@example.org:8080/');
// console.log(url);
/* 
    URL {
        href: 'https://example.org/foo', // 资源定位符（网站地址）
        origin: 'https://example.org', // 获取URL源的只读序列化。
        protocol: 'https:', // 获取并设置URL的协议部分。
        username: 'a', // 获取并设置URL的用户名部分。  https:username//example.org/foo
        password: '123', // 获取并设置URL的用户密码部分。 https:username:password//example.org/foo
        host: 'example.org:8080', // 获取并设置URL的主机部分。
        hostname: 'example.org', // 获取并设置URL的主机名部分。关键的区别是。Host '和' url '。主机名就是那个url。主机名'不包含端口。
        port: '8080', // 获取并设置URL的端口部分。
        pathname: '/foo', 获取并设置URL的路径部分。
        search: '', // 获取并设置URL的序列化查询部分。
        searchParams: URLSearchParams {}, //获取表示URL的查询参数的' URLSearchParams '对象。这个属性是只读的，但是它提供的' URLSearchParams '对象可以用来改变URL实例;要替换URL的全部查询参数，请使用{@link search} setter。详细信息请参见“URLSearchParams”文档。
        hash: '' // 获取并设置URL的片段部分。
    }
*/


