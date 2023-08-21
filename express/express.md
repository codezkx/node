# express 框架

#### 基础常用总结

```js
> express express-bee --hbs 使用handlebars
nodemon app.js 自动监听代码变化

const express = require("express")
const http = require("http")
const path = require("path")
const url = require("url")

//process.cwd() 

let app = express()
// 调用内置中间件 以urlencoded方法来解析request请求内容
app.use('/user/:name', function (req, res, next) {
  /* 
    request常用方法
      req.baseUrl  请求路劲资源
      req.body     post请求的 请求主体内容
      req.params   二级path路劲的匹配值     {} params.path => get   {name(:name): '二级path路劲'}
      req.cookie   request 客户端携带cookie
      req.hostnmae 请求主机地址
      req.query    // queryString => json username=kyogre&pwd=2132131231 => 
                   { username: 'kyogre', pwd: '2132131231' } url地址上的参数 
      文件上传的时候有该对象
      req.file
      req.get('content-type)  获取请求头
      req.get('Cookie')
	  // 生成cookie
      res.cookie('name', 'zkx')

    response常用方法
      res.json({a:1,b:2}) 返回一个String类型的json
      res.send()          动态根据参数内容设置对应的响应content-type
      res.sendFile()      (path.join(__dirname, '/public/image/a.jpg'))
                          返回文件 文件地址 必须是绝对路径 根据返回的文件类型动态设置 content-type
      res.sendStatus(404)  //相当于 res.status(404).send('Not Found') 设置状态码
      
      
      req.files
这是上传的文件的对象。这个特性是bodyParser() 中间件提供,其它的请求体解析中间件可以放在这个中间件之后。当bodyParser()中间件使用后，这个对象默认为 {}。

例如 file 字段被命名为"image", 当一个文件上传完成后，req.files.image 将会包含下面的 File 对象:
})
  */
//  访问路径http://127.0.0.1:3008/user/get?username=kyogre&pwd=123456
  //  request方法
  // req常用
  console.log(req.baseUrl, "baseUrl") //    /user
    
   //    { name: 'get' }  name是上面中间件的name  get 是路径的参数
  console.log(req.params, "params")  
  console.log(req.cookies, 'cookies')
  console.log(req.hostname, "pathname") //127.0.0.1
  console.log(req.query, "query")  //{ username: 'kyogre', pwd: '123456' }直接转成对象（注意当前是GET）
  // res常用方法
  // res.json({a:1,b:2})
  res.sendFile(path.join(__dirname, '/views/a.html'))
})

// 创建服务
http.createServer(app).listen("3008", function () {
  console.log(`listen: ${3008} 服务已启动`)
})
```

#### 跨域处理

```js
app.use(cors({
  "origin": "*", 
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}))
```



快速，简单，极简的[Node.js](https://nodejs.org/en/) Web框架

Express 是一个基于 Node.js 平台的极简、灵活的 web 应用开发框架，它提供一系列强大的特性，帮助你创建各种 Web 和移动设备应用。

Express 不对 Node.js 已有的特性进行二次抽象，我们只是在它之上扩展了 Web 应用所需的基本功能。

文档地址: https://www.expressjs.com.cn/

http://expressjs.jser.us/3x_zh-cn/api.html 



和浏览器环境中的 JavaScript 一样，Node.js 也只提供了构建应用基本所需的底层接口和特性。而这些底层接口一般都很冗长、难用。所以有人就在 Node.js 的基础上实现了 Express 框架。其基本理念与 jQuery 类似，通过对底层接口进行了封装，在简化代码的同时提供更高级的接口。另外，Express 拓展性也非常强。框架本身与程序的架构和业务无关，并且你还可以通过第三方库进行功能拓展。



### 什么是express

Express 是一个基于 Node.js 封装的上层服务框架，它提供了更简洁的 API 更实用的新功能。它通过中间件和路由让程序的组织管理变的更加容易；它提供了丰富的 HTTP 工具；它让动态视图的渲染变的更加容易；它还定义了一组可拓展标准。

#### Node.js 的功能

通过一个简单的 JavaScript 函数，你就可以利用 Node.js 创建一个 Web 程序。该函数用于监听来自浏览器或者其他设备的发起的网络请求。当接收到一个请求后，函数会分析请求的内容并做成相应的处理。例如，当你请求站点主页时，该函数就会知道知道你的目的并将主页的 HTML 渲染出来。如果是请求某个 API 接口，该函数就会把对应的 JSON 数据返回给客户端。

假设，现在需要服务器返回当前时间和时区信息给用户，那么该程序大致包括如下功能：

- 如果客户端发起主页请求，Web 应用将会返回一个包含所需信息的 HTML 。
- 如果客户端访问地址错误，Web 应用将会返回 HTTP 404 错误，并附带一段错误描述。

如果直接在 Node.js 之上构建该应用而不使用 Express 的话，那么完整流程图大抵如下：

 

![01_02](assets/9f38f15e823f11c3e0c9b959c06a8ae1)01_02



> 在上述流程中，开发人员只需要关注圆圈部分内容处理。

这个用于处理浏览器请求的 JavaScript 函数叫做请求处理函数（request handler）。它也仅仅是一个处理请求并作出响应的 JavaScript 函数，并无任何特殊之处。Node.js 的 HTTP 服务会接管其中的网络连接，所以你无需关注和处理复杂的网络协议内容。

从代码角度来说，该函数包含两个参数：一个是网络请求 request 对象 ，另一个表示网络响应的 response 对象。在前面时间信息应用中，该请求处理函数会检查请求 URL 。如果请求的是主页，那么就返回成功的响应页面。否则，返回 404 错误。没有 Node.js 应用中都是这么处理的：编写处理函数对请求作出响应，非常的简单。

问题在于，Node.js 的 API 对开发者来说并不是非常友好。例如，如果我们想发送一个 JPEG 图片的话，可能需要至少 45 行代码才行。创建可复用 HTML 模版则更复杂。另外，Node.js 的 HTTP 模块虽然强大，但是仍然缺少一些实用特性。

Express 的出现就是为了解决这些问题，让你能够高效的使用 Node.js 来编写 Web 应用。

#### Express 给 Node.js 带来了什么？

从大的方面来说，Express 为 Node.js 的 HTTP 模块带来了两大特性：

- 通过提供大量易用接口，简化了程序的复杂度。例如上面放松 JPEG 图片问题，Express 可以将代码压缩带一行。
- 它允许对请求处理函数进行拆分，将其重构为很多负责特定请求的小型请求处理函数。这便于模块化和后期维护。

与上图相比，下图是 Express 处理请求的大致流程：



![01_03](assets/856702a9a989aa5a264efa1b5993d13a)01_03



> 与之前一样，开发者只需要关注圆圈部分的内容。

虽然，图看起来比前面复杂，但是实际开发却更简单，本质上它主要做了两件事：

1. 与之前一个大型的 request 请求处理函数不同，这里使用大量小型处理函数。有些函数每次都会执行（例如，请求日志），而有些函数只在特定情形下才会触发（例如，404 错误）。Express 有很多使用的工具能够对这些处理函数进行区分。
2. 请求处理函数中有两个参数：request 和 response。Node 的 HTTP 可以对其做些基本处理，例如：获取浏览器的 *user-agent* 。Express 则更为强大，你可以获取到访问者 IP 地址，以及解析优化过的 URL 请求对象。esponse 对象也同样得到了增强。通过类似 *sendFile* 这样的函数将文件传输代码压缩至一行。这极大的简化了处理函数的功能实现。

利用 Express 提供的简洁 API 接口，通过编写小型 request 请求处理函数，可以极大的压缩代码量提高开发效率。



### 中间件

中间件（Middleware） 是一个函数，它可以访问请求对象（request）, 响应对象（response）, 和 web 应用中处于请求-响应循环流程中的 next的变量。接下来我们先编写一个简单的express应用，看看究竟中间件是什么？

```
const express = require('express');
const app = express();

const fn = (req, res, next) => {
  console.log("hello,world");
};
app.use(fn)
const port = 3000;
app.listen(port,() => {
    console.log(`应用运行在${port}端口`);
})

```

当我们访问localhost:3000时就会发现，打印出了函数fn中的hello,world。这里的函数fn就是一个中间件，app.use(fn)就是运行这个中间件，实现他的功能。事实上，整个Express的功能就是由中间件组成，中间件具有的功能包括：

1. 执行任何代码。如果没有主动中止，会一直执行所有的中间件。
2. 调用堆栈中的下一个中间件。如果没有终结请求-响应循环，则必须调用 next() 方法将控制权交给下一个中间件。否则当前程序会被挂起
3. 终结请求-响应循环。终结请求-响应循环后，之后的中间件不再执行。

我们通过代码看一下中间件的这些功能：

```js
const express = require('express');
const app = express();
// 第一个中间件
app.use((req, res, next) => {
  console.log("中间件1");
  next();// 如果没有next则会被挂起
})
// 第二个中间件
app.use((req, res, next) => {
  console.log("中间件2");   //继续执行第二个中间件
  next();
})
// 第三个中间件
app.use((req, res, next) => {
  console.log("中间件3");
  res.send('hello');       // 终结请求-响应循环
})
// 第四个中间件
app.use((req, res, next) => {
  console.log("中间件4");   // 中介后的中间件不再执行
});
const port = 3000;
app.listen(port,() => {
    console.log(`应用运行在${port}端口`);
})

```

最终的输出结果为：`中间件1，中间件2，中间件3`。从上面的代码中我们可以知道，如果没有中止请求-响应循环，会执行所有的中间件；如果不是最后一个中止的中间件，必须执行next()。 我们看一下express中间件的模型： ![img](assets/172c6d42f52f3b88) 从上面的编程模型，我们可以看出每一个**中间件**就是插入到请求开始和响应结束**中间**的东西，这也是中间件名字的由来。

#### 中间件的优点——模块化

中间件的最大优点就是模块化，每一个中间件是一个独立的函数，实现一个特定的功能，然后通过app.sue将这个函数整合起来。抽离出来就是一个单独的模块。比如，我们要实现一个功能，获取当前请求的url,那么我们就可以将这个功能，封装成一个中间件。

```
//实现获取url的模块,封装成中间件
const fn = (req, res, next) => {
  const url = req.url;
  console.log(url);
  next();
};

app.use(fn);

const port = 3000;
app.listen(port,() => {
    console.log(`应用运行在${port}端口`);
})
```

Express中的中间件，根据作用范围大致可以分为应用级中间件和路由级中间件。事实上中间件的分类并没有特别明显的区别。

- 应用级中间件 app.use()以及它的一些语法糖中使用的中间件
- 路由级中间件 router.use(),以及它的一些语法糖中使用的中间件

```js

const express = require('express')
const http = require('http')
const path = require('path')
const fs = require('fs')
let app = express()
//中间件 
/*
  应用中间件
    任何请求到访 不识别路由 
    单纯对所有request 做基础的处理
    例: 获取request 请求内容 解析之后  挂载到req.query req.body 
    对于请求通用级的处理
  路由中间件
    区分不同请求的路由 实现对应引导和业务办理
  错误处理中间件

*/
const errMap = {
  '9008': "您无权访问此端口"
}

//应用中间件 记录访问IP count计数  进行数据的处理
app.use((req, res, next) => {
  let ip = req.ip
  // 日志文件中添加 一条 ip访问信息  日志中更新 当日访问总数
  next()
})

//路由中间件   进行前端验证
app.use('/login', (req, res, next) => {
  //根据req参数获取用户名 密码 进行登录验证 验证结果 res 返回
  let username = req.query
  console.log(username)
  fs.readFile(`/${username}`, (err, data) => {
    if (err) {
      next(err)
    }

  })
})
//错误处理中间件
app.use(function (err, req, res, next) {
  let msgCode = err.message
  //根据错误类型 错误描述 区分对应返回给客户端的信息
  res.json({ errMsg: msgCode })
});
//错误处理中间件
// console.info(app)
http.createServer(app).listen(3001, function () {
  console.log(`express 服务已开启 监听 3001 端口`)
})

```



### 应用级中间件

应用级中间件主要是通过app.use()，以及它的一些语法糖中应用的中间件。

```js
const express = require('express');
const app = express();
//  应用级中间件
app.use((req, res, next) => {
  const url = req.url;
  next();
});

//  应用级中间件
app.get('/user',(req,res) => {
  res.send('应用级中间件');
})
const port = 3000;
app.listen(port,() => {
    console.log(`应用运行在${port}端口`);
})

```

上面的代码中，我们调用了两个中间件，一个是app.use()直接调用的中间件，另外一个是app.use的语法糖app.get()执行的中间件，为什么说app.get()是app.use()的语法糖，因为app.get能够实现的方法使用app.use都能够实现。我们试着将上面app.get的中间件用app.use实现。

```js
app.use((req,res,next) => {
  console.log(req.path)
  if(req.method === "GET" && req.path == '/users'){
    res.send('使用app.use实现的中间件');
  }
})
// 功能上等价于
app.get('/user',(req,res) => {
  res.send('应用级中间件');
})

```

### 路由级中间件

```js
const express = require('express');
const app = express();

// 定义一个路由
const user = express.Router();
user.use("/", (req, res) => {
  res.send("user.use");
});
user.get("/user", (req, res) => {
  res.send("路由级别中间件");
});
user.get("/blog", (req, res) => {
  res.send("路由级中间件");
});

const port = 3000;
app.listen(port,() => {
    console.log(`应用运行在${port}端口`);
})


```

路由级中间件是通过使用express内置的Router生成一个小应用，这个应用跟app具有相同的功能，只不过它主要的功能是用来实现路由。 这种路由功能可以很方便地帮助我们进行路由模块化开发。我们可以将相关的路由弄到同一个模块当中。比如上面的user和blog路由可以抽成 user子路由模块和blog子路由模块。示例如下：

```js
const express = require('express');
const app = express();

const user = require('./routes/user.js');
const blog = require('./routes/blog.js');
// 抽离子路由
app.use('/user',user);
app.use('/blog',blog);
const port = 3000;
app.listen(port,() => {
    console.log(`应用运行在${port}端口`);
})

```

之后只要路径是/user的都会交给user这个子路由去处理。子路由user.js中代码如下：

```
const express = require('express');

const router = express.Router();
router.get('/',(req,res) => {
    res.send('这里是user路由');
})
module.exports = router;
```

#### 中间件实现

在上面的讲述中，我们知道中间件是一个函数，它是嵌入到一个请求和响应循环中的一个独立的功能块。函数的参数是req,res,next。因此编写一个中间件就显得很简单了。相当于编写一个函数，参数为req,res,next。

```
// 定义
const getUrl = (req,res,next) => {
    console.log(req.url);
    next();
}
// 使用
app.use(getUrl)

```

从上面的代码我们可以看出，开发一个中间件就是编写一个函数。但是有时候为了能够配置一些参数，我们通常是返回一个函数，比如这样:

```
const getUrl2 = (options) => {
    return () => {
      console.log(`${options.pre}+req.url`);
      next();
    }
}
app.use(getUrl2({pre:'url:'}))

```

这样的话，就需要app.use(getUrl())这样执行了。这就是为什么我们经常看到app.use(bodyParser())这样的使用方法了。实际上返回的还是一个函数，只是为了方便配置参数罢了。

### 不做任何修改的中间件

中间件函数可以对  request、response 进行修改，但它并不是必要操作。例如，前面的日志记录中间件代码：它只需要进行记录操作。而一个不做任何修改，纯功能性的中间函数代码大致如下：

```
function myFunMiddleware(request, response, next) {
  ...     
  nest(); 
}

```

因为中间件函数的执行是从上到下的。所以，加入纯功能性的请求记录中间件后，代码如下：

```
var express = require("express");
var http = require("http");
var app = express();
// 日志记录中间件
app.use(function(request, response, next) {
  console.log("In comes a " + request.method + " to " + request.url);
  next();
});

// 发送实际响应
app.use(function(request, response) {
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("Hello, world!");
});
http.createServer(app).listen(3000);

```

### 修改 request、response 的中间件

并不是所有的中间件都和上面一样，在部分中间件函数需要对 request、response  进行处理，尤其是后者。

下面我们来实现前面提到的验证中间件函数。为了简单起见，这里只允许当前分钟数为偶数的情况通过验证。那么，该中间件函数代码大致如下：

```
app.use(function(request, response, next) {
  console.log("In comes a " + request.method + " to " + request.url);
  next();
});
app.use(function(request, response, next) {
  var minute = (new Date()).getMinutes();
  // 如果在这个小时的第一分钟访问，那么调用next()继续
  if ((minute % 2) === 0) {
    next();
  } else {
    // 如果没有通过验证，发送一个403的状态码并进行响应
    response.statusCode = 403;
    response.end("Not authorized.");
  }
});
app.use(function(request, response) {
  response.end('Secret info: the password is "swordfish"!'); // 发送密码信息
});

```

### 第三方中间件类库

在大多数情况下，你正在尝试的工作可能已经被人实现过了。也就是说，对于一些常用的功能社区中可能已经存在成熟的解决方案了。下面，我们就来介绍一些 Express 中常用的第三方模块。

#### MORGAN：日志记录中间件

**Morgan** 是一个功能非常强大的日志中间件。它能对用户的行为和请求时间进行记录。而这对于分析异常行为和可能的站点崩溃来说非常有用。大多数时候 **Morgan** 也是 Express 中日志中间件的首选。

使用命令 *npm install morgan --save* 安装该中间件，并修改 app.js 中的代码：

```
var express = require("express");
var logger = require("morgan");
var http = require("http");
var app = express();
app.use(logger("short")); 
app.use(function(request, response){
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end("Hello, world!");
});
http.createServer(app).listen(3000);

```

再次访问 *http://localhost:3000* 你就会看到 Morgan 记录的日志了。

#### Express 的静态文件中间件

通过网络发送静态文件对 Web 应用来说是一个常见的需求场景。这些资源通常包括图片资源、CSS 文件以及静态 HTML 文件。但是一个简单的文件发送行为其实代码量很大，因为需要检查大量的边界情况以及性能问题的考量。而 Express 内置的 *express.static* 模块能最大程度简化工作。

假设现在需要对 *public* 文件夹提供文件服务，只需通过静态文件中间件我们就能极大压缩代码量：

```
var express = require("express");
var path = require("path");
var http = require("http");
var app = express();
var publicPath = path.resolve(__dirname, "public"); 
app.use(express.static(publicPath)); 
app.use(function(request, response) {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("Looks like you didn't find a static file.");
});
http.createServer(app).listen(3000);

```

现在，任何在 *public* 目录下的静态文件都能直接请求了，所以你可以将所有需要的文件的放在该目录下。如果 *public* 文件夹中没有任何匹配的文件存在，它将继续执行下一个中间件并响应一段 **没有匹配的文件**信息。

> 为什么使用  path.resolve ？ 之所以不直接使用 */public*  是因为 Mac 和 Linux 中目录为 */public* 而 Windows 使用万恶的反斜杠 *\public* 。path.resolve 就是用来解决多平台目录路径问题。

#### 更多中间件

除此上面介绍的 Morgan 中间件和 Express 静态中间之外，还有很多其他功能强大的中间件，例如：

connect-ratelimit：可以让你控制每小时的连接数。如果某人向服务发起大量请求，那么可以直接返回错误停止处理这些请求。

helmet：可以添加 HTTP 头部信息来应对一些网络攻击。具体内容会在后面关于安全的章节讲到。

cookie-parser：用于解析浏览器中的 cookie 信息。

https://github.com/expressjs/cookie-parser

```js
请求头要设置：
app.use(cors({
  "origin": true,// 设置为true  表示原始请求地址 req.origin.url
  "methods": "GET, POST, PATCH, PUT, DEAD, DELETE",//容许跨域的请求方式
  "allowedHeaders": "x-requested-with,Authorization,token, content-type", //跨域请求头
  "preflightContinue": false,// 是否通过next() 传递options请求 给后续中间件 
  "maxAge": 172800,  //options预验结果缓存时间 20天
  "credentials": true,  //允许把Cookie发到服务端
  "optionsSuccessStatus": 200 //options 请求返回状态码
}))

//必须要设置 创建使用给定一个新的cookie解析器的中间件
app.use(cookieParser())


app.use('/users', (req, res, next) => {
  console.log(req.cookies, "cookie内容")
  res.header("Set-Cookie", "bee=Climbing the mountain people")
  res.send(200, 'ok')

})

```



response-time：通过发送 X-Response-Time 信息，让你能够更好的调试应用的性能。

express.static express自带的中间件，用于访问静态文件

body-parser 第三方中间件，用于解析post数据

cookie-session 第三方中间件，用于处理session

bcrypt 第三方中间件，用于加密

passport 第三方中间件，用于鉴权

passport-jwt 第三方中间件，用于jwt鉴权


### 安装

工欲善其事必先利其器，在开发之前咱们先来安装好该有的东西。官网中通过生成器工具来快速构建项目，生成的工程中已经包含好该有的所有依赖。

```js
npm install -g express-generator

```

安装好之后就可以初始化一个 `Express` 应用了。

```
express express-app

```

### 工程目录一览

```
express-app
│  app.js
│  package.json
│
├─bin
│      www
│
├─public
│  ├─images
│  ├─javascripts
│  └─stylesheets
│          style.css
│
├─routes
│      index.js
│      users.js
│
└─views
        error.jade
        index.jade
        layout.jade

```

- `app.js` 应用初始化文件，包括引入所有应用的依赖项、设置视图模板引擎、静态资源路径、引入路由、配置中间件等
- `bin/www` 启动文件，设置监听端口、启动`http`服务等
- `public` 静态文件目录
- `routes` 路由文件，响应用户的`http`请求并返回结果
- `views` 视图文件

### 接口开发

在正式开发之前，咱们先跑一下工程自带的代码。

#### Hello Express

启动程序

```
cd bin
node www

```

```
  npm install -g nodemon

nodemon是用来自动重启Node.js应用程序的Node.js模块。

nodemon的主要功能是:

监视应用程序源代码的更改。当代码变更时,它会自动重启应用程序。

将正在运行的应用程序作为后台进程运行,不需要终端来运行应用程序。

使用nodemon命令来代替node命令启动应用程序,如:

npm install -g nodemon

nodemon app.js
每当保存应用程序的源码文件时,nodemon会自动检测到文件更改并重启应用程序,确保应用程序时刻运行最新代码。

这对开发Node.js应用程序很有帮助,可以避免手动停止和启动应用来加载代码更改。只需使用nodemon就可以开发和测试应用程序了。

所以nodemon可以说是Node.js自动重载服务器的包,它会监视应用程序文件并在文件更改后自动重启应用程序
  
```


PS:在 `www` 里面定义了如下，默认不改动的话程序就处于 `3000` 端口

```js
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

```

启动完之后打开 `localhost:3000` ，即可看到欢迎页面。

#### 启动流程

- 首先 `Node.js` 启动了 `http` 服务器

- `Express` 内部实现了路由分发，根据路由方法和路径分发到具体的 `controller` 中的 `action` 逻辑

- 输入 

  ```
  localhost:3000
  ```

   那么路由就是 '/' ，在 

  ```
  app.js
  ```

   中有如下两句代码

  ```js
  app.use('/', indexRouter);
  app.use('/users', usersRouter);
  
  ```

  对应的是路由组的注册，最后匹配到的就是 

  ```
  routes/index.js
  ```

   里面的方法

  ```js
  router.get('/', function(req, res, next) {
      res.render('index', { title: 'Express' });
  });
  
  ```

- 路由里面渲染了一个静态页面 

  ```
  index
  ```

   ，并把模板变量传了进去

  ```
  extends layout
  
  block content
  h1= title
  p Welcome to #{title}
  
  ```

  对应的便是所看到的的欢迎页面。

 

### 核心API

> express.xxx、app.xxx、router.xxx、request.xxx和response.xxx。

1. express.xxx 是express函数内置的中间件
2. app.xxx 是express创建的app对象所具有的属性和方法
3. router.xxx 是跟路由相关的router对象的方法
4. request.xxx 是请求时的request对象所具有的方法
5. response.xxx 是响应时的response对象所具有的方法

通过掌握这五类核心API，我们就掌握了Express的基础了。本文的主要内容就是介绍这些基础API。

### express 

express是express模块暴露出来的顶级的函数，用于生成一个应用。因此，我们先了解一下express的应用。

##### 主应用和子应用

创建一个应用：

```
const express = require('express');
const app = express();

```

这里的app就是express生成的一个主应用。通常来说一个项目只有一个应用，但是express可以生成多个应用，其中一个是主应用，其他的是子应用，子应用通过挂载点挂载到主应用上，子应用具有跟主应用相同的功能，这样方便进行模块化开发。示例：

```
const express = require('express');
// 创建两个应用
const app = express();
const admin = express();
// 通过挂载点/admin 将admin作为子应用挂载到app主应用身上。
app.use('/admin',admin);
// 子应用具有跟主应用app相同的功能
admin.get('/',(req,res,next) => {
    res.send('admin子应用');
})
app.listen(5000,() => {
    console.log('app运行在5000端口')
})


```

在上面的代码片段中，我们通过express函数生成了两个应用app和admin，然后将admin通过挂载点/admin挂载到app上。这样以后访问/admin都会由admin子应用控制。因此，我们就可以将admin抽离出来作为一个模块，实现模块化开发。

##### express内置的中间件

中间件的分类包括内置的中间件，而内置的中间件主要就是指express自带的中间件`express.xxx`。接下来我们将介绍几种可能用到的中间件。

##### express.json

```
const app = express();
app.post('/user',(req,res,next) => {
    console.log(req.body);  // undefined
    req.on('data',(chunk) => {
        console.log(chunk);
    })
    res.send('express.json')
})

```

当我们使用post进行请求时，如果请求主体中的数据是json格式，那么我们通过req.body无法获取到请求的数据。因为在node中默认是以流来传输数据的，如果我们想要获取到body中的数据，需要监听data。示例如下：

```
const app = express();
app.post('/user',(req,res,next) => {
    console.log(req.body);  // undefined
    req.on('data',(chunk) => {
        console.log(chunk); // {name:'hello'}
    })
    res.send('express.json')
})

```

在上面的代码片段中，我们通过req.on('data',() => {})获取到了body中的数据。但是这种获取数据太过麻烦了，因此express提供了内置的一些方法用于数据的获取，express.json就是用于获取json格式的数据。我们只需要在获取数据之前使用这个中间件即可。

```
const app = express();
app.use(express.json());
app.post('/user',(req,res,next) => {
    console.log(req.body);  // {name:'hello'}
    res.send('express.json')
})

```

使用express.json中间件，我们就可以很方便地在req.body中获取请求的json格式的数据。同理express还提供了几个中间件用于处理其他格式的数据：

1. express.row 用于处理二进制的数据
2. express.text 用于处理文本数据
3. express.urlencoded 用于处理&a=123&b=455这种格式的数据 

##### express.static

通过网络发送静态文件，比如图片,css文件，以及HTML文件等对web应用来说是一个非常常见的场景。我们可以通过res.sendFile去发送文件，但是实际上一个简单的发送文件，处理起来非常麻烦，需要非常多的代码量来处理各种情况。比如，我们发送一个简单的css文件。

```
app.get("/index.css", (req, res, next) => {
  res.setHeader("content-type", "text/css");
  res.send("body{background:red}");
});

```

我们需要设置发送的文件类型或者还需要对请求头等进行处理，试想一下，整个web网站需要请求多少css文件，多少图片资源，如果每个静态资源都通过路由去处理，这样项目会变得非常沉重。事实上，这些都是静态资源，不会动态修改，我们可以将其存储在服务器的一个目录下，然后再从这个目录中进行获取即可。express.static中间件就是用来处理这种静态文件的获取。

```
const publicPath = path.resolve(__dirname,'public');
app.use(express.static(publicPath));

```

这样的话，我们就可以访问public目下下的所有文件了。

```
http://localhost:5000/index.css
http://localhost:5000/1.jpg

```

注意：express会自动到public目录下查找，因此请求文件的url不要携带public目录名。 

##### express.Router

express.Router用于创建一个新的router对象，这个a路由对象可以像一个子应用一样设置路由，其目的同样是用于模块化开发。

```
const router = express.Router();
// rotuer类似于子应用，具有与app同样的功能
router.get('/',(req,res) => {
    res.send('blog');
})
```



### app

app应用是express函数执行后得到的对象，他的核心就是app.use()用于执行中间件，而且我们知道app.xxx等其他方法实际上都是app.use()的语法糖，也就是说 app.xxx所有的功能都可以通过app.use来实现。因此，这里我们只是列举一下一些常用的app方法。

#### 路由相关类方法

主要包括以下几种路由相关的方法：

1. app.all()
2. app.METHOD()
3. app.get()
4. app.post()
5. app.put()

app.all

app.all()是匹配所有的路由，不区分请求方法。示例：

```
app.all("/user", (req, res, next) => {
  console.log("hello");
  next();
});

```

app.all('/user')既可以匹配app.get('/user'),又可以匹配app.post('/user')的请求，只要是/user的请求，无论是什么方法都可以做出响应。

##### app.METHOD

app.Method()支持所有的方法  (VERB)

##### app.get/post/put/delete

这些是常见的路由请求方法

```js
app.get("/user", (req, res, next) => {
  console.log('get方法');
  next();
});
app.post("/user", (req, res, next) => {
    console.log('post方法');
   res.send("app.get");js
});

```

案例

```js
/*
 * @Author: your name
 * @Date: 2021-03-04 20:25:47
 * @LastEditTime: 2021-03-04 20:40:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Editonst 
 * @FilePath: \node\day21\express-bee\02.VERB(req.method).js
 */
const express = require("express")
const fs = require("fs")
const http  = require('http')
const app = express()

   //过滤就是捕获到对应的值

// 应用中间件use 过滤所有req.method
// app.use('/:pat', (req, res, next) => {
//   console.log(req.pat, '2')
//   console.log('use 不区分request的 method 进行捕获 3') //2
//   next()
// })

// 只过滤get
app.get('/', (req, res, next) => {
  console.log('get 捕获 request.method 是 GET 的请求')
  next()
})


app.param('pat', function (req, res, next, id) {
  console.log('1 params --------- ', req.params) // 1
  req.pat = req.params
  next()
});

app.delete('/', (req, res, next) => {
  console.log('delete 捕获 request.method 是 DELETE 的请求')
  next()
})

app.put('/', (req, res, next) => {
  console.log('put 捕获 request.method 是 PUT 的请求')
  next()
})

// 所有类型都去过滤
// app.all('/', (req, res, next) => {
//   console.log('VERB 所有method 都会捕获')
//   next()
// })

// 中间件有多个回调
app.post('/', (req, res, next) => {
  console.log('post 捕获 request.method 是 POST 的请求1')
  next()
}, (req, res, next) => {
  console.log('post 捕获 request.method 是 POST 的请求2')
  next()
}, (req, res, next) => {
  console.log('post 捕获 request.method 是 POST 的请求3')
  next()
})
const server = http.createServer(app)
server.listen(3006)
```





#### 模板引擎相关的方法

##### app.engine

express默认使用jade模板，但是同时支持其他的模板，因此如果我们想要使用其他的模板，需要设置模板引擎。 比如我们想要使用ejs模板，那么应该使用如下设置：

```
app.set('view engine', 'ejs');

```

app.set()中的'view engine',表示使用的文件模板格式，如果这里设置为ejs，那么它会默认去views下查找ejs文件，也只查找ejs 文件。也就是说这样设置后所有的views下的模板文件后缀都必须是ejs。不能是html这种。然而，有时候我们更喜欢模板文件是html，但是又 希望使用ejs，这时候就可以使用app.engine()进行设置。

```js
const ejs = require('ejs');
// 设置视图模板格式
app.set('view engine', 'html');
// 设置html引擎 将ejs模板映射到html
app.engine("html", ejs.__express);   // 使用ejs渲染html模板

```

app.engine()用于将EJS模板映射至".html"文件。

##### app.set/get  (全局属性)

app.set用于设置局部变量,但是最最常用的是app.set('view engin')用于设置模板引擎。app.get()用于获取app.set()设置的变量。

```js
// 设置视图引擎
app.set('view engine', 'html');
// 设置html引擎 将ejs模板映射到html
app.engine("html", ejs.__express);

// 设置局部变量
app.set('name','express');

app.get("/user", (req, res, next) => {
  // app.get()用于获取
  const name = app.get('name');
  console.log(name);
  res.render('index')
});

```

##### set 内置应用

name可以自己定义，也可以定义为应用设置（application settings） ，下面介绍几个应用设置

| Property                 | Type            | Value                                                        | Default                                                      |
| ------------------------ | --------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `case sensitive routing` | Boolean         | 支持区分大小写                                               | 废弃. Treats "/Foo" and "/foo" as the same.                  |
| *`env`                   | String          | 设置环境模式                                                 | `process.env.NODE_ENV`(`NODE_ENV`environment variable) or “development”. |
| `etag`                   | Varied          | 设置ETag响应头                                               |                                                              |
| *`jsonp callback name`   | String          | 指定默认的JSONP回调名称                                      | `?callback=`                                                 |
| `json replacer`          | String          | JSON 替换的回调函数                                          | `null`                                                       |
| `json spaces`            | Number          | 在设置时，发送带有指定数量空格的修饰的JSON字符串。           | 废弃.                                                        |
| `query parser`           | String          | 用于使用的查询解析器，要么是“simple”，要么是“extended”。simple解析器基于节点的本地查询解析器查询字符串。extended 解析器基于qs | "extended"                                                   |
| `strict routing`         | Boolean         | strict 路由模式                                              | Disabled. Treats "/foo" and "/foo/" as the same by the router. |
| `subdomain offset`       | Number          | The number of dot-separated parts of the host to remove to access subdomain. | 2                                                            |
| `trust proxy`            | Varied          | 表明该应用程序位于一个前端代理的后面，并使用`X-Forwarded-*`headers来确定客户端的连接和IP地址。注意:`X-Forwarded-*`headers很容易被欺骗，检测到的IP地址不可靠。默认情况下，信任代理是禁用的。当启用时，Express尝试通过前端代理或一系列代理来确定客户端的IP地址。要求的事情。然后，ips属性包含了客户端通过的IP地址的数组。要启用它，请使用信任代理选项表中描述的值。信任代理设置是使用[proxy-addr](https://www.npmjs.org/package/proxy-addr)包实现的。要了解更多信息，请参阅其文档 | Disabled.                                                    |
| *`views`                 | String or Array | 应用程序视图的目录或目录数组。如果一个数组，视图会按照数组中出现的顺序查找 eg：app.set('views', path.join(__dirname, 'views')) | `process.cwd() + '/views'`                                   |
| `view cache`             | Boolean         | 支持视图模板编译缓存。                                       | `true` in production.                                        |
| *`view engine`           | String          | 当省略时使用的默认引擎扩展名  eg： app.set('view engine', 'ejs') //设置模板引擎为 ejs |                                                              |
| `x-powered-by`           | Boolean         | Enables the "X-Powered-By: Express" HTTP header.             | `true`` `                                                    |

`trust proxy` 设置选项

| Type         | Value                                                        |
| ------------ | ------------------------------------------------------------ |
| Boolean      | 如果正确，客户端的IP地址被理解为`X-Forwarded-*`headers中最左边的条目。如果错误,程序是理解为直接面对互联网和来自req.connection.remoteAddress客户机的IP地址。这是默认设置。 |
| IP addresses | 一个IP地址，子网，或一个IP地址的数组，和子网来信任。下面是预配置的子网名称列表loopback - `127.0.0.1/8`, `::1/128`linklocal - `169.254.0.0/16`, `fe80::/10`uniquelocal - `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`, `fc00::/7`Set IP addresses in any of the following ways:`app.set('trust proxy', 'loopback') // specify a single subnet  app.set('trust proxy', 'loopback, 123.123.123.123') // specify a subnet and an address  app.set('trust proxy', 'loopback, linklocal, uniquelocal') // specify multiple subnets as CSV  app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']) // specify multiple subnets as an array`When specified, the IP addresses or the subnets are excluded from the address determination process, and the untrusted IP address nearest to the application server is determined as the client’s IP address. |
| Number       | 信任从前台代理服务器作为客户机的第n个跳转                    |
| Function     | Custom trust implementation. Use this only if you know what you are doing.`app.set('trust proxy', function (ip) {    if (ip === '127.0.0.1' || ip === '123.123.123.123') return true; // trusted IPs    else return false;  })`` ` |

etag 设置选项

| Type     | Value                                                        |
| -------- | ------------------------------------------------------------ |
| Boolean  | `true` enables weak ETag. This is the default setting. `false` disables ETag altogether. |
| String   | If "strong", enables strong ETag. If "weak", enables weak ETag. |
| Function | Custom ETag function implementation. Use this only if you know what you are doing.`app.set('etag', function (body, encoding) {  return generateHash(body, encoding); // consider the function is defined  })` |

##### app.locals

app.locals同样是用于设置局部变量，只不过通过app.locals设置的局部变量在任何地方都可以被访问到。

```js
// 设置
app.locals.title = 'Hello,Express'
app.locals.email = 'me@myapp.com'
// 获取
cosnole.log(app.locals.title);

```

##### localsd对象属性

```js
//当set设置的属性是全局的时候，全局属性是和settings一级的
//当set设置的属性是局部的时候，局部属性是在settings里面的

[Object: null prototype] {
  settings: {
    'x-powered-by': true,
    etag: 'weak',
    'etag fn': [Function: generateETag],
    env: 'development',
    'query parser': 'extended',
    'query parser fn': [Function: parseExtendedQueryString],
    'subdomain offset': 2,
    'trust proxy': false,
    'trust proxy fn': [Function: trustNone],
    view: [Function: View],
    views: 'F:\\node\\day21\\express-bee\\views',
    'jsonp callback name': 'callback',
    name: 'express'//app.set() 设置的局部属性
  }
  names: "expree"// app.set() 设置的全局属性
}
```

##### 洋葱模型

就是中间件的执行顺序（主要是next()的应用  只要 next里面只能传入err	）

```js
/*
 * @Author: your name
 * @Date: 2021-03-04 20:02:46
 * @LastEditTime: 2021-03-04 20:09:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node\day21\express-bee\01洋葱模型.js
 */
const express = require("express")
const http = require("http")
const app = express()

app.use('/user/',(req, res, next) => {
  console.log("我是中间件1")
  req.send()
  next()
  console.log("我是中间件2")
})

app.use((req, res, next) => {
  console.log("我是中间件3")
  next()
  console.log("我是中间件4")
})

app.use((req, res, next) => {
  console.log("我是中间件5")
  next()
  console.log("我是中间件6")
})

app.listen('3007', function() {
  console.log(`3007服务正式开启`)
})

/* 
  执行顺序  这就是 洋葱模型：先从外面开始执行，然后再从里面开始执行（先外面执行，然后直接从里面执行）
        我是中间件1
        我是中间件3
        我是中间件5

        我是中间件6
        我是中间件4
        我是中间件2

*/
```



### **router**(子路由)

router可以看做是app的一个子应用，app对象所具有的功能基本上router对象也都可以使用。包括router.all类似于app.all()、router.get/post/put类似于app.get/post/put、rotuer.use()类似于app.use()。router对象只是为了更加方便路由的模块化管理。所以app怎么使用的，router就怎么使用即可。

```js
const express = require('express');
cosnt router = express.Router();
router.get('/', function (req, res) {
  res.send('hello world')
})

```

#### **request.xxx 和respponse.xxx** 

request是我们请求中的request对象上具有的方法，通过这些方法可以获取请求的一些参数。 response是我们请求的response对象上具有的方法，通过这些方法可以获取响应的一些参数。 resquest和response的参数和方法大都跟http相关，这里只挑选几个容易错误使用的进行介绍， 其他的大家可以查阅相关文档。

#### req.baseUrl

req.baseUrl是指路由的挂载点

```
app.use(express.static(publicPath));
const user = express.Router();

app.use('/user',user);  // 路由挂载点是/user
user.get('/add',(req,res) => {
    console.log(req.baseUrl);  // req.baseUrl就是 /user
    res.send('hello');
})

```

#### req.originalUrl

用于获取完整的url路径地址。

```
user.get('/add',(req,res) => {
    console.log(req.baseUrl);  // /user
    console.log(req.originalUrl); // /user/add
    res.send('hello');
})

```

#### req.range

用于进行分片下载

```
var range = req.range(1000)
// the type of the range
if (range.type === 'bytes') {
  // the ranges
  range.forEach(function (r) {
    // do something with r.start and r.end
  })
}

```

上面的req.range(1000)，表示1000个字节进行切片，然后一片一片地进行传输。

列子

```js
//主路由
//路由中间件   // path/path/search?query
// /uid
// /login => 进入 router路由模块中间件处理   /uid

/*

  /login/auth/  第三方认证登录
  /login/sms/   短信登录
  /login/pwd/  密码登录

  登录总路由(类) /login 
      细分 
        /auth  =>  处理业务代码
        /sms   =>  处理业务代码
        /pwd   =>  处理业务代码 
*/
const express = require("express")
const fs = require("fs")
const http = require("http")
const app = express()

const route = require("./route/login")

// 中间件的子路由就是 一个路由的paht可以有多层 

// http://127.0.0.1:3008/login/pwd?user=123456  login二层路劲

/* 
  子路由一般来用作
      登录的不同验证方式登录或则 一个主路由需要多个子路由
      就是分模块化

*/
app.use("/login",route)

const server = http.createServer(app)
server.listen(3008)



//子路由

const express = require("express")
const router = express.Router() //加载子路由模块

router.get('/users', (req, res, next) => {
  console.log(req.baseUrl)///login  express包装的baseUrl路劲在子路由中只会获取主路由中的
  console.log(req.url) ///users?user=123456  原始路径会把主路由给过滤掉（捕获掉）
  res.send({
    statusCode: 200,
    mes: "用户名正确"
  })
})

router.get('/pwd', (req, res, next) => {
  console.log(req.baseUrl)
  res.send({
    statusCode: 200,
    mes: "密码正确"
  })
})

module.exports = router
```



### 路由

#### 路由的特性

从工作原理来说：路由就是通过对 HTTP 方法和的 URI 的组合进行映射来实现对不同请求的分别处理。当然，除了上面那种最简单的使用方式之外，Express 的路由还有更多实用的使用技巧和方法。

> 注意：在其它一些框架中（例如，Ruby on Rails ）会有一个专门的文件进行路由管理，但是 Express 中并没有这样的规定，你可以将路由按模块分开管理。

#### 含参的通配路由

在上面的使用方式中使用的是全等判断来进行路由匹配的。虽然对于 */someone* 这类非常管用，但是对于形如 */users/1*、*/users/2* 这类 RESTful 路由就明显不那么友好了。因为如果将后者路由一一列出的话，不管是从工作量还是后期维护来说都是非常差开发体验。针对这种情况，我们可以使用 Express 中含参的通配路由来解决。

该方法的工作原理就是，在路由中使用参数进行通配表示。而该参数所表示的具体数值会在变量 *params* 中获取到，下面是简单的代码示例：

```
app.get("/users/:userid", function(req, res) {
    // 将userId转换为整型
    var userId = parseInt(req.params.userid, 10);
    // ...
});
```

这样 RESTful 风格的动态路由就完全可以通过这种含参的通配路由进行处理。那么无论是 */users/123* 还是 */users/8* 都会被映射到同一中间件。需要注意的是：虽然 */users/* 或者 */users/123/posts* 不会被匹配，但是 */users/cake* 和 */users/horse_ebooks* 确会被匹配到。所以，如果实现更精准的路由匹配的话就需要使用其他方式了。

#### 使用正则表达式匹配路由

针对上面的问题，我们可以使用正则来对路由进行更精准的匹配。

> 注意：如果你对正则表达式部分的内容不熟悉的话，那么我建议你去查看该[文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)。

假设现在我们只需要匹配 */users/123* 和 */users/456* 这种通配参数为数字的动态路由的同时忽略其他路由格式，那么可以将代码改为：

```
app.get(/^\/users\/(\d+)$/, function(req, res) {
    var userId = parseInt(req.params[0], 10);
    // ...
});
```

通过正则表达式代码对通配参数作为了严格限定：该参数必须是数字类型。

正则表达式可能阅读起来并不是很友好，但是它却可以实现对复杂路由匹配规则的准确定义。例如，你想匹配路由 */users/100-500* 这类表示某个用户范围的列表页面，那么该正则如下：

```
app.get(/^\/users\/(\d+)-(\d+)$/, function(req, res) {

    var startId = parseInt(req.params[0], 10);

    var endId = parseInt(req.params[1], 10);
    // …
});
```

甚至你还可以作出更复杂的正则匹配路由定义，例如：匹配某个包含特定 UUID 的路由。UUID 是一长串 16 进制的字符串，大致如下：

> xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx

如果，其中的 *x* 表示任何 16 进制数字，而 *y* 只能是 8，9，A 或者 B 。那么该路由的正则匹配就是：

```
var horribleRegexp = /^([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})$/i;
app.get(horribleRegexp, function(req, res) {
    var uuid = req.params[0];
    // ...
});
```

还有更多的使用示例就不一一列举了。这里只需记住一点：正则表达式可以让你的路由匹配定义更上一层楼。

### 捕获查询参数

另一种常用的动态传入 URL 参数的方法就是通过查询字符串（query string）。例如，当你使用谷歌搜索 *javascript-themed burrito* 时，你可以会发现对应的 URL 可能是 *[www.google.com/search?q=ja…](https://www.google.com/search?q=javascript-themed burrito)* 。

如果 Google 是用 Express 进行实现的话（实际上不是），那么可以这样来获取用户传入的信息：

```
app.get("/search", function(req, res) {
    // req.query.q == "javasript-themed burrito"
    // ...
});
```

需要注意的是：查询参数中存在其实存在着类型安全问题。例如：如果你访问 *?arg=something* 那么 *req.query.arg* 就是一个字符串类型，但是如果访问的是 *?arg=something&arg=somethingelse* 的话 *req.query.arg* 就变为了一个数组类型。简单来说：不要轻易的断定查询参数的类型。

#### 使用 Router 划分你的 app

伴随着应用的扩张，程序中产生的路由也会越来越多。而对这些庞大的路由进行管理并不是一件轻松的事，不过好在 Express 4 新增了 Router （可以理解为路由器）特性。Router 的官方描述是：

Router 是一个独立于中间件和路由的实例，你可以将 Router 看作是只能执行执行中间件和路由的小心应用。而 Express 程序本身就内置了一个 Router 实例。

Router 的行为与中间件类型，它可以通过 *.use()* 来调用其他的 Router 实例。

换句话就是，可以使用 Router 将应用划分为几个小的模块。虽然对于一些小型应用来说这样做可能是过度设计，但是一旦 *app.js* 中的路由扩张太快的话你就可以考虑使用 Router 进行模块拆分了。

> 注意：程序越大 Router 发挥的作用就越明显。虽然这里我不会编写一个大型应用程序，但是你可以在你的脑海中对下面的示例功能进行无限扩张。

```
var express = require("express");
var path = require("path");

// 引入 API  Router
var apiRouter = require("./routes/api_router");

var app = express();
var staticPath = path.resolve(__dirname, "static");
app.use(express.static(staticPath));
// API  Router 文件的调用
app.use("/api", apiRouter);
app.listen(3000);
```

如上所示，Router 的使用方式和之前的中间件非常类似。其实 Router 本质上就是中间件。在代码中我们将所有 */api* 开头的 URL 全部转发到了 apiRouter 中了， 这意味着 */api/users* 和 */api/message* 的处理都会在 apiRouter 中进行。

下面就是 *api_router.js* 文件的一个简单代码示例： 

```
var express = require("express");
var ALLOWED_IPS = [
    "127.0.0.1",
    "123.456.7.89"
];
var api  = express.Router();
api.use(function(req, res, next) {
    var userIsAllowed = ALLOWED_IPS.indexOf(req.ip) !== -1;
    if(!userIsAllowed) {
        res.status(401).send("Not authorized!");
    } else {
        next();
    }
});
api.get("/users", function(req, res) { /* ... */ });
api.post("/users", function(req, res) { /* ... */ });
api.get("/messages", function(req, res) { /* ... */ });
api.post("/messages", function(req, res) { /* ... */ });
module.exports = api;
```

其实 Router 与 *app.js* 在功能上没有任何区别，都是处理中间件和路由。最大的不同在于：Router 只能已模块形式存在并不能独立运行。

参照示例，你可以在自己的应用中按模块划分出更多的 Router 。

#### 静态文件

除非应用是纯 API 服务，否则总可能需要发送静态文件。这些文件可能是静态图片 CSS 样式文件或者是静态 HTML 文件。在前面文章的基础之上，这部分将介绍更深入的部分内容。

##### 静态文件中间件

因为前面章节对静态文件中间件实现进行过详细介绍，所以这里直接查看代码：

```
var express = require("express");
var path = require("path");
var http = require("http");
var app = express():
// 设置你的静态文件路径
var publicPath = pathresolve(dirname, "public");
// 从静态文件夹中发送静态文件
app.use(express.static(publicPath));
app.use(function(request, response) {
    response.writeHead(200, { "Content-Type": "text/plain"});
    reponse.end("Looks like you didn't find a static file.");
});
http.createServer(app).listen(3000);
```

##### 修改静态文件的 URL

通常情况下，我们会把站点的静态文件 URL 路径直接挂在域名后面，例如：*[jokes.edu](http://jokes.edu)* 站点中的 *jokes.txt* 文件 URL 样式应该是 *[jokes.edu/jokes.txt](http://jokes.edu/jokes.txt)* 。

当然，你可可以按照自己的习惯给这些静态文件提供 URL 。例如，将一些无序但有趣的图片存放在文件夹 *offensive* 中并将其中图片的 URL 设置为 *[jokes.edu/offensive/p…](http://jokes.edu/offensive/photo123.jpg)* 这种形式。那么该样式 URL 如何实现呢？

在 Express 中，我们可以使用指定前缀的中间件来对静态文件  URL 进行自定义。所以上面问题的代码实现如下：

```
// ... 
var photoPath = path.resolve(__dirname, "offensive-photos-folder");
app.use("/offensive", express.static(photoPath));
// ...
```

这样你所有静态文件的 URL 都可以实现自定义了，而不是粗暴的直接挂在域名后面了。其实除了静态中间件和前面 Router 外，其它中间件同样可以指定 URL 前缀。

##### 多个静态文件夹的路由

实际上砸真实项目中可能户存在多个静态文件夹，例如：一个存放 CSS 等公用文件的 *public* 文件夹，一个存放用户上传文件的 *user_uploads* 文件夹。那么对于这种情况又该如何处理呢？

首先 *epxress.static* 本身作为中间件是可以在代码中多次调用的：

```
// ...
var publiscPath = path.resolve(__dirname, "public");
var userUploadPath = path.resove(__dirname, "user_uploads");
app.use(express.static(publicPath));
app.use(express.static(userUploadsPath));
// ...
```

接下来，我们通过四个模拟场景看看上面代码是如何工作的：

1. 用户请求的资源两个文件夹里都没有则上面两个中间件都会被跳过执行。
2. 用户请求的资源只在 *public* 里面则第一个中间件响应执行并返回。
3. 用户请求的资源只在 *user_uploads* 里面则第一个中间件被跳过而第二个得道执行。
4. 用户请求的资源在两个文件夹中都存在则第一个中间件响应执行并返回，第二个不会得到执行。

对于第四章情况，如果该资源是相同的还好说，但是一旦只是资源同名就存在明显错误了。为此，我们依旧可以使用 URL 前缀来应对：

```
// ...
app.use("/public", express.static(publicPath));
app.use("/uploads", express.static(userUploadsPath));
// ...
```

这样对于同名文件 *image.jpg* Express 会将其分别映射到 */public/image.jpg* 和 */uploads/image.jpg* 。

##### 路由到静态文件映射

在程序中有可能还存在对动态路由请求响应静态文件情形，例如，当用户访问 */users/123/profile_photo* 路径时程序需要发送该用户的图片。静态中间件本身时无法处理该需求，不过好在 Express 可以使用与静态中间件类似的机制来处理这种情况。

假设当有人发起 */users/:userid/profile_photo* 请求时，我们都需要响应对应 *userid* 用户的图片。另外，假设程序中存在一个名为 *getProfilePhotoPath* 的函数，该函数可以根据 *userid* 获取图片的存储路径。那么该功能的实现代码如下：

```
app.get("/users/:userid/profile_photo", function(req, res) {
    res.sendFile(getProfilePhotoPath(req.params.userid));
});
```

仅仅只需指定路由然后通过 *sendFile* 函数，我们就可以完成该路由对应文件的发送任务。

###### diskStorage高级用法

```js
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/tmp/my-uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

var upload = multer({ storage: storage })
```



## 中间件

Express 用于处理请求体的中间件很多，除了标题中提到的三个，还有multiparty、busboy 等，multiparty 性能上不如 busboy，而 multer 是 busboy 的顶层封装，效率又提升了一个档次。

### 内置中间件

#### express.json(options)

```js
// 调用 内置 express 应用 中间件 json() 处理content-type为 application/json 的请求内容解析后挂载到 req.body上
// app.use(express.json()) 直接解析为对象



// 将前端发送来的JSON格式的数据直接JSON.parse到req.body中
// 调用 内置 express 应用 中间件 json() 处理content-type为 application/json 的请求内容解析后挂载到 req.body上
app.use(express.json())


app.use('/login/:auto', (req, res, next) => {
  console.log(req.body)//直接获取到JSON格式数据
  res.send(200)
})

```



这是Express中内置的中间件功能之一。

可以将发送请求的请求体解析并放到req.body上以供开发者访问资源。

该中间件分析JSON并查看Content-Type标题与type选项匹配的请求。接受body的任何Unicode编码并支持以gzip和deflate的压缩算法

包含解析数据的新对象request.body在中间件之后被填充，如果没有要解析的主体，Content-Type则不匹配或发生错误，则会填充一个空对象。

options（部分选项）：

| 属性    | 描述                                                         | 类型    | 默认               |
| ------- | ------------------------------------------------------------ | ------- | ------------------ |
| inflate | 启用或禁用处理压缩后的请求；当禁用时，请求被拒绝。           | Boolean | true               |
| **limit | 最大请求主体大小。一个数字指定字节数；一个字符串传递给字节库以供解析。 | Mixed   | “100kb” / 1000     |
| strict  | 启用或禁用只接受数组和对象； 禁用时将接受JSON.parse接受的任何内容。 | Boolean | true               |
| type    | 这用于确定中间件将解析的类型。该选项可以是字符串，字符串数组或函数。如果不是函数，则type选项直接传递到类型库，这可以是扩展名（如json），MIME类型（如application / json）或带有通配符的MIME类型（如* / *或* / json）。如果一个函数，类型选项被称为fn（req），并且如果它返回一个真值，则请求被解析。 | Mixed   | "application/json" |

#### express.urlencoded(options)

```js
// // 处理content-type为 x-www-urlencode 的请求内容解析后挂载到 req.body上
// app.use(express.urlencoded({
//   extended: true
// }))


// 将前端发送来的JSON格式的数据直接JSON.parse到req.body中
// // 处理前端content-type为 x-www-urlencode 的请求内容解析后挂载到 req.body上
app.use(express.urlencoded())

app.use('/login/:auto', (req, res, next) => {
  console.log(req.body)//直接获取到JSON格式数据
  res.send(200)
})

```



它使用urlencoded有效负载分析传入请求，该中间件仅查看Content-Type标题与type选项匹配的请求。只接受UTF-8编码，并支持gzip和deflate。

包含数据的新对象request.body在中间件之后被填充，如果没有要解析的主体，Content-Type则不匹配或发生错误，则会填充空对象。该对象将包含键-值对，其中该值可以是一个字符串或阵列（时extended是false），或任何类型的（当extended是true）。

| 属性           | 描述                                                         | 类型    | 默认                                |
| -------------- | ------------------------------------------------------------ | ------- | ----------------------------------- |
| extended       | 此选项用于选择使用查询字符串库（如果为false）或qs库（如果为true）解析URL编码数据。这个“扩展”选项允许将丰富的对象和数组编码为URL编码格式，从而允许使用URL编码的类似JSON的体验。 | Boolean | true                                |
| inflate        | 启用或禁用处理压缩后的请求；当禁用时，请求被拒绝。           | Boolean | true                                |
| limit          | 最大请求主体大小。一个数字指定字节数；一个字符串传递给字节库以供解析。 | Mixed   | “100kb”                             |
| parameterLimit | 该选项控制URL编码数据中允许的最大参数数量。如果请求包含的参数多于此值，则会引发错误。 | Number  | 1000                                |
| type           | 这用于确定中间件将解析的媒体类型。该选项可以是字符串，字符串数组或函数。如果不是函数，则type选项将直接传递到type-is库，这可以是扩展名（如urlencoded），MIME类型（如application / x-www-form-urlencoded）或带MIME类型的MIME类型通配符（如* / x-www-form-urlencoded）。如果一个函数，类型选项被称为fn（req），并且如果它返回一个真值，则请求被解析。 | Mixed   | "application/x-www-form-urlencoded" |

#### express.static(root, options)

**文件重定向**

```js
app.use(express.static(path.join(__dirname, 'public')))
// * 代表所有的子路经
app.use('/images/*', (req, res, next) => {
  console.log(req.baseUrl)
  if (req.baseUrl === "/images/h1.jpg") {
      //rename 移动文件
    fs.rename('public/h1.jpg', './public/images/h1.jpg', () => {
      res.redirect('/images/h1.jpg')//重定向文件
    })
}
})
```



这是Express中内置的中间件功能。它提供静态文件并基于服务静态。

注：为获得最佳结果，请使用反向代理缓存来提高服务静态资产的性能。

root参数指定要从中为静态文件的目录。该功能通过req.url与提供的root目录结合来确定要提供的文件。。当找不到文件时，它不是发送404响应，而是调用next()移动到下一个中间件，允许堆叠和回退。

options（部分选项）：

| 属性        | 描述                                                         | 类型    | 默认         |
| ----------- | ------------------------------------------------------------ | ------- | ------------ |
| dotfiles    | 确定如何处理以“.”开头的文件或目录                            | String  | “ignore”     |
| etag        | 启用或禁用etag生成                                           | Boolean | true         |
| extensions  | 如果找不到文件，会搜索具有指定扩展名的文件并返回找到的第一个文件，例如：'html'，'htm'。 | Mixed   | false        |
| fallthrough | 让客户端错误作为未处理的请求发生，否则转发客户端错误。请参阅下面的下文。 | Boolean | true         |
| index       | 设置目录的index文件（索引文件）                              | Mixed   | “index.html” |
| redirect    | 当路径名称是目录时，重定向到尾随“/”。                        | Boolean | true         |

##### dotfiles

此选项的可能值为：

- “allow” - 没有针对dotfiles的特殊处理。
- “deny” - 拒绝一个点文件的请求，回应403，然后调用next()。
- “ignore” - 像dotfile不存在一样，使用404，然后调用next()。 注意：使用默认值，它不会忽略以点开头的目录中的文件。

##### fallthrough

如果选择此选项true，客户端错误的请求或对不存在的文件的请求将导致中间件调用next()进入下一个中间件。

如果为false，则会调用这些错误（即使是404）next(err)。

设置此选项为true，以便您可以将多个物理目录映射到相同的Web地址或路径以填充不存在的文件（多个static组合）。

如果您已经将该中间件安装在严格意义上为单个文件系统目录的路径中，则可以使用false路径，从而可以短接404s以减少压力。这个中间件也会回复所有的方法。

用法示例：

```
var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now())
  }
}

app.use(express.static('public', options))

```

#### express.Router(options)

```
express.Router(options)

```

option没什么东西，不解读直接罗列了。 属性

| 描述          | 默认                                                         | 可用性                                           |
| ------------- | ------------------------------------------------------------ | ------------------------------------------------ |
| caseSensitive | 启用区分大小写。                                             | 默认情况下禁用，将“/ Foo”和“/ foo”视为相同。     |
| mergeParams   | 保留父路由器的req.params值。如果父和子有相互冲突的参数名称，则该子的值优先。 | false                                            |
| strict        | 启用严格的路由。                                             | 默认情况下，“/ foo”和“/ foo /”被路由器视为相同。 |



### 常见第三方中间件

#### Bodyparser中间件

> 处理类型是 application/x-www-form-urlencoded 和 application/json 格式的表单

这个中间件用于处理第1,3种 content-type 的 body 非常的方便，但不能用于处理 multipart 类型的 body，具体 api 可见 GitHub，提供了四种方法

- bodyParser.json() 将body解析为json
- bodyParser.text() 将body解析为文本
- bodyParser.raw() 将body解析为二进制
- bodyParser.urlencoded() 将编码为URLEncoder的body解析出来

#### Multer 中间件

> 只处理类型是multipart/form-data的body。

```
下载 num install multer
```



它的主要功能是：

- .single(‘photo’)
- .array(‘photos’, 12)
- .fields([])

分别对应处理上传文件，批量上传和分类上传，同时也带有处理纯文字的功能，用上面三个方法不带参数即可。

| Key            | Description                     | Note            |
| -------------- | ------------------------------- | --------------- |
| `fieldname`    | Field name 由表单指定           |                 |
| `originalname` | 用户计算机上的文件的名称        |                 |
| `encoding`     | 文件编码                        |                 |
| `mimetype`     | 文件的 MIME 类型                |                 |
| `size`         | 文件大小（字节单位）            |                 |
| `destination`  | 保存路径                        | `DiskStorage`   |
| `filename`     | 保存在 `destination` 中的文件名 | `DiskStorage`   |
| `path`         | 已上传文件的完整路径            | `DiskStorage`   |
| `buffer`       | 一个存放了整个文件的 `Buffer`   | `MemoryStorage` |

#### cors中间件

cors跨域处理中间件

https://www.npmjs.com/package/cors

```
下载  npm install cors
```



            message: "OK",
```js
app.use(cors({
  "origin": true, //true 设置为 req.origin.url
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE", //容许跨域的请求方式
  "allowedHeaders": "x-requested-with,Authorization,token, content-type", //跨域请求头
  "preflightContinue": false, // 是否通过next() 传递options请求 给后续中间件 
  "maxAge": 1728000, //options预验结果缓存时间 20天
  "credentials": true, //携带cookie跨域
  "optionsSuccessStatus": 200 //options 请求返回状态码
}))
```



#### basicAuth()

基本的认证中间件，在`req.user`里添加用户名

用户名和密码的例子:

```
app.use(express.basicAuth('username', 'password'));
```

校验回调:

```
app.use(express.basicAuth(function(user, pass){
  return 'tj' == user && 'wahoo' == pass;
}));
```

异步校验接受参数`fn(err, user)`, 下面的例子`req.user` 将会作为user对象传递.

```
app.use(connect.basicAuth(function(user, pass, fn){
  User.authenticate({ user: user, pass: pass }, fn);
}))
```

#### bodyParser()

支持 JSON, urlencoded和multipart requests的请求体解析中间件。 这个中间件是`json()`, `urlencoded()`,和`multipart()` 这几个中间件的简单封装

```
app.use(express.bodyParser());

// 等同于:
app.use(express.json());
app.use(express.urlencoded());
app.use(express.multipart());
```

从安全上考虑，如果你的应用程序不需要文件上传功能，最好关闭它。我们只使用我们需要的中间件。例如：我们不使用`bodyParser`、`multipart()` 这两个中间件。

```
app.use(express.json());
app.use(express.urlencoded());
```

如果你的应用程序需要使用文件上传，设置一下就行。 [一个简单的介绍如何使用](https://groups.google.com/d/msg/express-js/iP2VyhkypHo/5AXQiYN3RPcJ).

#### compress()

通过gzip / deflate压缩响应数据. 这个中间件应该放置在所有的中间件最前面以保证所有的返回都是被压缩的

```
const compress = require('compression');
app.use(compress());
//优先调用compress中间件
app.use(express.json()); 
app.use(express.urlencoded()); 
app.use(express.bodyParser()); 
app.use(express.methodOverride()); 

```



#### cookieParser()

解析请求头里的Cookie, 并用cookie名字的键值对形式放在 `req.cookies` 你也可以通过传递一个`secret` 字符串激活签名了的cookie

```
app.use(express.cookieParser());
app.use(express.cookieParser('some secret'));
```

#### cookieSession()

提供一个以cookie为基础的sessions, 设置在`req.session`里。 这个中间件有以下几个选项:

- `key` cookie 的名字，默认是 `connect.sess`
- `secret` prevents cookie tampering
- `cookie` session cookie 设置, 默认是 `{ path: '/', httpOnly: true, maxAge: null }`
- `proxy` 当设置安全cookies时信任反向代理 (通过 "x-forwarded-proto")

```
app.use(express.cookieSession());
```

清掉一个cookie, 只需要在响应前把null赋值给session:

```
req.session = null
```

#### csrf()

CSRF 防护中间件

默认情况下这个中间件会产生一个名为"_csrf"的标志，这个标志应该添加到那些需要服务器更改的请求里，可以放在一个表单的隐藏域，请求参数等。这个标志可以通过 `req.csrfToken()`方法进行校验。

`bodyParser()` 中间件产生的 `req.body` , `query()`产生的`req.query`,请求头里的"X-CSRF-Token"是默认的 `value` 函数检查的项

这个中间件需要session支持，因此它的代码应该放在`session()`之后.

#### directory()

文件夹服务中间件，用 `path` 提供服务。

```
app.use(express.directory('public'))
app.use(express.static('public'))
```

这个中间件接收如下参数：

- `hidden` 显示隐藏文件，默认为false.
- `icons` 显示图标，默认为false.
- `filter` 在文件上应用这个过滤函数。默认为false.





## Node错误处理

`Errors`错误对象会在Node.js程序发生异常时产生，Node.js中有两类错误对象：`JavaScript 错误`和`系统错误`，但所有的错误都继承自`JavaScript`的`Error`类。由于`语法错误`或`语言运行时`引起的错误，会抛出`JavaScript 错误`，由于系统限制的操作引起的错误，会产生`系统错误`，Node.js将`系统错误`为一个增强的`Error`对象。

### 1. JavaScript 错误（`JavaScript Errors`）



JavaScript错误是一个表示语言使用不当或语法错误的API。

#### 1.1 类：`Error`

普通错误对象和其它错误对象不同，`Error`不会指示错误发现的原因。在`Error`被实例化时，它会记录下“堆栈”根踪信息，并有一个关于错误的描述。

Node.js中，`系统错误`和`JavaScript 错误`都被封装为这个类的实例。

**构造函数：`new Error(message)`**

通过构造函数，可以实例化一个新的`Error`对象，其参数`message`可以设置其实例的`.message`属性。

**实例属性：`error.message`**

通过`Error()`实例化对象时被传递的字符串。这个信息会出现在堆栈追踪信息的第一行，这个属性只能在实例化时设置，实例化后修改这个属性值并不会改变堆栈追踪的第一行信息。

**实例属性：`error.stack`**

这个属性会返回一个错误追踪信息，该错误信息表示实例化时程序运行点的字符串。

示例如下：

```
 Error: itbilu.com error happening!
   at /home/itbilu/file.js:525:2
   at Frobnicator.refrobulate (/home/itbilu/business-logic.js:424:21)
   at Actor. (/home/itbilu/actors.js:400:8)
   at increaseSynergy (/home/itbilu/actors.js:701:6)
```

`error.stack`属性会按以下方式进行错误信息的格式化：

- 第一行被格式化为`错误类名`: `错误信息`
- 之后是一系列以`at`开头的堆栈根踪信息。当V8有对这些信息的名称时，会显示对应的信息，不存在则显示错误位置。



**类方法：`Error.captureStackTrace(targetObject[, constructorOpt])`**

为`targetObject`创建一个`.stack`属性，它表示`Error.captureStackTrace`被调用时，在程序中的位置。可选参数`constructorOpt`接受一个函数，如果指定时，所有`constructorOpt`以上的帧，包括`constructorOpt`，将会被生成的堆栈追踪信息忽略。

```
var myObject = {};

Error.captureStackTrace(myObject);

myObject.stack  // 类似于`new Error().stack`
```



**类属性：`Error.stackTraceLimit`**

`.stackTraceLimit`表示堆栈追踪信息的堆栈帧数的属性， 其初始值是10。可以被设置为任何有效的JavaScript数字，当值被改变后，就会影响所有的堆栈追踪信息的获取。如果设置为一个非数字值，堆栈追踪将不会获取任何一帧，并且会在要使用时报告`undefined`。 Class

#### 1.2 类：`RangeError`

`RangeError`是`Error`的子类，该对象表示提供的参数没有在可接受范围值之内。示例如下：

```
require('net').connect(-1);  //抛出 RangeError异常，端口值应该 > 0 && < 65536
```



#### 1.3 类：`TypeError`

`TypeError`是`Error`的子类，表示所提供的参数不合法的类型。例如，为一个可接受值为字符串参数的函数，传入一个非字符串参数时，将触发一个`TypeError`。

```
require('url').parse(function() { }); //TypeError，参数应该是字符串
```



#### 1.4 类：`ReferenceError`

`ReferenceError`同样是`Error`的子类，该对象表示试图去获取一个未定义的对象的属性。在大多数情况下它表示一个输入错误，或者是一个不完整的程序。

```
doesNotExist; // ReferenceError，在这段代码中这是一个不存在的变量
```



#### 1.5 类：`SyntaxError`

`ReferenceError`的子类，表示程序代码不是合法的JavaScript。 发生此类错误时，通常表示这不一个完整的程序，在`eval`、`Function`、`require`、`vm`中经常发生此类错误。

```
try {
  require("vm").runInThisContext("binary ! isNotOk -- itbilu.com");
} catch(err) {
  // 会触发一个 syntaxError
}
```



#### 1.6 `Exceptions`与`Errors`

一个JavaScript `Exceptions`是一个无效操作或`throw`声明所抛出的结果的值。但是这些值不要求必须继承于`Error`，但所有的由Ｎode.js或JavaScript运行时抛出的异常都必须是一个`Error`实例。



### 2. 系统错误（System Errors）

系统错误在程序运行时环境的响应中生成。理想情况下，它们表示程序能够处理的操作错误。这些错误信息都是在系统级别生成的，在类Unix系统中，可以运行：`man 2 intro`或`man 3 errno`命令查看详细的错误信息，也可以查看[详细类型](http://man7.org/linux/man-pages/man3/errno.3.html)。 Node.js将`系统错误`为一个增强的`Error`对象，不完全是`Error`的子类，而是一个有额外成员的`error`实例。

#### 2.1 类：`System Error`

该类具有以下额外属性：

`error.syscall`：一个表示失败的系统调用信息的字符串。

`error.errno`：一个整数的错误码。

`error.code`：一个代表了错误码的字符串，通常是大写字母`E`开头。



#### 2.2 一些常见的系统错误

下面是一些Node运行过程中经常遇到的错误，详细错误列表请查看：`http://man7.org/linux/man-pages/man3/errno.3.html`

**EPERM: 操作不被允许**

执行一个需要特殊权限的操作时，会出现此错误。

**ENOENT: 指定的文件或目录不存在**

这个一般在文件操作中产生，指定的路径不存在会发生此错误（文件或目录找不到时）

**EACCES: 没有权限**

试图以禁止的方式去访问一个需要权限的文件。

**EEXIST: 文件已存在**

执行一个要求目标不存在的操作，但目标文件已经存在。

**ENOTDIR: 非目录**

给定的路径存在，但不是目录。通常由[fs.readdir](http://itbilu.com/nodejs/core/NyzN9yJ7g.html)产生

**EISDIR: 是目录**

需要指定的路径是目录，但给定的路径是一个文件。

**EMFILE: 系统中打开太多文件**

达到了系统中允许的文件描述符的最大数量，当进行下一个描述符请求，在已存在的最后一个描述符关闭之前，都会触发此错误。

通常在并行打开太多文件时触发，特别是在那些将进程可用的文件描述符数量限制得很低的操作系统中（如：`OS X`）。为了改善这个限制，在同一个SHELL中运行`ulimit -n 2048`命令，再运行Node.js进程。

### 错误处理中间件

错误处理的中间件和普通的中间件定义是一样的， 只是它必须有4个形参，这是它的形式： `(err, req, res, next)`:

```
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.send(500, 'Something broke!');
});
```

一般来说非强制性的错误处理一般被定义在最后，下面的代码展示的就是放在别的 `app.use()` 之后：

```
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(function(err, req, res, next){
  // logic
});
```

在这些中间件里的响应是可以任意定义的。只要你喜欢，你可以返回任意的内容，譬如HTML页面, 一个简单的消息，或者一个JSON字符串。

对于一些组织或者更高层次的框架，你可能会像定义普通的中间件一样定义一些错误处理的中间件。 假设你想定义一个中间件区别对待通过XHR和其它请求的错误处理，你可以这么做：

```
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);
```

通常`logErrors`用来纪录诸如stderr, loggly, 或者类似服务的错误信息：

```
function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}
```

`clientErrorHandler` 定义如下，注意错误非常明确的向后传递了。

```
function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.send(500, { error: 'Something blew up!' });
  } else {
    next(err);
  }
}
```

下面的`errorHandler` "捕获所有" 的异常， 定义为:

```
function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}
```
## 交互通信安全

前后端分离的开发方式，我们以接口为标准来进行推动，定义好接口，各自开发自己的功能，最后进行联调整合。无论是开发原生的APP还是webapp还是PC端的软件,只要是前后端分离的模式，就避免不了调用后端提供的接口来进行业务交互。

网页或者app，只要抓下包就可以清楚的知道这个请求获取到的数据，这样的接口对爬虫工程师来说是一种福音，要抓你的数据简直轻而易举。

数据的安全性非常重要，特别是用户相关的信息，稍有不慎就会被不法分子盗用，所以我们对这块要非常重视，容不得马虎。

### **如何保证交互通信数据的安全性？**

1、通信使用https

2、请求签名，防止参数被篡改

3、身份确认机制，每次请求都要验证是否合法

4、对所有请求和响应都进行加解密操作



## Confidentiality 保密

### MD5和SHA1

MD5是一种常用的哈希算法，用于给任意数据一个“签名”。这个签名通常用一个十六进制的字符串表示：

```
const crypto = require('crypto');

const hash = crypto.createHash('md5');

// 可任意多次调用update():
hash.update('Hello, world!');
hash.update('Hello, nodejs!');

console.log(hash.digest('hex')); // 7e1977739c748beac0c0fd14fd26a544

```

`update()`方法默认字符串编码为`UTF-8`，也可以传入Buffer。

如果要计算SHA1，只需要把`'md5'`改成`'sha1'`，就可以得到SHA1的结果`1f32b9c9932c02227819a4151feed43e131aca40`。

还可以使用更安全的`sha256`和`sha512`。

### AES

AES是一种常用的对称加密算法，加解密都用同一个密钥。crypto模块提供了AES支持，但是需要自己封装好函数，便于使用：

```
const crypto = require('crypto');

function aesEncrypt(data, key) {
    const cipher = crypto.createCipher('aes192', key);
    var crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

function aesDecrypt(encrypted, key) {
    const decipher = crypto.createDecipher('aes192', key);
    var decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

var data = 'Hello, this is a secret message!';
var key = 'Password!';
var encrypted = aesEncrypt(data, key);
var decrypted = aesDecrypt(encrypted, key);

console.log('Plain text: ' + data);
console.log('Encrypted text: ' + encrypted);
console.log('Decrypted text: ' + decrypted);

```

运行结果如下：

```
Plain text: Hello, this is a secret message!
Encrypted text: 8a944d97bdabc157a5b7a40cb180e7...
Decrypted text: Hello, this is a secret message!

```

可以看出，加密后的字符串通过解密又得到了原始内容。

注意到AES有很多不同的算法，如`aes192`，`aes-128-ecb`，`aes-256-cbc`等，AES除了密钥外还可以指定IV（Initial Vector），不同的系统只要IV不同，用相同的密钥加密相同的数据得到的加密结果也是不同的。加密结果通常有两种表示方法：hex和base64，这些功能Nodejs全部都支持，但是在应用中要注意，如果加解密双方一方用Nodejs，另一方用Java、PHP等其它语言，需要仔细测试。如果无法正确解密，要确认双方是否遵循同样的AES算法，字符串密钥和IV是否相同，加密后的数据是否统一为hex或base64格式。



### RSA 不对称加密

**RSA加密简介**

　　RSA加密是一种非对称加密。可以在不直接传递密钥的情况下，完成解密。这能够确保信息的安全性，避免了直接传递密钥所造成的被破解的风险。是由一对密钥来进行加解密的过程，分别称为公钥和私钥。两者之间有数学相关，该加密算法的原理就是对一极大整数做因数分解的困难性来保证安全性。通常个人保存私钥，公钥是公开的（可能同时多人持有）。

　　

**RSA加密、签名区别**

　　加密和签名都是为了安全性考虑，但略有不同。常有人问加密和签名是用私钥还是公钥？其实都是对加密和签名的作用有所混淆。简单的说，加密是为了防止信息被泄露，而签名是为了防止信息被篡改。这里举2个例子说明。

**第一个场景**：战场上，B要给A传递一条消息，内容为某一指令。

RSA的加密过程如下：

（1）A生成一对密钥（公钥和私钥），私钥不公开，A自己保留。公钥为公开的，任何人可以获取。

（2）A传递自己的公钥给B，B用A的公钥对消息进行加密。

（3）A接收到B加密的消息，利用A自己的私钥对消息进行解密。

　　在这个过程中，只有2次传递过程，第一次是A传递公钥给B，第二次是B传递加密消息给A，即使都被敌方截获，也没有危险性，因为只有A的私钥才能对消息进行解密，防止了消息内容的泄露。



**RSA**工作流程：

1. 前端拿到服务器给出的公钥
2. 前端使用公钥对密码明文进行加密得到密文
3. 发送密文到服务器
4. 服务器用私钥对其进行解密，就能得到密码的明文

![img](G:/node%E8%A7%86%E9%A2%91/day27/%E8%AF%BE%E4%BB%B6%E7%AC%94%E8%AE%B0/assets/606186-20160902172728543-1281530315.png)

#### 创建秘钥，加密，解密

```js
const NodeRSA = require('node-rsa');
const path = require('path')
const fs = require('fs').promises
const cerPath = path.join(process.cwd(), './auth')


//创建秘钥
function generateKeys () {
  //实例化 b 秘钥位 bit 越大越安全 256 , 512, 1024 - 4096
  const newkey = new NodeRSA({ b: 512 });

  //设置秘钥模式
  newkey.setOptions({ encryptionScheme: 'pkcs1' })

  //设置公钥 
  let public_key = newkey.exportKey('pkcs8-public')//公钥,

  //设置私钥
  let private_key = newkey.exportKey('pkcs8-private') //私钥

  //写入公钥 私钥 cer文件
  fs.writeFileSync(path.join(cerPath, 'private.cer'), private_key);
  fs.writeFileSync(path.join(cerPath, 'public.cer'), public_key);

}

//加密
async function encrypt (plain) {
  //读取秘钥 公钥
  let public_key = await fs.readFile(path.join(cerPath, 'public.cer'), 'utf8');
  const nodersa = new NodeRSA(public_key);

  //设置秘钥 scheme
  nodersa.setOptions({ encryptionScheme: 'pkcs1' });

  //调用加密方法  plain是需要加密的明文 加密生成的格式
  const encrypted = nodersa.encrypt(plain, 'base64');
  return encrypted;
}

//解密
async function decrypt (cipher) {
  // 获取私钥
  let private_key = await fs.readFile(path.join(cerPath, 'private.cer'), 'utf8');
  //私钥实例化 NodeRSA
  let prikey = new NodeRSA(private_key);

  //设置 模式 scheme pkcs1
  prikey.setOptions({ encryptionScheme: 'pkcs1' });

  // decrypt(解密密文, 解密后格式)
  return prikey.decrypt(cipher, 'utf8')
}


移动端进行密码加密   jsencrypt中间件
     //参数 公钥 明文  返回 密文
     function encrypt(publicKey, value) {
       let encrypt = new JSEncrypt();
      //  publicKey  服务端的公钥
      //设置公钥
       encrypt.setPublicKey(publicKey)
        //调用加密方法 encrypt.encrypt
       return encrypt.encrypt(value)
     }
```





## 认证授权 Authenticity



账号登录验证和权限设置，可以说是任何一个系统都必须具备的基本功能，而方式是从最传统的账号密码登录，到社交账号绑定不等。

1、登录验证(Authentication)

先要考虑登录有什么用?

最基本的目的是为了让系统在很多人中认得你，你上次来干什么了，做到哪一步了，一句话概括是:记得之前的你。

另外的目的是为了不让其他人冒充你。概括为:确保真的是你。

以上两个目的的实现需要两个中间件处理。



2、授权（Authorization）

登录验证是为了验证你的身份，有机会进入系统的大门。而授权是为了确定做的操作，都是被允许的，你有被赋予权限。系统需要知道你是普通用户，还是论坛坛主，又或者是整个系统的管理员。

### session



![在这里插入图片描述](G:/node%E8%A7%86%E9%A2%91/day27/%E8%AF%BE%E4%BB%B6%E7%AC%94%E8%AE%B0/assets/20190319093710845.png)

1. 服务端session是用户第一次访问应用时，服务器就会创建的对象，代表用户的一次会话过程，可以用来存放数据。服务器为每一个session都分配一个唯一的sessionid，以保证每个用户都有一个不同的session对象。
2. 服务器在创建完session后，会把sessionid通过cookie返回给用户所在的浏览器，这样当用户第二次及以后向服务器发送请求的时候，就会通过cookie把sessionid传回给服务器，以便服务器能够根据sessionid找到与该用户对应的session对象。
3. session通常有失效时间的设定，比如2个小时。当失效时间到，服务器会销毁之前的session，并创建新的session返回给用户。但是只要用户在失效时间内，有发送新的请求给服务器，通常服务器都会把他对应的session的失效时间根据当前的请求时间再延长2个小时。
4. session在一开始并不具备会话管理的作用。它只有在用户登录认证成功之后，并且往sesssion对象里面放入了用户登录成功的凭证，才能用来管理会话。管理会话的逻辑也很简单，只要拿到用户的session对象，看它里面有没有登录成功的凭证，就能判断这个用户是否已经登录。当用户主动退出的时候，会把它的session对象里的登录凭证清掉。所以在用户登录前或退出后或者session对象失效时，肯定都是拿不到需要的登录凭证的。

```js
//设置session
app.use(session({
  secret: 'keyboard cat', //签名 字符串
  resave: false, // 强制保存 session 就算没有变化
  saveUninitialized: true, //强制将未初始化的 session 存储 默认值 true
  name: 'sid', // 设置cookie上的 key
  cookie: {
    maxAge: 172000 /*签名过期时间 有效期*/
  },
  // rolling: true //每次请求都强制设置cookie 重置过期时间

}))
```



### Token

<img src="G:/node%E8%A7%86%E9%A2%91/day27/%E8%AF%BE%E4%BB%B6%E7%AC%94%E8%AE%B0/assets/image-20201118202514718.png" alt="image-20201118202514718"  />

基础流程

```undefined
1.服务端收到请求，去验证用户名与密码
2.验证成功后，服务端会签发一个 Token，再把这个 Token 发送给客户端
3.客户端收到 Token 以后可以把它存储起来，比如放在 Cookie 里或者 Local Storage 里
4.客户端每次向服务端请求资源的时候需要带着服务端签发的 Token
5.服务端收到请求，然后去验证客户端请求里面带着的 Token，如果验证成功，就向客户端返回请求的数据
```

![在这里插入图片描述](G:/node%E8%A7%86%E9%A2%91/day27/%E8%AF%BE%E4%BB%B6%E7%AC%94%E8%AE%B0/assets/20190603112621313.png)

![](F:\笔记\06node\assets\token.png)

所需中间件&模块

```cpp
 //生成token与验证
 1.jsonwebtoken  token生成包  加密
 npm install jsonwebtoken --save
 * 生成token的方法 sign
 * 验证token的方法 verify

2.express-jwt 中间件  解密
 npm install express-jwt --save
* 验证token是否过期并规定那些路由不需要验证 express-jwt({})
```

JWT包含三部分数据：

- Header：头部，通常头部有两部分信息：

  - 声明类型，这里是JWT
  - 加密算法，自定义（我们用的RSA）
    我们会对头部进行base64加密（可解密），得到第一部分数据

- Payload：载荷，就是有效数据，一般包含下面信息：

  - 用户身份信息（注意，这里因为采用base64加密，可解密，因此不要存放敏感信息）
  - 注册声明：如token的签发时间，过期时间，签发人等
    这部分也会采用base64加密，得到第二部分数据

  Payload 部分也是一个 JSON 对象，用来存放实际需要传递的数据。JWT 规定了7个官方字段，供选用。

  - iss (issuer)：签发人
  - exp (expiration time)：过期时间
  - sub (subject)：主题
  - aud (audience)：受众
  - nbf (Not Before)：生效时间
  - iat (Issued At)：签发时间 unix时间戳 单位秒
  - jti (JWT ID)：编号

  除了官方字段，你还可以在这个部分定义私有字段，下面就是一个例子。

  ```javascript
   {
     "sub": "133212312",
     "name": "Joker chen",
     "admin": true
   }
  //加密
  app.use('/getToken', (req, res, next) => {
    let { username, pwd } = req.body
    //生成token
    const token = jwt.sign(
      {
          JWT 规定了7个官方字段
        username,//签发人
        exp: ~~((Date.now() / 1000) + 1000) //token过期日期
      },
      priveteKey,
      { algorithm: 'RS256' }
    )
    res.send(200, {
      statusCode: 200,
      errMsg: "ok",
      data: {
        token
      }
    })
  })
  
  //多个中间件可以拼接到一起
  app.use('/getAvatar', expressJwt({
    secret: publicKey, //解密秘钥 
    algorithms: ["RS256"], //6.0.0以上版本必须设置解密算法 
    getToken: function fromHeaderOrQuerystring(req) {
      //获取token的方法 默认处理方式如下  这个方法可要可不要
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
      } else if (req.query && req.query.token) {
  
        return req.query.token;
      }
      return null;
    },
    isRevoked: function (req, payload, next) {
      //获取token payload内容
      // console.log(payload)
      let { iat, username } = payload
      req.tokenID = username
      next()
    }
  }), 
   //中间件       
   (req, res, next) => {
    if (!req.tokenID) {
      res.send(200, {
        statusCode: 403,
        errMsg: "没有访问权限"
      })
      return
    }
  
    res.send(200, {
      statusCode: 200,
      errMsg: "welcome"
    })
  });
  ```

  注意，JWT 默认是不加密的，任何人都可以读到，所以不要把秘密信息放在这个部分。

  这个 JSON 对象也要使用 Base64URL 算法转成字符串。

- Signature：**签名，是整个数据的认证信息**。通过base64对头和载荷进行编码，一般根据前两步的数据，再加上服务的的密钥（secret）（不要泄漏，最好周期性更换），通过加密算法生成（RSA算法进行加密，无法进行篡改）。用于验证整个数据完整和可靠性

![在这里插入图片描述](G:/node%E8%A7%86%E9%A2%91/day27/%E8%AF%BE%E4%BB%B6%E7%AC%94%E8%AE%B0/assets/20190603112551756.png)



JWT 作为一个令牌（token），有些场合可能会放到 URL（比如 api.example.com/?token=xxx）。Base64 有三个字符`+`、`/`和`=`，在 URL 里面有特殊含义，所以要被替换掉：`=`被省略、`+`替换成`-`，`/`替换成`_` 。这就是 Base64URL 算法。

代码token.js

```js
const path = require('path');
const fs = require('fs')
const jwt = require('jsonwebtoken');
const jwtScrect = fs.readFileSync('../auth/jwtSCrect.cer', 'utf8');  //签名
const fs = require('fs').promises


module.exports = {
  async setToken (user_name, user_id) {
    const token = jwt.sign({ user_name, user_id }, jwtScrect, { expiresIn: '24h' });
    return token
  },
  //各个接口需要验证token的方法
  async getToken (token) {
    if (!token) {
      console.log('token是空的')
      return {
        statusCode: 4090,
        errMsg: 'token 不存在'
      }
    }
    var info = jwt.verify(token.split(' ')[1], jwtScrect);
    return info;  //解析返回的值（sign 传入的值）
  }
}
```



##### JWT 的几个特点

（1）JWT 默认是不加密，但也是可以加密的。生成原始 Token 以后，可以用密钥再加密一次。

（2）JWT 不加密的情况下，不能将秘密数据写入 JWT。

（3）JWT 不仅可以用于认证，也可以用于交换信息。有效使用 JWT，可以降低服务器查询数据库的次数。

（4）JWT 的最大缺点是，由于服务器不保存 session 状态，因此无法在使用过程中废止某个 token，或者更改 token 的权限。也就是说，一旦 JWT 签发了，在到期之前就会始终有效，除非服务器部署额外的逻辑。

（5）JWT 本身包含了认证信息，一旦泄露，任何人都可以获得该令牌的所有权限。为了减少盗用，JWT 的有效期应该设置得比较短。对于一些比较重要的权限，使用时应该再次对用户进行认证。

（6）为了减少盗用，JWT 不应该使用 HTTP 协议明码传输，要使用 HTTPS 协议传输。

##### 客户端请求 设置header

```
Authorization: Bearer <token>

```



