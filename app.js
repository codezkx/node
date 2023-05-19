setTimeout(() => {
    console.log('TIMEOUT FIRED');
}, 0)

setTimeout(() => {
    console.log(1);
    new Promise(resolve => {
        console.log(2);
        resolve(3)
    }).then(res => {
        console.log(res)
        setImmediate(() => {
            console.log(8)
        })
    })
}, 0)


// 下一次 Event loop 执行前调用
process.nextTick(function A() {
    console.log(4);
})



new Promise(resolve => {
    resolve(5)
}).then(res => {
    console.log(res)
})

setImmediate(() => {
    console.log(6)
})

process.nextTick(function foo() {
    console.log('递归')
    setImmediate(foo);
  });