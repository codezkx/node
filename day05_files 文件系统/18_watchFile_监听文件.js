const path = require('path');
const fs = require('fs');
const { Buffer } = require('buffer');
const { ancientPoetry } = require('./data');

/* 
    fs.watchFile(filename[, options], listener)
        filename <string> | <Buffer> | <URL>
        options <Object>
            bigint <boolean> 默认值： false
            persistent <boolean> 默认值： true
            interval <integer> 默认值： 5007
        listener <Function>
            current <fs.Stats>
            previous <fs.Stats>
        返回： <fs.StatWatcher>

监视 filename 的变化。 每次访问文件时都会调用回调 listener。

可以省略 options 参数。 如果提供，它应该是一个对象。 options 对象可以包含名为 persistent 的布尔值，其指示当文件正在被监视时，进程是否应该继续运行。 options 对象可以指定 interval 属性，指示应该轮询目标的频率（以毫秒为单位）。
*/
const pathFile = path.resolve(path.dirname(__filename), './watch/watchText.text');

const listnerFn = (curr, prev) => {
    console.log('curr: ', curr);
    console.log('prev: ', prev);
    fs.unwatchFile(pathFile, listnerFn); // 停止监听文件
};

// const statWatch = fs.watchFile(pathFile, {}, listnerFn);
/* 
console.log(statWatch, 'statWatch')
    <ref *1> StatWatcher {
        _events: [Object: null prototype] { change: [Function (anonymous)] },
        _eventsCount: 1,
        _maxListeners: undefined,
        _handle: StatWatcher {
            onchange: [Function: onchange],
            [Symbol(owner_symbol)]: [Circular *1]
        },
        [Symbol(kCapture)]: false,
        [Symbol(kOldStatus)]: -1,
        [Symbol(kUseBigint)]: undefined,
        [Symbol(KFSStatWatcherRefCount)]: 1,
        [Symbol(KFSStatWatcherMaxRefCount)]: 1
    }
*/



/* 
    fs.unwatchFile(filename[, listener])
        filename <string> | <Buffer> | <URL>
        listener <Function> 可选，先前使用 fs.watchFile() 附加的监听器。

    停止监视 filename 的变化。 如果指定了 listener，则仅删除该特定监听器。 否则，所有监听器都将被删除，从而有效地停止对 filename 的监视。

    使用未被监视的文件名调用 fs.unwatchFile() 是空操作，而不是错误。

    使用 fs.watch() 比 fs.watchFile() 和 fs.unwatchFile() 更高效。 应尽可能使用 fs.watch() 而不是 fs.watchFile() 和 fs.unwatchFile()。

*/

// fs.unwatchFile(pathFile, listnerFn);


/* 
    fs.watch(filename[, options][, listener])#
        filename <string> | <Buffer> | <URL>
        options <string> | <Object>
            persistent <boolean> 指示只要正在监视文件，进程是否应继续运行。 默认值： true。
            recursive <boolean> 指示是应监视所有子目录，还是仅监视当前目录。 这在指定目录时适用，并且仅适用于受支持的平台（参见 caveats）。 默认值： false。
            encoding <string> 指定用于传给监听器的文件名的字符编码。 默认值： 'utf8'。
            signal <AbortSignal> 允许使用中止信号关闭监视器。
        listener <Function> | <undefined> 默认值： undefined
            eventType <string>
            filename <string> | <Buffer>
        返回： <fs.FSWatcher>


        监视 filename 的变化，其中 filename 是文件或目录。

        第二个参数是可选的。 如果 options 作为字符串提供，则它指定 encoding。 否则 options 应作为对象传入。

        监听器回调有两个参数 (eventType, filename)。 eventType 是 'rename' 或 'change'，filename 是触发事件的文件的名称。

        在大多数平台上，只要目录中文件名出现或消失，就会触发 'rename'。

        监听器回调绑定到由 <fs.FSWatcher> 触发的 'change' 事件，但它与 eventType 的 'change' 值不同。

        如果传入了 signal，则中止相应的 AbortController 将关闭返回的 <fs.FSWatcher>。
*/
console.log(__dirname, '__dirname')
fs.watch(__dirname, {persistent: true, recursive: true }, (curr, prev) => {
    console.log('prev: ', prev);
    console.log('curr', curr);
    console.log('目录下的文件被监听成功！！！！');
});

