const { URL, URLSearchParams } = require('url');

// console.log(URLSearchParams);

const myURL = new URL('https://example.org/?abc=123&name=uzi&age=26');

const search = myURL.searchParams
// console.log(search) // URLSearchParams { 'abc' => '123', 'name' => 'uzi', 'age' => '26' }

const searchParams = new URLSearchParams(myURL.search);
// console.log(searchParams) // URLSearchParams { 'abc' => '123', 'name' => 'uzi', 'age' => '26' }

searchParams.append('foo', 1); // 添加查询
console.log(searchParams); // URLSearchParams { 'abc' => '123', 'name' => 'uzi', 'age' => '26', 'foo' => '1' }

searchParams.delete('abc'); // 删除查询
console.log(searchParams); // URLSearchParams { 'name' => 'uzi', 'age' => '26', 'foo' => '1' }

console.log(searchParams.entries()); // URLSearchParams Iterator { [ 'name', 'uzi' ], [ 'age', '26' ], [ 'foo', '1' ] }  可迭代

searchParams.forEach(item => {
    console.log(item); // 返回value值
    /* 
        uzi
        26
        1
    */
})

console.log(searchParams.get('name')); // 获取name的value值 uzi 
console.log(searchParams.getAll('name')); //  获取所有为name的value值 uzi  ['uzi']

console.log(searchParams.has('name')) // 校验name是否存在  true


console.log(searchParams.keys()) // 获取search所有的name值 URLSearchParams Iterator { 'name', 'age', 'foo' }

searchParams.set('set', 'set的值');
console.log(searchParams) // URLSearchParams { 'name' => 'uzi', 'age' => '26', 'foo' => '1', 'set' => 'set的值' }  set search的值

console.log(searchParams.size) // 查询的个数  4

console.log(searchParams.toString()) // URLSearchParams 转换成string  name=uzi&age=26&foo=1&set=set%E7%9A%84%E5%80%BC

console.log(searchParams.values()) // 获取的value的值    URLSearchParams Iterator { 'uzi', '26', '1', 'set的值' }

