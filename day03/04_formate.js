const path = require('path');

/* 
    pathObject <Object> 任何具有以下属性的 JavaScript 对象：
        dir <string>
        root <string>
        base <string>
        name <string>
        ext <string>
    return： <string>
    当向 pathObject 提供属性时，存在一个属性优先于另一个属性的组合：

        1、如果提供 pathObject.dir，则忽略 pathObject.root
        2、如果 pathObject.base 存在，则忽略 pathObject.ext 和 pathObject.name

*/
const formatUrl = path.format({
    root: '/根目录',
    dir: '/路径',
    base: '文件'
});
// /路径/文件

const formatUrl1 = path.format({
    root: '/root',
    ext: '/ignored',
    name: '/home'
});
// /root/home/ignored

const formatUrl2 = path.format({
    root: '/root',
    base: '/home1/ignored1/index/js',
    ext: '/ignored',
    name: '/home'
});
// /root/home1/ignored1/index/js

// 在 Windows 上：
// path.format({
// dir: 'C:\\path\\dir',
// base: 'file.txt',
// });
// Returns: 'C:\\path\\dir\\file.txt' 

console.log(formatUrl);
console.log(formatUrl1);
console.log(formatUrl2);