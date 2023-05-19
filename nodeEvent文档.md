## Events

> **源代码**:[lib/events.js](https://github.com/nodejs/node/blob/v20.2.0/lib/events.js) 

Node.js核心API的很多部分都是围绕着一种习惯性的异步事件驱动架构构建的，在这种架构中，某些类型的对象（称为“emitters”）会发出命名事件，从而导致被调用的函数对象（“listeners”）被调用。

例如：net.Server对象在每次对等方连接时发出一个事件；fs.ReadStream在文件打开时发出一个事件；流在每次有数据可读时发出一个事件。

所有发出事件的对象都是EventEmitter类的实例。这些对象公开了一个eventEmitter.on()函数，允许一个或多个函数附加到对象发出的命名事件上。通常，事件名称是驼峰式字符串，但可以使用任何有效的JavaScript属性键。

当EventEmitter对象发出事件时，所有附加到该特定事件的函数都会同步调用。被调用的监听器返回的任何值都将被忽略和丢弃。

以下示例显示了一个简单的EventEmitter实例，只有一个监听器。使用eventEmitter.on()方法注册监听器，而使用eventEmitter.emit()方法触发事件。

````js
import { EventEmitter } from 'node:events';

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
  console.log('an event occurred!');
});
myEmitter.emit('event');
````

### 传递参数和this到监听器

eventEmitter.emit() 方法允许将一组任意参数传递给监听器函数。请记住，当调用普通的监听器函数时，标准的 this 关键字被有意地设置为引用监听器所附加的 EventEmitter 实例。

````js
import { EventEmitter } from 'node:events';
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();
myEmitter.on('event', function(a, b) {
  console.log(a, b, this, this === myEmitter);
  // Prints:
  //   a b MyEmitter {
  //     _events: [Object: null prototype] { event: [Function (anonymous)] },
  //     _eventsCount: 1,
  //     _maxListeners: undefined,
  //     [Symbol(kCapture)]: false
  //   } true
});
myEmitter.emit('event', 'a', 'b');
````

可以使用 ES6 箭头函数作为监听器，但这样做时，this 关键字将不再引用 EventEmitter 实例：

````js
import { EventEmitter } from 'node:events';
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();
myEmitter.on('event', (a, b) => {
  console.log(a, b, this);
  // Prints: a b {}
});
myEmitter.emit('event', 'a', 'b');
````

### 异步与同步

EventEmitter 按照注册顺序同步调用所有监听器。这确保了事件的正确排序，并有助于避免竞争条件和逻辑错误。在适当的时候，监听器函数可以使用 setImmediate() 或 process.nextTick() 方法切换到异步操作模式：

````js
import { EventEmitter } from 'node:events';
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();
myEmitter.on('event', (a, b) => {
  setImmediate(() => {
    console.log('this happens asynchronously');
  });
});
myEmitter.emit('event', 'a', 'b');
````

### 仅处理一次事件

当使用 eventEmitter.on() 方法注册监听器时，每次发出命名事件时都会调用该监听器

````js
import { EventEmitter } from 'node:events';
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();
let m = 0;
myEmitter.on('event', () => {
  console.log(++m);
});
myEmitter.emit('event');
// Prints: 1
myEmitter.emit('event');
// Prints: 2
````

使用 eventEmitter.once() 方法，可以注册一个监听器，该监听器最多为特定事件调用一次。一旦事件被发出，监听器将被注销，然后被调用。

````js
import { EventEmitter } from 'node:events';
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();
let m = 0;
myEmitter.once('event', () => {
  console.log(++m);
});
myEmitter.emit('event');
// Prints: 1
myEmitter.emit('event');
// Ignored
````

### 错误事件

当 EventEmitter 实例发生错误时，通常的操作是发出一个 'error' 事件。在 Node.js 中，这些被视为特殊情况。

如果一个 EventEmitter 没有至少一个监听器注册 'error' 事件，且发出了一个 'error' 事件，那么错误将被抛出，堆栈跟踪将被打印，Node.js 进程将退出。

````js
import { EventEmitter } from 'node:events';
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();
myEmitter.emit('error', new Error('whoops!'));
// Throws and crashes Node.js
````

可以通过使用符号 events.errorMonitor 安装监听器来监视 'error' 事件而不消耗发出的错误

````js
import { EventEmitter, errorMonitor } from 'node:events';

const myEmitter = new EventEmitter();
myEmitter.on(errorMonitor, (err) => {
  MyMonitoringTool.log(err);
});
myEmitter.emit('error', new Error('whoops!'));
// Still throws and crashes Node.js
````

### 捕获 Promise 的拒绝

在事件处理程序中使用异步函数是有问题的，因为它可能会导致未处理的拒绝（Unhandled Rejection）异常：

`````js
const EventEmitter = require('node:events');
const ee = new EventEmitter();
ee.on('something', async (value) => {
  throw new Error('kaboom');
});
`````

EventEmitter 构造函数中的 captureRejections 选项或全局设置可以改变这种行为，它会在 Promise 上安装一个 .then(undefined, handler) 处理程序。如果存在 Symbol.for('nodejs.rejection') 方法，则该处理程序将异步将异常路由到该方法；如果不存在，则路由到 'error' 事件处理程序。

````js
import { EventEmitter } from 'node:events';
const ee1 = new EventEmitter({ captureRejections: true });
ee1.on('something', async (value) => {
  throw new Error('kaboom');
});

ee1.on('error', console.log);

const ee2 = new EventEmitter({ captureRejections: true });
ee2.on('something', async (value) => {
  throw new Error('kaboom');
});

ee2[Symbol.for('nodejs.rejection')] = console.log;
````

设置 events.captureRejections = true 将改变所有新 EventEmitter 实例的默认值。

````js
import { EventEmitter } from 'node:events';

EventEmitter.captureRejections = true;
const ee1 = new EventEmitter();
ee1.on('something', async (value) => {
  throw new Error('kaboom');
});

ee1.on('error', console.log);
````

由 captureRejections 行为生成的 'error' 事件没有 catch 处理程序以避免无限错误循环：建议不要将异步函数用作 'error' 事件处理程序。

### Class: `EventEmitter`

历史
EventEmitter 类由 node:events 模块定义和公开：

````js
import { EventEmitter } from 'node:events';
````

所有的 EventEmitter 在添加新的监听器时都会发出 'newListener' 事件，并在移除现有的监听器时发出 'removeListener' 事件。

它支持以下选项：

- captureRejections <boolean> 它启用了对 Promise 拒绝的自动捕获。默认值为 false。

#### Event: `'newListener'`

添加于：v0.1.26

> eventName <string> | <symbol> 要监听的事件名称
> listener <Function> 事件处理函数

EventEmitter 实例将在将监听器添加到其内部监听器数组之前发出自己的 `newListener` 事件。

为 `newListener` 事件注册的监听器将传递事件名称和要添加的监听器的引用。

事件在添加监听器之前触发的事实具有微妙但重要的副作用：在 `newListener` 回调中注册到同一名称的任何其他监听器都将在正在添加的监听器之前插入。

````
import { EventEmitter } from 'node:events';
class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
// Only do this once so we don't loop forever
myEmitter.once('newListener', (event, listener) => {
  if (event === 'event') {
    // Insert a new listener in front
    myEmitter.on('event', () => {
      console.log('B');
    });
  }
});
myEmitter.on('event', () => {
  console.log('A');
});
myEmitter.emit('event');
// Prints:
//   B
//   A
````

#### Event: 'removeListener'

> eventName <string> | <symbol> 事件名称
> listener <Function> 事件处理函数

在监听器被移除后，将发出 'removeListener' 事件。

#### emitter.addListener(eventName, listener)

添加于：v0.1.26

> eventName <string> | <symbol>
> listener <Function>

emitter.addListener(eventName, listener) 是 emitter.on(eventName, listener) 的别名。

#### `emitter.emit(eventName[, ...args])`[#](https://nodejs.org/dist/latest-v20.x/docs/api/events.html#emitteremiteventname-args)

Added in: v0.1.26

- `eventName` [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [Symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Symbol_type)
- `...args` [any](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types)
- Returns: [boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

按注册顺序同步调用命名为 eventName 的事件的所有已注册监听器，将提供的参数传递给每个监听器。

如果事件有监听器，则返回 true，否则返回 false。

````js
import { EventEmitter } from 'node:events';
const myEmitter = new EventEmitter();

// First listener
myEmitter.on('event', function firstListener() {
  console.log('Helloooo! first listener');
});
// Second listener
myEmitter.on('event', function secondListener(arg1, arg2) {
  console.log(`event with parameters ${arg1}, ${arg2} in second listener`);
});
// Third listener
myEmitter.on('event', function thirdListener(...args) {
  const parameters = args.join(', ');
  console.log(`event with parameters ${parameters} in third listener`);
});

console.log(myEmitter.listeners('event'));

myEmitter.emit('event', 1, 2, 3, 4, 5);

// Prints:
// [
//   [Function: firstListener],
//   [Function: secondListener],
//   [Function: thirdListener]
// ]
// Helloooo! first listener
// event with parameters 1, 2 in second listener
// event with parameters 1, 2, 3, 4, 5 in third listener
````

#### `emitter.eventNames()`[#](https://nodejs.org/dist/latest-v20.x/docs/api/events.html#emittereventnames)

Added in: v6.0.0

- Returns: [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

返回一个数组，列出了 EventEmitter 已注册监听器的事件。数组中的值是字符串或符号。

````js
import { EventEmitter } from 'node:events';

const myEE = new EventEmitter();
myEE.on('foo', () => {});
myEE.on('bar', () => {});

const sym = Symbol('symbol');
myEE.on(sym, () => {});

console.log(myEE.eventNames());
// Prints: [ 'foo', 'bar', Symbol(symbol) ]
````

#### `emitter.getMaxListeners()`[#](https://nodejs.org/dist/latest-v20.x/docs/api/events.html#emittergetmaxlisteners)

Added in: v1.0.0

- Returns: [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

返回 EventEmitter 的当前最大监听器值，该值由 emitter.setMaxListeners(n) 设置，或者默认为 events.defaultMaxListeners。

#### `emitter.listenerCount(eventName[, listener])`[#](https://nodejs.org/dist/latest-v20.x/docs/api/events.html#emitterlistenercounteventname-listener)

- `eventName` [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Symbol_type) 所监听的事件的名称
- `listener` [Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) 事件处理函数
- Returns: [integer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

返回监听名为 eventName 的事件的监听器数量。如果提供了 listener，则会返回该监听器在事件监听器列表中出现的次数。

#### `emitter.listeners(eventName)`[#](https://nodejs.org/dist/latest-v20.x/docs/api/events.html#emitterlistenerseventname)

- `eventName` [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Symbol_type)
- Returns: [Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)

返回名为 eventName 的事件的监听器数组的副本。

````js
server.on('connection', (stream) => {
  console.log('someone connected!');
});
console.log(util.inspect(server.listeners('connection')));
// Prints: [ [Function] ] 
````

#### `emitter.off(eventName, listener)`[#](https://nodejs.org/dist/latest-v20.x/docs/api/events.html#emitteroffeventname-listener)

Added in: v10.0.0

- `eventName` [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Symbol_type)
- `listener` [Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
- Returns: [EventEmitter](https://nodejs.org/dist/latest-v20.x/docs/api/events.html#class-eventemitter)

别名为 [`emitter.removeListener()`](https://nodejs.org/dist/latest-v20.x/docs/api/events.html#emitterremovelistenereventname-listener).

#### `emitter.on(eventName, listener)`[#](https://nodejs.org/dist/latest-v20.x/docs/api/events.html#emitteroneventname-listener)

Added in: v0.1.101

- `eventName` [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Symbol_type) The name of the event.
- `listener` [Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) The callback function
- Returns: [EventEmitter](https://nodejs.org/dist/latest-v20.x/docs/api/events.html#class-eventemitter)

将监听器函数添加到名为 eventName 的事件的监听器数组末尾。不会检查是否已添加监听器。多次调用，传递相同的 eventName 和 listener 组合将导致监听器被添加并调用多次。

````js
server.on('connection', (stream) => {
  console.log('someone connected!');
}); 
````

返回对 EventEmitter 的引用，以便可以链接调用。

默认情况下，事件监听器按照添加的顺序调用。emitter.prependListener() 方法可用作将事件监听器添加到监听器数组的开头的替代方法。

````js
import { EventEmitter } from 'node:events';
const myEE = new EventEmitter();
myEE.on('foo', () => console.log('a'));
myEE.prependListener('foo', () => console.log('b'));
myEE.emit('foo');
// Prints:
//   b
//   a
````

#### `emitter.once(eventName, listener)`[#](https://nodejs.org/dist/latest-v20.x/docs/api/events.html#emitteronceeventname-listener)

Added in: v0.3.0

- `eventName` [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Symbol_type) The name of the event.
- `listener` [Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) The callback function
- Returns: [EventEmitter](https://nodejs.org/dist/latest-v20.x/docs/api/events.html#class-eventemitter)

添加一个一次性的监听器函数，监听名为 eventName 的事件。下次 eventName 被触发时，该监听器将被删除，然后被调用。

````
server.once('connection', (stream) => {
  console.log('Ah, we have our first user!');
}); 
````

返回对 EventEmitter 的引用，以便可以链接调用。

默认情况下，事件监听器按照添加的顺序调用。emitter.prependOnceListener() 方法可用作将事件监听器添加到监听器数组的开头的替代方法。

`````js
import { EventEmitter } from 'node:events';
const myEE = new EventEmitter();
myEE.once('foo', () => console.log('a'));
myEE.prependOnceListener('foo', () => console.log('b'));
myEE.emit('foo');
// Prints:
//   b
//   a
`````

#### `emitter.prependListener(eventName, listener)`[#](https://nodejs.org/dist/latest-v20.x/docs/api/events.html#emitterprependlistenereventname-listener)

Added in: v6.0.0

- `eventName` [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Symbol_type) The name of the event.
- `listener` [Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) The callback function
- Returns: [EventEmitter](https://nodejs.org/dist/latest-v20.x/docs/api/events.html#class-eventemitter)

将监听器函数添加到名为 eventName 的事件的监听器数组开头。不会检查是否已添加监听器。多次调用，传递相同的 eventName 和 listener 组合将导致监听器被添加并调用多次。

````js
server.prependListener('connection', (stream) => {
  console.log('someone connected!');
}); 
````

返回对 EventEmitter 的引用，以便可以链接调用。

#### `emitter.prependOnceListener(eventName, listener)`[#](https://nodejs.org/dist/latest-v20.x/docs/api/events.html#emitterprependoncelistenereventname-listener)

Added in: v6.0.0

- `eventName` [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Symbol_type) The name of the event.
- `listener` [Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) The callback function
- Returns: [EventEmitter](https://nodejs.org/dist/latest-v20.x/docs/api/events.html#class-eventemitter)

将一个一次性的监听器函数添加到名为 eventName 的事件的监听器数组开头。下次 eventName 被触发时，该监听器将被删除，然后被调用。

````
server.prependOnceListener('connection', (stream) => {
  console.log('Ah, we have our first user!');
});
````

