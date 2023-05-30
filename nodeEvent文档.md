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

#### emitter.removeAllListeners([eventName])#

Added in: v0.1.26

- eventName <string> | <symbol>

- Returns: <EventEmitter>

移除所有监听器，或者指定事件名的监听器。

在代码的其他地方添加的监听器，特别是当 EventEmitter 实例是由其他组件或模块（例如 sockets 或文件流）创建时，删除这些监听器是不好的实践。

返回 EventEmitter 的引用，以便可以链接调用。

#### **emitter.removeListener(eventName, listener)**[**#**](#emitterremovelistenereventname-listener)

Added in: v0.1.26

· eventName [](#String_type) | [](#Symbol_type)

· listener [Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)

· Returns: [EventEmitter](#class-eventemitter)

#### emitter.removeAllListeners([eventName])#

- Added in: v0.1.26
- eventName <string> | <symbol>
- Returns: <EventEmitter>

移除所有监听器，或者指定事件名的监听器。 

在代码的其他地方添加的监听器，特别是当 EventEmitter 实例是由其他组件或模块（例如 sockets 或文件流）创建时，删除这些监听器是不好的实践。

返回 EventEmitter 的引用，以便可以链接调用。

#### emitter.removeListener(eventName, listener)#

Added in: v0.1.26

- eventName <string> | <symbol>
- listener <Function>
- Returns: <EventEmitter>

从名为 eventName 的事件的监听器数组中移除指定的监听器。 

````js
const callback = (stream) => {

  console.log('someone connected!');

};

server.on('connection', callback);

// ...

server.removeListener('connection', callback); COPY

````

removeListener() 最多只会从监听器数组中移除一个监听器实例。如果任何单个监听器已经被多次添加到指定 eventName 的监听器数组中，则必须多次调用 removeListener() 才能删除每个实例。

一旦事件被触发，所有附加到它的监听器将按顺序被调用。这意味着在触发事件后并在最后一个监听器完成执行之前进行 removeListener() 或 removeAllListeners() 调用将不会从正在进行的 emit() 中删除它们。后续事件的行为符合预期。

````js
import { EventEmitter } from 'node:events';

class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

const callbackA = () => {
  console.log('A');
  myEmitter.removeListener('event', callbackB);

};

const callbackB = () => {
  console.log('B');
};

myEmitter.on('event', callbackA);

myEmitter.on('event', callbackB);

// callbackA removes listener callbackB but it will still be called.

// Internal listener array at time of emit [callbackA, callbackB]

myEmitter.emit('event');

// Prints:

//   A

//   B

// callbackB is now removed.

// Internal listener array [callbackA]

myEmitter.emit('event');

// Prints:

//   ACOPY

````

由于监听器是使用内部数组进行管理的，因此调用此函数将更改在被移除的监听器之后注册的任何监听器的位置索引。这不会影响调用监听器的顺序，但这意味着需要重新创建由 emitter.listeners() 方法返回的任何监听器数组的副本。

当在单个事件的处理程序中多次添加单个函数（如下例所示）时，removeListener() 将删除最近添加的实例。在该示例中，将删除 once('ping') 监听器：

````js
import { EventEmitter } from 'node:events';

const ee = new EventEmitter();

function pong() {
  console.log('pong');
}

ee.on('ping', pong);

ee.once('ping', pong);

ee.removeListener('ping', pong);

ee.emit('ping');

ee.emit('ping');COPY

````

返回 EventEmitter 的引用，以便可以链接调用。 

#### emitter.setMaxListeners(n)#

Added in: v0.3.5

- n <integer>
- Returns: <EventEmitter>

默认情况下，如果为特定事件添加了超过 10 个监听器，EventEmitters 将打印警告。这是一个有用的默认设置，有助于查找内存泄漏。emitter.setMaxListeners() 方法允许为此特定 EventEmitter 实例修改限制。该值可以设置为 Infinity（或 0）以表示没有限制的监听器数量。

返回 EventEmitter 的引用，以便可以链接调用。

#### emitter.rawListeners(eventName)#

- Added in: v9.4.0

- eventName <string> | <symbol>
- Returns: <Function[]>

返回名为 eventName 的事件的监听器数组的副本，包括任何包装器（例如由 .once() 创建的包装器）。 

````js
import { EventEmitter } from 'node:events';

const emitter = new EventEmitter();

emitter.once('log', () => console.log('log once'));

// 返回一个新的数组，其中包含一个名为 onceWrapper 的函数，该函数具有一个属性。

// 该函数具有一个名为 listener 的属性，其中包含上述绑定的原始监听器
const listeners = emitter.rawListeners('log');

const logFnWrapper = listeners[0];

//将“log once”记录到控制台，不会解除 once 事件的绑定。

logFnWrapper.listener();

// 将“log once”记录到控制台，并移除该监听器
logFnWrapper();

emitter.on('log', () => console.log('log persistently'));

// 将返回一个新的数组，其中只包含上面通过 .on() 绑定的单个函数。

const newListeners = emitter.rawListeners('log');

// 记录两次“log persistently”。

newListeners0;

emitter.emit('log');COPY

````



#### emitter[Symbol.for('nodejs.rejection')](err, eventName[, ...args])#

- err <Error>
- eventName <string> | <symbol>
- ...args <any>

如果在触发事件时发生 Promise 拒绝，并且 emitter 上启用了 captureRejections，则会调用 Symbol.for('nodejs.rejection') 方法。可以使用 events.captureRejectionSymbol 替换 Symbol.for('nodejs.rejection')。 

````
import { EventEmitter, captureRejectionSymbol } from 'node:events';

class MyClass extends EventEmitter {
  constructor() {
    super({ captureRejections: true });
  }

  captureRejectionSymbol {
    console.log('rejection happened for', event, 'with', err, ...args);
    this.destroy(err);
  }

  destroy(err) {
    // 把资源拆除在这里。
  }

}COPY



````



### events.defaultMaxListeners###

Added in: v0.11.2

默认情况下，任何单个事件最多可以注册 10 个监听器。可以使用 emitter.setMaxListeners(n) 方法为单个 EventEmitter 实例更改此限制。要更改所有 EventEmitter 实例的默认值，可以使用 events.defaultMaxListeners 属性。如果此值不是正数，则会抛出 RangeError。

设置 events.defaultMaxListeners 时要小心，因为更改会影响所有 EventEmitter 实例，包括在更改之前创建的实例。但是，调用 emitter.setMaxListeners(n) 仍然优先于 events.defaultMaxListeners。

这不是一个硬限制。EventEmitter 实例将允许添加更多的监听器，但将在 stderr 中输出跟踪警告，指示检测到“可能的 EventEmitter 内存泄漏”。对于任何单个 EventEmitter，可以使用 emitter.getMaxListeners() 和 emitter.setMaxListeners() 方法来暂时避免此警告：

````js
import { EventEmitter } from 'node:events';

const emitter = new EventEmitter();

emitter.setMaxListeners(emitter.getMaxListeners() + 1);

emitter.once('event', () => {
  // do stuff
  emitter.setMaxListeners(Math.max(emitter.getMaxListeners() - 1, 0));
});COPY

````

 [`--trace-warnings`](https://nodejs.org/dist/latest-v20.x/docs/api/cli.html#--trace-warnings)  命令行标志可用于显示此类警告的堆栈跟踪。

可以使用 process.on('warning') 检查发出的警告，并且它将具有附加的 emitter、type 和 count 属性，分别引用事件发射器实例、事件的名称和附加的监听器数量。它的 name 属性设置为 'MaxListenersExceededWarning'。

### events.errorMonitor###

Added in: v13.6.0, v12.17.0

此符号应用于仅安装用于监视“error”事件的监听器。使用此符号安装的监听器将在调用常规“error”监听器之前被调用。

使用此符号安装监听器不会更改在发出“error”事件后的行为。因此，如果未安装常规的“error”监听器，进程仍将崩溃。

### events.getEventListeners(emitterOrTarget, eventName)###

Added in: v15.2.0, v14.17.0

- emitterOrTarget <EventEmitter> | <EventTarget>

- eventName <string> | <symbol>
- Returns: <Function[]>

返回名为 eventName 的事件的监听器数组的副本。

对于 EventEmitters，这与在 emitter 上调用 .listeners 完全相同。

对于 EventTargets，这是获取事件目标的事件监听器的唯一方法。这对于调试和诊断目的非常有用。

````js
import { getEventListeners, EventEmitter } from 'node:events';

{
  const ee = new EventEmitter();

  const listener = () => console.log('Events are fun');

  ee.on('foo', listener);

  console.log(getEventListeners(ee, 'foo')); // [ [Function: listener] ]

}
{
  const et = new EventTarget();

  const listener = () => console.log('Events are fun');

  et.addEventListener('foo', listener);

  console.log(getEventListeners(et, 'foo')); // [ [Function: listener] ]

}COPY

````



### events.getMaxListeners(emitterOrTarget)###

Added in: v19.9.0

- emitterOrTarget <EventEmitter> | <EventTarget>

- Returns: <number>

返回当前设置的最大监听器数量。

对于 EventEmitters，这与在 emitter 上调用 .getMaxListeners 完全相同。

对于 EventTargets，这是获取事件目标的最大事件监听器数量的唯一方法。如果单个 EventTarget 上的事件处理程序数量超过设置的最大值，则 EventTarget 将打印警告。

````js
import { getMaxListeners, setMaxListeners, EventEmitter } from 'node:events';

{
  const ee = new EventEmitter();
  console.log(getMaxListeners(ee)); // 10
  setMaxListeners(11, ee);
  console.log(getMaxListeners(ee)); // 11
}

{
  const et = new EventTarget();
  console.log(getMaxListeners(et)); // 10
  setMaxListeners(11, et);
  console.log(getMaxListeners(et)); // 11
}COPY

````



### events.once(emitter, name[, options])###

- emitter <EventEmitter>

- name <string>
- options <Object>
- signal <AbortSignal> Can be used to cancel waiting for the event.
- Returns: <Promise>

创建一个 Promise，该 Promise 在 EventEmitter 发出给定事件时被满足，如果 EventEmitter 在等待时发出 'error'，则该 Promise 将被拒绝。Promise 将使用发出给定事件的所有参数解析为一个数组。

此方法有意是通用的，并与 Web 平台的 EventTarget 接口一起工作，该接口没有特殊的 'error' 事件语义，并且不侦听 'error' 事件。

````js
import { once, EventEmitter } from 'node:events';

import process from 'node:process';
const ee = new EventEmitter();

process.nextTick(() => {
  ee.emit('myevent', 42);
});

const [value] = await once(ee, 'myevent');

console.log(value);

const err = new Error('kaboom');

process.nextTick(() => {
  ee.emit('error', err);
});

try {
  await once(ee, 'myevent');
} catch (err) {

  console.error('error happened', err);

}COPY

````

仅当使用 events.once() 等待另一个事件时，才会特殊处理 'error' 事件。如果使用 events.once() 等待 'error' 事件本身，则将其视为任何其他类型的事件，没有特殊处理： 

````js
import { EventEmitter, once } from 'node:events';

const ee = new EventEmitter();

once(ee, 'error')

  .then(([err]) => console.log('ok', err.message))

  .catch((err) => console.error('error', err.message));

ee.emit('error', new Error('boom'));

// Prints: ok boomCOPY

An <AbortSignal> can be used to cancel waiting for the event:
import { EventEmitter, once } from 'node:events';
const ee = new EventEmitter();
const ac = new AbortController();
async function foo(emitter, event, signal) {

  try {
    await once(emitter, event, { signal });
    console.log('event emitted!');
  } catch (error) {

    if (error.name === 'AbortError') {
      console.error('Waiting for the event was canceled!');
    } else {
      console.error('There was an error', error.message);
    }
  }
}

foo(ee, 'foo', ac.signal);

ac.abort(); // Abort waiting for the event
ee.emit('foo'); // Prints: Waiting for the event was canceled!COPY
````

#### process.nextTick() 上等待多个事件 #

当使用 events.once() 函数在同一批 process.nextTick() 操作中等待多个事件或在同步地发出多个事件时，有一个值得注意的边缘情况。具体来说，由于 process.nextTick() 队列在 Promise 微任务队列之前被清空，并且因为 EventEmitter 同步地发出所有事件，因此 events.once() 可能会错过一个事件。 

````js
import { EventEmitter, once } from 'node:events';

import process from 'node:process';

const myEE = new EventEmitter();

async function foo() {
  await once(myEE, 'bar');
  console.log('bar');

  // 这个 Promise 永远不会被解析，因为在创建 Promise 之前 'foo' 事件已经被触发了。

  // 在创建 Promise 之前 'foo' 事件已经被触发了，因此这个 Promise 永远不会被解析。
  await once(myEE, 'foo');
  console.log('foo');
}

process.nextTick(() => {
  myEE.emit('bar');
  myEE.emit('foo');
});

foo().then(() => console.log('done'));COPY

// 要捕获这两个事件，需要在等待它们之前先创建每个 Promise，然后可以使用 Promise.all()、Promise.race() 或 Promise.allSettled()：

import { EventEmitter, once } from 'node:events';

import process from 'node:process';

const myEE = new EventEmitter();

async function foo() {
  await Promise.all([once(myEE, 'bar'), once(myEE, 'foo')]);
  console.log('foo', 'bar');

}

process.nextTick(() => {
  myEE.emit('bar');
  myEE.emit('foo');
});

foo().then(() => console.log('done'));COPY

````



### events.captureRejections###

- Value: <boolean>


更改所有新 EventEmitter 对象上的默认 captureRejections 选项 

### events.captureRejectionSymbol###

- Value: Symbol.for('nodejs.rejection')


- 了解如何编写自定义拒绝处理程序。

### events.on(emitter, eventName[, options])###

Added in: v13.6.0, v12.16.0

- emitter <EventEmitter>

- eventName <string> | <symbol> The name of the event being listened for
- options <Object>
- signal <AbortSignal> Can be used to cancel awaiting events.
- Returns: <AsyncIterator> that iterates eventName events emitted by the emitter

````js
import { on, EventEmitter } from 'node:events';

import process from 'node:process';

const ee = new EventEmitter();

// Emit later on

process.nextTick(() => {
  ee.emit('foo', 'bar');
  ee.emit('foo', 42);
});

for await (const event of on(ee, 'foo')) {

  // 这个内部块的执行是同步的，它

  // 一次处理一个事件（即使使用 await）。不要使用。

  // 如果需要并发执行，则不应使用它。
  console.log(event); // prints 'bar'
}

// 不可达的代码

````



返回一个 AsyncIterator，该迭代器迭代 eventName 事件。如果 EventEmitter 发出“error”，则会引发错误。在退出循环时，它会删除所有的监听器。每次迭代返回的值是由发出的事件参数组成的数组。

可以使用 <AbortSignal> 来取消等待事件：

````js
import { on, EventEmitter } from 'node:events';

import process from 'node:process';

const ac = new AbortController();
(async () => {
  const ee = new EventEmitter();
  // Emit later on
  process.nextTick(() => {
    ee.emit('foo', 'bar');
    ee.emit('foo', 42);
  });

  for await (const event of on(ee, 'foo', { signal: ac.signal })) {
    // 这个内部块的执行是同步的，它
    //一次处理一个事件（即使使用 await）。不要使用。

    // 如果需要并发执行，则不应使用它。
    console.log(event); // prints 'bar'
  }
  // Unreachable here
})();

process.nextTick(() => ac.abort());COPY

````



### events.setMaxListeners(n[, ...eventTargets])###

Added in: v15.4.0
n <number> 一个非负数。每个 EventTarget 事件的最大监听器数量 .
...eventsTargets <EventTarget[]> | <EventEmitter[]> 零个或多个 <EventTarget> 或 <EventEmitter> 实例。如果没有指定，则 n 将设置为所有新创建的 <EventTarget> 和 <EventEmitter> 对象的默认最大值。 

````js
import { setMaxListeners, EventEmitter } from 'node:events';

const target = new EventTarget();

const emitter = new EventEmitter();

setMaxListeners(5, target, emitter);COPY

````



### Class: events.EventEmitterAsyncResource extends EventEmitter#

Added in: v17.4.0, v16.14.0

将 EventEmitter 与 <AsyncResource> 集成，用于需要手动异步跟踪的 EventEmitters。具体来说，由 events.EventEmitterAsyncResource 实例发出的所有事件将在其异步上下文中运行。 

````js
import { EventEmitterAsyncResource, EventEmitter } from 'node:events';

import { notStrictEqual, strictEqual } from 'node:assert';

import { executionAsyncId, triggerAsyncId } from 'node:async_hooks';

// Async tracking tooling will identify this as 'Q'.

const ee1 = new EventEmitterAsyncResource({ name: 'Q' });

// 'foo' listeners will run in the EventEmitters async context.

ee1.on('foo', () => {

  strictEqual(executionAsyncId(), ee1.asyncId);

  strictEqual(triggerAsyncId(), ee1.triggerAsyncId);

});

const ee2 = new EventEmitter();

// 'foo' listeners on ordinary EventEmitters that do not track async

// context, however, run in the same async context as the emit().

ee2.on('foo', () => {

  notStrictEqual(executionAsyncId(), ee2.asyncId);

  notStrictEqual(triggerAsyncId(), ee2.triggerAsyncId);

});

Promise.resolve().then(() => {

  ee1.emit('foo');

  ee2.emit('foo');

});COPY

````

EventEmitterAsyncResource 类具有与 EventEmitter 和 AsyncResource 本身相同的方法，并使用相同的选项。 

##### new events.EventEmitterAsyncResource([options])#####

- options <Object>
  - captureRejections <boolean> 它启用自动捕获 Promise 拒绝。默认值为 false。 
  - name <string> The type of async event. Default:: new.target.name.
  - triggerAsyncId <number> 异步事件的类型。默认值为 new.target.name。 
  - requireManualDestroy <boolean> 如果设置为 true，则在对象被垃圾回收时禁用 emitDestroy。通常不需要设置它（即使手动调用 emitDestroy），除非检索到资源的 asyncId 并使用敏感 API 的 emitDestroy 调用它。当设置为 false 时，仅当存在至少一个活动的 destroy hook 时，垃圾回收时才会进行 emitDestroy 调用。默认值为 false。 

##### eventemitterasyncresource.asyncId#####

- Type: <number> 分配给资源的唯一 asyncId。 

##### eventemitterasyncresource.asyncResource#####

- Type: The underlying <AsyncResource>.


返回的 AsyncResource 对象具有一个额外的 eventEmitter 属性，该属性提供对此 EventEmitterAsyncResource 的引用。 

##### eventemitterasyncresource.emitDestroy()#####

调用所有 destroy hooks。这应该只被调用一次。如果被多次调用，则会抛出错误。必须手动调用此方法。如果资源被 GC 收集，则 destroy hooks 将永远不会被调用。 

##### eventemitterasyncresource.triggerAsyncId#####

- Type: <number> 传递给 AsyncResource 构造函数的相同 triggerAsyncId。 

### EventTarget and Event API###

EventTarget 和 Event 对象是 Node.js 特有的实现，是一些 Node.js 核心 API 公开的 EventTarget Web API 的实现。 const target = new EventTarget();

````js
target.addEventListener('foo', (event) => {

  console.log('foo event happened!');

}); COPY

````



#### Node.js EventTarget vs. DOM EventTarget#

Node.js EventTarget 和 EventTarget Web API 之间有两个关键区别：

1. DOM EventTarget 实例可以是分层的，而在 Node.js 中没有层次和事件传播的概念。也就是说，分派到 EventTarget 的事件不会通过一系列嵌套的目标对象层次传播，每个层次可能都有自己的事件处理程序集。
2. 在 Node.js EventTarget 中，如果事件监听器是异步函数或返回 Promise，并且返回的 Promise 被拒绝，则拒绝会自动捕获并处理，就像同步抛出错误的监听器一样（有关详细信息，请参见 EventTarget 错误处理）。

#### NodeEventTarget vs. EventEmitter#

NodeEventTarget 对象实现了 EventEmitter API 的一部分修改子集，使其能够在某些情况下密切模拟 EventEmitter。NodeEventTarget 不是 EventEmitter 的实例，在大多数情况下不能替换 EventEmitter。

与 EventEmitter 不同，每个事件类型的任何给定监听器最多只能注册一次。尝试多次注册监听器将被忽略。

NodeEventTarget 不模拟完整的 EventEmitter API。具体而言，不模拟 prependListener()、prependOnceListener()、rawListeners() 和 errorMonitor API。'newListener' 和 'removeListener' 事件也不会被触发。

NodeEventTarget 不对类型为 'error' 的事件实现任何特殊的默认行为。

NodeEventTarget 支持 EventListener 对象以及函数作为所有事件类型的处理程序。

#### Event listener#

注册事件类型的事件监听器可以是 JavaScript 函数，也可以是具有 handleEvent 属性且值为函数的对象。

在任一情况下，处理程序函数都将使用传递给 eventTarget.dispatchEvent() 函数的事件参数调用。

可以使用异步函数作为事件监听器。如果异步处理程序函数拒绝，则会捕获并处理拒绝，如 EventTarget 错误处理中所述。

一个处理程序函数抛出的错误不会阻止其他处理程序被调用。

处理程序函数的返回值将被忽略。

处理程序总是按照它们添加的顺序被调用。

处理程序函数可以修改事件对象。

````js
function handler1(event) {
  console.log(event.type);  // Prints 'foo'
  event.a = 1;
}

async function handler2(event) {
  console.log(event.type);  // Prints 'foo'
  console.log(event.a);  // Prints 1
}

const handler3 = {
  handleEvent(event) {
    console.log(event.type);  // Prints 'foo'
  },

};

const handler4 = {
  async handleEvent(event) {
    console.log(event.type);  // Prints 'foo'
  },
};

const target = new EventTarget();

target.addEventListener('foo', handler1);

target.addEventListener('foo', handler2);

target.addEventListener('foo', handler3);

target.addEventListener('foo', handler4, { once: true }); COPY

````



#### EventTarget error handling#

如果已注册的事件监听器抛出错误（或返回拒绝的 Promise），默认情况下将在 process.nextTick() 上将错误视为未捕获的异常。这意味着 EventTargets 中的未捕获异常将默认终止 Node.js 进程。

在事件监听器中抛出错误不会停止其他已注册的处理程序被调用。

EventTarget 不为 EventEmitter 等的 'error' 类型事件实现任何特殊的默认处理。

当前，错误首先转发到 process.on('error') 事件，然后才到达 process.on('uncaughtException')。此行为已被弃用，并将在未来的版本中更改，以使 EventTarget 与其他 Node.js API 保持一致。任何依赖 process.on('error') 事件的代码都应该与新行为保持一致。

#### Class: Event#

Event 对象是 Event Web API 的一个适配。Node.js 内部创建实例。

##### event.bubbles#####

- Added in: v14.5.0

- Type: <boolean> 始终返回 false。 

这在 Node.js 中没有使用，纯粹是为了完整性而提供的。 

##### event.cancelable#####

Added in: v14.5.0

- Type: <boolean> 如果事件是使用 cancelable 选项创建的，则返回 true。 

##### event.composed#####

Added in: v14.5.0
Type: <boolean>  始终返回 false。 
This is not used in Node.js and is provided purely for completeness.

##### event.composedPath()#####

Added in: v14.5.0

返回一个数组，其中包含当前 EventTarget 作为唯一条目，如果未分派事件，则为空。这在 Node.js 中没有使用，纯粹是为了完整性而提供的。 

##### event.currentTarget

- Added in: v14.5.0
- Type: <EventTarget> 分派事件的 EventTarget。

 event.target 的别名。 

##### event.defaultPrevented#####

Added in: v14.5.0

- Type: <boolean>


如果 cancelable 为 true 并且调用了 event.preventDefault()，则为 true。 

##### event.eventPhase#####

Added in: v14.5.0

- Type: <number> 在事件未分派时返回 0，在事件正在分派时返回 2。 

这在 Node.js 中没有使用，纯粹是为了完整性而提供的。 

##### event.initEvent(type[, bubbles[, cancelable]])#####

Added in: v19.5.0

- Stability: 3 - Legacy: The WHATWG spec considers it deprecated and users shouldn't use it at all.

- type <string>
- bubbles <boolean>
- cancelable <boolean>

与事件构造函数重复，并且无法设置 composed。这在 Node.js 中没有使用，纯粹是为了完整性而提供的 

##### event.isTrusted#####

Added in: v14.5.0

- Type: <boolean>

- The <AbortSignal> "abort" 事件被触发时，isTrusted 设置为 true。在所有其他情况下，该值为 false。 

##### event.preventDefault()#####

Added in: v14.5.0

如果 cancelable 为 true，则将 defaultPrevented 属性设置为 true。 

##### event.returnValue#####

Added in: v14.5.0

稳定性: 3 - 遗留: 使用 event.defaultPrevented 替代。 

- Type: <boolean> 如果事件没有被取消，则返回 true。 

event.returnValue 的值始终与 event.defaultPrevented 相反。这在 Node.js 中没有使用，纯粹是为了完整性而提供的。 

##### event.srcElement#####

Added in: v14.5.0

稳定性: 3 - 遗留: 使用 event.target 替代。 
Type: <EventTarget> 分派事件的 EventTarget。

event.target 的别名。 

##### event.stopImmediatePropagation()#####

Added in: v14.5.0

在当前处理程序完成后停止调用事件监听器。 

##### event.stopPropagation()#####

Added in: v14.5.0

这在 Node.js 中没有使用，纯粹是为了完整性而提供的 

##### event.target#####

Added in: v14.5.0

- Type: <EventTarget> 分派事件的 EventTarget。 

##### event.timeStamp#####

Added in: v14.5.0

- Type: <number>


Event 对象创建时的毫秒级时间戳。 

##### event.type#####

Added in: v14.5.0

- Type: <string>


事件类型标识符。 

#### Class: EventTarget####

History
Version	Changes
v15.0.0	
The EventTarget class is now available through the global object.

v14.5.0	
Added in: v14.5.0

##### eventTarget.addEventListener(type, listener[, options])#|

type <string>

- listener <Function> | <EventListener>

- options <Object>
  - once <boolean>当为 true 时，监听器在首次调用时自动移除。默认值为 false。 
  - passive <boolean> 当为 true 时，作为提示，监听器不会调用 Event 对象的 preventDefault() 方法。默认值为 false。 
  - capture <boolean> Node.js 不直接使用。为了 API 的完整性而添加。默认值为 false。 
  - signal <AbortSignal> 当给定的 AbortSignal 对象的 abort() 方法被调用时，将移除监听器。 

添加一个新的事件处理程序。任何给定的监听器仅在每种类型和每个捕获选项值上添加一次。

如果 once 选项为 true，则在下一次分派事件类型时，监听器将被删除。

在 Node.js 中，捕获选项没有任何功能上的用途，除了按照 EventTarget 规范跟踪已注册的事件监听器。具体而言，当注册监听器时，捕获选项用作键的一部分。任何单个监听器都可以添加一次，其中 capture = false，一次 capture = true。

````js
function handler(event) {}

const target = new EventTarget();

target.addEventListener('foo', handler, { capture: true });  // first

target.addEventListener('foo', handler, { capture: false }); // second

// Removes the second instance of handler

target.removeEventListener('foo', handler);

// Removes the first instance of handler

target.removeEventListener('foo', handler, { capture: true }); COPY

````

##### eventTarget.dispatchEvent(event)#####

Added in: v14.5.0

- event <Event>

- Returns: <boolean> 如果事件的 cancelable 属性值为 false，或者其 preventDefault() 方法没有被调用，则返回 true，否则返回 false。 

将事件分派到 event.type 的处理程序列表。

已注册的事件监听器按照它们注册的顺序同步调用。

##### eventTarget.removeEventListener(type, listener[, options])#####

Added in: v14.5.0

- type <string>

- listener <Function> | <EventListener>
- options <Object>
  - capture <boolean>

从事件类型的处理程序列表中删除监听器。

#### Class: CustomEvent#

Added in: v18.7.0, v16.17.0
Stability: 1 - Experimental.

- Extends: <Event>


CustomEvent 对象是 CustomEvent Web API 的一个适配。Node.js 内部创建实例。 

##### event.detail#####

Added in: v18.7.0, v16.17.0
Stability: 1 - Experimental.

- Type: <any> 返回在初始化时传递的自定义数据。 

Read-only.

##### Class: NodeEventTarget#####

Added in: v14.5.0

- Extends: <EventTarget>


NodeEventTarget是Node.js特有的扩展，它模拟了EventEmitter API的子集。 

##### nodeEventTarget.addListener(type, listener)#####

- Added in: v14.5.0
  type <string>

- listener <Function> | <EventListener>

- Returns: <EventTarget> this


Node.js为EventTarget类提供了特定的扩展，以模拟等效的EventEmitter API。 addListener()和addEventListener()之间唯一的区别是addListener()将返回对EventTarget的引用。 

##### nodeEventTarget.emit(type, arg)#####

Added in: v15.2.0

- type <string>

- arg <any>
- Returns: <boolean>如果已经为该事件类型注册了事件监听器，则返回true，否则返回false。 

Node.js为EventTarget类提供了特定的扩展，以将参数分派到类型的处理程序列表。 

##### nodeEventTarget.eventNames()#####

Added in: v14.5.0

- Returns: <string[]>

Node.js为EventTarget类提供了特定的扩展，以返回已注册事件监听器的事件类型名称数组。 

##### nodeEventTarget.listenerCount(type)#####

- Added in: v14.5.0
  type <string>

- Returns: <number>


Node.js为EventTarget类提供了特定的扩展，以返回已注册事件监听器数量的事件类型。 

##### nodeEventTarget.setMaxListeners(n)#####

Added in: v14.5.0

- n <number>


Node.js为EventTarget类提供了特定的扩展，以将最大事件监听器数量设置为n。 

##### nodeEventTarget.getMaxListeners()#####

Added in: v14.5.0

- Returns: <number>


Node.js为EventTarget类提供了特定的扩展，以返回最大事件监听器数量。 

##### nodeEventTarget.off(type, listener[, options])#####

Added in: v14.5.0

- type <string>
- listener <Function> | <EventListener>

- options <Object>

- capture <boolean>
  Returns: <EventTarget> this


Node.js为eventTarget.removeEventListener()提供了特定的别名。 

##### nodeEventTarget.on(type, listener)#####

Added in: v14.5.0

- type <string>
- listener <Function> | <EventListener>

- Returns: <EventTarget> this


Node.js为eventTarget.addEventListener()提供了特定的别名。 

##### nodeEventTarget.once(type, listener)#####

Added in: v14.5.0

- type <string>
- listener <Function> | <EventListener>

- Returns: <EventTarget> this


Node.js为EventTarget类提供了特定的扩展，以为给定的事件类型添加一次性监听器。这相当于使用once选项设置为true调用on。 

##### nodeEventTarget.removeAllListeners([type])#####

Added in: v14.5.0

- type <string>
- Returns: <EventTarget> this

Node.js为EventTarget类提供了特定的扩展。如果指定了类型，则删除该类型的所有已注册监听器，否则删除所有已注册的监听器。 

##### nodeEventTarget.removeListener(type, listener[, options])#####

- Added in: v14.5.0
  type <string>

- listener <Function> | <EventListener>

- options <Object>
  - capture <boolean>
- Returns: <EventTarget> this

Node.js为EventTarget类提供了特定的扩展，以删除给定类型的监听器。 removeListener()和removeEventListener()之间唯一的区别是removeListener()将返回对EventTarget的引用。 

































