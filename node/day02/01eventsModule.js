const EventEmitter = require('events');
const eventEmitter = new EventEmitter();
// console.log(eventEmitter, 'eventEmitter')

const startListener = function (start, end) {
    // console.log(this) // 获得 EventEmitter 的实例
    console.log(`开始${start} 到 ${end}`);
    
}

eventEmitter.on('start', startListener);

// eventEmitter.off('start', startListener); // 移除监听事件

// eventEmitter.removeListener('start', startListener); // 移除监听事件

eventEmitter.emit('start', 1000); // 当个参数

eventEmitter.emit('start', 1, 100); // 多个参数
let num = 0;
eventEmitter.once('once', function() { 
    console.log(++num);
})
eventEmitter.removeAllListeners() // 移除EventEmitter 下所有监听事件 移除事件必须 监听事件之后  emit事件之前
aeventEmitter.emit('once');
eventEmitter.emit('once'); // once  事件只执行一次










