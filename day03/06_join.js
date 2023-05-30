const path = require('path');

/* 
    path.join([...paths])
        ...paths <string> 路径片段的序列
        返回： <string>
    
    path.join() 方法使用特定于平台的分隔符作为定界符将所有给定的 path 片段连接在一起，然后规范化生成的路径。

    零长度的 path 片段被忽略。 如果连接的路径字符串是零长度字符串，则将返回 '.'，表示当前工作目录。
*/

const joinPathUrl = path.join('/foo', 'bar', 'baz/asdf', 'quux');

console.log(joinPathUrl); 
//    /foo/bar/baz/asdf/quux

const joinPathUrl1 = path.join('/foo', 'bar', 'baz/asdf', 'quux', 'index.js');
    
console.log(joinPathUrl1);
//    /foo/bar/baz/asdf/quux/index.js

const joinPathUrl2 = path.join('/foo', 'bar', 'baz/asdf', '..', 'quux', 'index.js');
//  /foo/bar/baz/index.js   ..会过滤上一级的目录
console.log(joinPathUrl2);