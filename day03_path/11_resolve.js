const path = require('path');

/* 
    path.resolve([...paths])
        ...paths <string> 路径或路径片段的序列
        返回： <string>
    
    path.resolve() 方法将路径或路径片段的序列解析为绝对路径。

    给定的路径序列从右到左处理，每个后续的 path 会被追加到前面，直到构建绝对路径。 例如，给定路径段的顺序： /foo、/bar、baz，调用 path.resolve('/foo', '/bar', 'baz') 将返回 /bar/baz，因为 'baz' 不是绝对路径，但 '/bar' + '/' + 'baz' 是。

    如果在处理完所有给定的 path 片段之后，还没有生成绝对路径，则使用当前工作目录。

    生成的路径被规范化，并删除尾部斜杠（除非路径解析为根目录）。

    零长度的 path 片段被忽略。

    总结：
        /baz 是绝对路径  则不会相加起来 path.resolve('/bar', '/baz');  // /baz
        baz or ./baz 相对路径  则会把前面的路径相加起来  组成绝对路径
*/

const resolveUrl = path.resolve('/foo/bar', '/baz');
console.log(resolveUrl); // /baz

const resolveUrl1 = path.resolve('/foo', '/bar', 'baz');
console.log(resolveUrl1); // /bar/baz


const resolveUrl2 = path.resolve('/foo', 'bar', 'baz');
console.log(resolveUrl2); // /foo/bar/baz

const resolveUrl3 = path.resolve('/foo', 'bar', './baz');
console.log(resolveUrl2); // /foo/bar/baz












