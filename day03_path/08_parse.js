const path = require('path');

/* 
    path.parse(path)
        path <string>
        返回： <Object>
    
    path.parse() 方法返回一个对象，其属性表示 path 的重要元素。 尾随的目录分隔符被忽略，见 path.sep。

    返回的对象将具有以下属性：
        dir <string>
        root <string>
        base <string>
        name <string>
        ext <string>
*/

console.log(path.parse('/home/user/dir/file.txt'))
/* 
    {
        root: '/',
        dir: '/home/user/dir',  // 除了base 意外的目录
        base: 'file.txt', // 最后一级文件或者目录
        ext: '.txt', // 扩展名
        name: 'file' // 文件上一个目录是name
    }

    ┌─────────────────────┬────────────┐
    │          dir        │    base    │
    ├──────┬              ├──────┬─────┤
    │ root │              │ name │ ext │
    "  /    home/user/dir / file  .txt "
    └──────┴──────────────┴──────┴─────┘
*/


// 在 Windows 上：

// path.parse('C:\\path\\dir\\file.txt');
// Returns:
// { root: 'C:\\',
//   dir: 'C:\\path\\dir',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file' } 

/* 
    ┌─────────────────────┬────────────┐
    │          dir        │    base    │
    ├──────┬              ├──────┬─────┤
    │ root │              │ name │ ext │
    " C:\      path\dir   \ file  .txt "
    └──────┴──────────────┴──────┴─────┘


*/

