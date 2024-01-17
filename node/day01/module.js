const a = 1

console.log(module)
/* 
    Module {
        id: '.', // 当前文件则用.表示。  如果获取子文件时是子文件的路径名
        path: '/Users/zhengkexiang/Desktop/VUE3/project/node/day01', // 当前文件的文件夹位置
        exports: {}, // 引入文件 module.exports  导出的数据
        parent: null,
        filename: '/Users/zhengkexiang/Desktop/VUE3/project/node/day01/app.js',// 当前主入口的路径（就是node在终端执行的模块的文件路径）
        loaded: false,  // 文件 是否正在加载
        children: [], // require 引入的文件
        paths: [ // node_modules 查找顺序
            '/Users/zhengkexiang/Desktop/VUE3/project/node/day01/node_modules',
            '/Users/zhengkexiang/Desktop/VUE3/project/node/node_modules',
            '/Users/zhengkexiang/Desktop/VUE3/project/node_modules',
            '/Users/zhengkexiang/Desktop/VUE3/node_modules',
            '/Users/zhengkexiang/Desktop/node_modules',
            '/Users/zhengkexiang/node_modules',
            '/Users/node_modules',
            '/node_modules'
        ]
    }

*/
module.exports = a

