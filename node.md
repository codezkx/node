# Node服务端

 本节开始学习Nodejs服务端内容, 为下一阶段框架学习打基础, 同时具备初级的双端开发能力, 主要包括:

- 服务端开发基础 

- 数据连接交互

- 代码与项目管理

- 数据库基础

- 生产与部署

- 工程化工具

- 包管理工具

## 认识WEB体系

> 客户端(前端) 服务端(后端)  服务器 代理  HTTP Server 

![image-20201021181017764](assets/image-20201021181017764.png)

#### 服务端

服务端是为客户端服务的，服务的内容诸如向客户端提供资源，保存客户端数据。是实现游戏特色化的重要途径，也是最直接可以通过游戏表现出来的技术，比如你要修改某个NPC的参数，重加载后，在客户端内立刻体现出来。

#### 客户端

客户端（Client）或称为用户端，是指与服务端相对应

常见客户端有: DNS客户端 web客户端 游戏客户端 移动客户端

Web客户端主要指web浏览器(Browser)。其主要功能是将用户向服务器请求的Web资源呈现出来，显示在浏览器窗口中。资源通常有html、pdf、image及其他格式。

#### web服务器 

WEB服务器也称为WWW(WORLD WIDE WEB)服务器

Web服务器一般指网站服务器，是指驻留于internet上某种类型计算机的程序，让全世界浏览；可以放置数据文件，让全世界下载。目前最主流的三个Web服务器是Apache、 Nginx 、IIS。

#### HTTP

http是一个简单的请求-响应协议，它通常运行在TCP之上。它指定了客户端可能发送给服务器什么样的消息以及得到什么样的响应。请求和响应消息的头以ASCII码形式给出；而消息内容则具有一个类似MIME的格式。这个简单模型是早期Web成功的有功之臣，因为它使得开发和部署是那么的直截了当。

HTTP是基于客户/服务器模式，且面向连接的。典型的HTTP事务处理有如下的过程： 

（1）客户与服务器建立连接；

（2）客户向服务器提出请求；

（3）服务器接受请求，并根据请求返回相应的文件作为应答；

（4）客户与服务器关闭连接。



#### WEB工作原理

HTTP处理流程：建立连接 --> 客户端浏览器发送请求信息 --> web服务器解析请求并找 件以及其它信息组成HTTP响应返回客户端 --> 关闭连接。

#### URL

URL：统一资源定位符
格式：协议://域名/目录/文件#片段标示符
例如：http://www.baidu.com/admin/index.php



#### WEB基础架构

![image-20201021182325585](assets/image-20201021182325585.png)

## Web Server介绍

### 基本定义

Web Server，Web服务器，一般指网站服务器，是指驻留于因特网上某种类型计算机的程序，可以向浏览器等Web客户端提供文档，也可以放置网站文件，让全世界浏览；可以放置数据文件，让全世界下载。
通俗一点可以理解为这样：
\* Web服务器存放一些资源（文件、数据等），可以通过因特网的形式进行访问，资源的展现形式是Web Server内部确定好的。
\* Web服务器维持可达性，即通过IP（域名）和端口可以访问到Web服务器，并获取Web Server提供的资源。

常见的Web Server有nginx、lighttpd，apache，IIS、jetty、Tomcat等。

### 流程介绍

Web Server同客户端之间通过某些协议进行数据交互，常见的有HTTP、FTP等。
协议是客户端和服务器进行数据连接、交互的一种规范，只有按照这个规范才能解析相应的数据。
一般的，客户端与服务器交互示意图如下：

![](assets/34ec7a9c0f094bb9998ebe37db626a16-1603275469092.jpg)

> - 客户端发送一个Web请求，如在浏览器输入http://www.sogou.com
> - 通过Internet传输，请求传递到Web服务器，Web服务器按照一定的协议（如http）对请求进行解析。
> - Web服务器处理请求，寻找资源，如果成功找到资源，则将状态码及文档内容回传至客户端，如果未找到，则返回状态码及其他信息，告知客户端资源未找到，如常见的404页面。
> - 客户端接收数据，进行相应的处理，如浏览器展现页面。



## 认识Nodejs

Node.js 是2009的时候由大神 Ryan Dahl 开发的。Ryan 的本职工作是用 C++ 写服务器，后来他总结出一个经验，一个高性能服务器应该是满足“事件驱动，非阻塞 I/O”模型的。C++ 开发起来比较麻烦，于是 Ryan 就想找一种更高级的语言，以便快速开发。



可以说有两点促成了 Nodejs 的诞生。首先第一点，Ryan 发现 JS 语言本身的特点就是事件驱动并且是非阻塞 I/O 的，跟他的思路正是绝配。第二点，Chrome 的 JS 引擎，也就是 V8 引擎是开源的，而且性能特别棒。于是 Ryan 就基于 V8 开发了 Node.js ，注意 Node.js 听名字好像是个 JS 库，其实不是的，Node.js 是 C++ 开发的



所以说 Node.js 不是库，是一个运行环境，或者说是一个 JS 语言解释器。



### Node应用环境

用JS做服务器： Express / EggJS / HAPI / Koa 

用JS做移动端混合应用：PhoneGap / Cordova / Ionic 

用JS做移动端原生应用：React-Native / NativeScript / WEEX 



### Node对于前端的应用

目前NodeJS大多被用于前端开发的**开发环境。**以Webpack作为例子，webpack是一个运行在 NodeJS 端的打包工具，它帮你把你写的 a.js, b.js, c.js ... 打包成一个 bundle.js。而这种打包的第一步是**读取（文件读取能力）**你的a.js, b.js, c.js ...，所以只能在 NodeJS 环境下做。

vue-cli，react-cli 和 ng-cli 都是运行在 NodeJS 环境下的脚手架。也就是说我们不可以直接在浏览器里运行 vue-cli。因为有了文件读写的能力，所以 vue-cli 可以帮我们集成（或者打包）vue核心模块，并将我们的代码转义，压缩。

所以 vue-cli 是 **运行在 NodeJS 环境下** 帮助我们开发 **基于Vue框架的项目** 的脚手架。 

Node也是是现代前端工程化和自动化的基石



### Node作为服务端

nginx、apache、tomcat ，都是服务器，nginx 是轻量级 http服务器和反向代理服务器，，apache也是http服务器，nginx和apache 也都可以作为静态文件服务器来使用。

tomcat 可以认为是apache 的一个扩展，apache如果要运行java，就需要tomcat的支持，tomcat也可以独立运行。他们都属于应用服务器。

node.js 其实需要分开理解，js 是javascript 是一门语言，node是js的一个运行平台 或者运行环境,是对chrome v8引擎的一个封装（chrome浏览器运行js就是v8引擎）

由于NodeJS的最底层是Chrome的V8引擎，然后libuv封装了一些**I/O的线程池管理 以及 网络的I/O操作**，这部分是C/C++写的。简单来说NodeJS可以控制系统文件的读写，网络的输入输出。所以NodeJS又可以被单纯的认为是一个可以运行 JavaScript 的服务器。



### 服务端的特性对比

1、**apache** 请求 多进程，多线程，，每个进程达到线程上线，会开辟新的进程。线程是阻塞的，一个线程处理结束（请求数据库等等）才会回收，不然新的请求只能开辟新的线程。

2、**nginx** 请求 ，为异步非阻塞，抗并发，适合做负载分发请求。

3、**nodejs** 单线程、非阻塞，抗并发请求能力大，转发给低层C++ 处理。适合大并发、静态文件请求密集、i/o密集、聊天室、blog、(cpu密集、解压缩、模板渲染加密、解密等,不适合nodejs）等。

4、**Tomcat**是应用（Java）服务器，它只是一个Servlet(JSP也翻译成Servlet)容器，可以认为是Apache的扩展，但是可以独立于Apache运行。



## Node的安装

### windows安装

Node.js 官方网站下载：https://nodejs.org/zh-cn/

LTS 长期支持版 ： 实际业务开发中使用 ，稳定 安全

current 最新版 ： 尝鲜与学习新特性使用 ，包含最新特性

Node中文网 ： http://nodejs.cn/



![image-20201021184839609](assets/image-20201021184839609.png)

点击安装包下载，安装node

PS：默认安装到C盘 不建议修改路径

快捷打开 运行 win + R

3.安装完后，可以在命令行cmd中输入node -v 来查看安装版本和是否安装成功

![img](assets/1676314-20190918142909362-368120104.png)



### Mac OS 上安装

你可以通过以下两种方式在 Mac OS 上来安装 node：

- 在官方下载网站下载 pkg 安装包，直接点击安装即可。

- 使用 brew 命令来安装：

```
brew install node
```



### 命令行工具

- CMD全称command，即命令提示符，是微软Windows系统的命令行程序（可解释为Commander.exe），类似于微软的DOS操作系统。
- PowerShell  Win10下新增的管理工具,是一种跨平台的任务自动化和配置管理框架，由命令行管理程序和脚本语言组成
- Vscode内置终端



CMD基础命令

```
cd /?     #获取使用帮助

cd \       #跳转到硬盘的根目录

cd C:\WINDOWS  #跳转到当前硬盘的其他文件

d:        #跳转到其他硬盘

cd /d e:\software    #跳转到其他硬盘的其他文件夹

注意此处必须加/d参数。否则无法跳转。

cd..      #跳转到上一层目录

ipconfig #展示当前TCP/IP协议设置值 主要用来查看IP地址 子网掩码 网关

dir 　　     			#查看查看当前目录下的文件与文件夹信息
edit  文件名 　　 		#修改文件中的内容（英文模式）
notepad 文件名 　　 		 #修改文件中的内容（中文模式）
copy 文件名 文件夹名 　　 	 #复制文件到指定文件夹
del 文件名 　　 				#删除文件
move 文件名 文件夹名 　　 	 #移动文件到指定文件夹（剪切）
mkdir/md 文件夹名 　　 	   #建立新的文件夹
```





### NPM

npm,全称【node package management】，是nodejs内置的软件包管理器。毫无疑问，npm是用来管理软件包的。

它是世界上最大的软件注册表，每星期大约有30亿次的下载量，包含超过600000个包(包)(即，代码模块)。来自各大洲的开源软件开发者使用NPM互相分享和借鉴.包的结构使您能够轻松跟踪依赖项和版本。



#### npm的使用方法

要使用npm这个软件包管理工具，最常见的方法就是在电脑上安装nodejs.

下载地址为：[http://nodejs.cn/download/](https://links.jianshu.com/go?to=http%3A%2F%2Fnodejs.cn%2Fdownload%2F)，

因为nodejs软件内置了npm，所以windows系统在安装nodejs后，打开cmd即可使用npm下载资源；



#### 配置npm环境变量

查看npm安装信息与默认下载路径

```shell
npm config ls
```

查看全局默认目录

```shell
npm root -g
```



1. 修改全局与缓存地址

在D盘nodejs目录下创建两个目录，分别是node_cache和node_global，这是用来放安装过程的缓存文件以及最终的模块配置位置。配置完成后，cmd中执行下面这两个命令：

```
npm config set prefix "D:\Program Files\nodejs\node_global"
npm config set cache "D:\Program Files\nodejs\node_cache"
```

2. 修改环境变量

   配置npm的环境变量和nodejs的环境变量。在计算机图标上点右键，选属性，然后点击高级系统配置，弹出来的新窗口右下角有个环境路径，点击去，就能看到环境路径的配置界面，我们点击新建。然后在弹出来的窗口里，变量名填：NODE_PATH

   获取

   变量值填：D:\Program Files\nodejs\node_modules\
   点击确定

   编辑Path变量

   找到npm项修改为D:\Program Files\nodejs\node_global\

3. 修改仓库地址

   命令:

   ```shell
   npm install -g cnpm --registry=https://registry.npm.taobao.org
   
   //或者
   npm config set registry https://registry.npm.taobao.org
   /*
   registry_url指的是国内提供的一些npm仓库地址，常用的有：
   
   https://registry.npm.taobao.org
   
   http://r.cnpmjs.org/
   */
   ```

   

**npm常用的命令：**

1. 安装包（如果没有指定版本号，那么安装最新版本）

　　`npm install -g 包名称（全局安装）`

　　`npm install包名称（本地安装）`

2. 安装包的时候可以指定版本

　　`npm install -g 包名称@版本号`

3. 卸载包

　　`npm uninstall -g 包名称`

4. 更新包（更新到最新版本）

　　`npm update -g 包名称`

5. 查看全局模块列表

   `npm list -g`

6. 查看包所依赖的Node的版本 

   ` npm view 包名称 engines`

7. 卸载node模块

   `npm uninstall 包名称`

8. 更新node模块

   `npm uninstall 包名称`

9. 查看包源文件地址

   `npm view 包名称 repository.url`

开发环境（平时开发使用的环境）

生产环境（项目部署上线之后的服务器环境）

--save 向生产环境添加依赖 dependencies

--save-dev 向开发环境添加依赖 devDependencies

***区别：***

npm install xxx 安装到项目目录的node_modules文件夹下，但是不会添加任何依赖（依赖写在package.json文件中）

npm install xxx -g 全局安装，安装到你安装npm的磁盘目录下

npm install xxx --save 安装到项目目录的node_modules文件夹下，添加到dependencies的依赖下（生产环境中：项目发布到服务器上必须要使用的包）

npm install xxx --save-dev 安装到项目目录的node_modules文件夹下，添加到devdependencies的依赖下（开发环境中：测试、管理，只在程序员模式下需要）



| npm init                            | 初始化一个简单的package.json文件，执行该命令后终端会依次询问 name, version, description 等字段 |
| ----------------------------------- | ------------------------------------------------------------ |
| npm init --yes\|-y                  | 作用同上，偷懒不用一直按enter                                |
| npm inistall packageName            | 本地安装，安装到项目目录下，不在package.json中写入依赖       |
| npm inistall packageName -g         | 全局安装，安装在Node安装目录下的node_modules下               |
| npm inistall packageName --save     | 安装到项目目录下，并在package.json文件的dependencies中写入依赖，简写为-S（从开发到上线都需要用到的包） |
| npm inistall packageName --save-dev | 安装到项目目录下，并在package.json文件的devDependencies中写入依赖，简写为-D（工具包，上线时不需要使用） |

#### 测试Node运行情况

> 目录A下新建app.js文件

app.js

```js
console.log('hello node')
```

然后在命令行中执行

```shell
 node app.js
```

查看结果



#### 测试npm环境

cmd

```shell
npm init
```

```
package name:                     你的项目名字
version:                          版本号
description:                      对项目的描述
entry point:                      项目的入口文件（一般你要用那个js文件作为node服务，就填写那个文件）
test command:                     项目启动的时候要用什么命令来执行脚本文件（默认为node app.js）
git repository:                    如果你要将项目上传到git中的话，那么就需要填写git的仓库地址（这里就不写地址了）
keywirds：                       项目关键字
author:                         作者的名字
license:                        发行项目需要的证书
```

生成package.json文件



```json
//package.json
{
  "name": "node-demo",
  "version": "1.0.0",
  "description": "我的第一个node项目",
  "main": "app.js",
  "dependencies": {
  },
  "devDependencies": {},
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node app.js",          //自定义命令
    "sass-compiler": "node-sass --watch src/scss/input.scss dist/css/output.css" //监听sass文件实时编译
  },
  "author": "海牙",
  "license": "ISC"
}
```



```
npm start
```



### npm/node运行问题汇总

1. cmd运行npm命令或者node命令出现如下 "operation not permitted" 不容许操作提示的时候 说明权限不够, 需要**关闭cmd窗口 然后找到cmd.exe文件 右键以管理员权限运行** 重新输入命令

![image-20201022151317161](assets/image-20201022151317161.png)

2. powerShell 和 vscode中的终端运行 如果出现类似 **系统进制运行脚本** 的问题 需要修改权限

![image-20201022150850236](assets/image-20201022150850236.png)

运行命令

```shell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

3. node 命令运行 某个js文件  出现 cannot find module 报错 说明 对应文件不在当前命令路径下

![image-20201022204554089](assets/image-20201022204554089.png)

4. 修改环境变量或者某某配置之后 

   win7 重启电脑 win10 关闭当前cmd窗口 或者powerShell窗口 修改好变量之后 重新打开一个cmd或者powerShell终端

5.   无法将“xxx”项识别为 cmdlet、函数、脚本文件或可运行程序的名称。请检查名称的拼写，如果包括路径，请确保路径正确，

   ![image-20201022205208099](assets/image-20201022205208099.png)

   1. 没有安装对应模块
   2. 没有配置好环境变量
      1. 安装node的时候没有选择默认路径 然后也没有配置node安装路径对应环境变量
      2. 安装了node在默认路径下 修改了npm的npm config set prefix 和 cache 没有配置对应地址的环境变量
   3.  vscode不是用的正常安装版 vscode本身的环境变量有问题 或者 vscode 没有管理员权限 => 卸载重装

6.  执行xxx模块命令的时候报错  xxx 不是内部命令 不是外部命令

   1. 没有权限 
   2. 没有配置对应的npm环境变量

7.  安装node的时候 出现 2503 安装问题

   解决方案: cmd 到对应安装包文件夹下 运行命令 msiexec /package 安装包名字

   ![image-20201022205637012](assets/image-20201022205637012.png)

## NodeJs Event Loop

### javascript单线程非阻塞

> 我们都知道javascript Node 都是单线程 

阻塞模式图: 

如果某个任务很耗时，比如涉及很多I/O（输入/输出）操作，那么线程的运行大概是下面的样子。

绿色部分是程序的运行时间，红色部分是等待时间。可以看到，由于I/O操作很慢，所以这个线程的大部分运行时间都在空等I/O操作的返回结果。这种运行方式称为堵塞模式（blocking I/O）。

![synchronous mode](./assets/2013102002.png)

如果采用多线程，同时运行多个任务，那很可能就是下面这样。

![synchronous mode](./assets/2013102003.png)

上图表明，多线程不仅占用多倍的系统资源，也闲置多倍的资源，这显然不合理。

Event Loop就是为了解决这个问题而提出的。WIKI上这样定义：

```
"Event Loop是一个程序结构，用于等待和发送消息和事件。（a programming construct that waits for and dispatches events or messages in a program.）"
```

简单说，就是在程序中设置两个线程：一个负责程序本身的运行，称为"主线程"；另一个负责主线程与其他进程（主要是各种I/O操作）的通信，被称为"Event Loop线程"（可以译为"消息线程"）。



![asynchronous mode](./assets/2013102004.png)

### Event Loop是什么



![Event Loop](./assets/bg2014100802.png)

**event loop是一个执行模型，在不同的地方有不同的实现。浏览器和NodeJS基于不同的技术实现了各自的Event Loop。**

- 浏览器的Event Loop是在[html5的规范](https://www.w3.org/TR/html5/webappapis.html#event-loops)中明确定义。
- NodeJS的Event Loop是基于libuv实现的。可以参考Node的[官方文档](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)以及libuv的[官方文档](http://docs.libuv.org/en/v1.x/design.html)。
- libuv已经对Event Loop做出了实现，而HTML5规范中只是定义了浏览器中Event Loop的模型，具体的实现留给了浏览器厂商。

### 宏队列和微队列

**宏队列，macrotask，也叫tasks。** 一些异步任务的回调会依次进入macro task queue，等待后续被调用，这些异步任务包括：

- setTimeout
- setInterval
- setImmediate (Node独有)**一般来应用指定任务的优先级**
- requestAnimationFrame (浏览器独有)
- I/O => ajax DOM操作
- UI rendering (浏览器独有)

**微队列，microtask，也叫jobs。** 另一些异步任务的回调会依次进入micro task queue，等待后续被调用，这些异步任务包括：

- process.nextTick (Node独有)**一般来应用指定任务的优先级**
- Promise
- Object.observe
- MutationObserver

（注：这里只针对浏览器和NodeJS）

**案例：宏队列和微队列的执行情况**   判断微队列和宏队列的执行=循序的时候**一定一定**要看回调函数是关键

```js
console.log(1); //1 log1
setTimeout(() => { //2 set1  
  console.log(2); //macro 1 log11 2
  Promise.resolve().then(() => {
    //pro2
    console.log(3)
  });
});
new Promise((resolve, reject) => { //3 pro1
  console.log(4) //注意: 直接执行 promise的 then catch
  resolve(5)
}).then((data) => {
  //mircro1
  console.log(data);
})
setTimeout(() => { //4 set2
  console.log(6);
})
console.log(7); // 5 log2

/*
 Stack: [log1,set1,pro1,log4,set2,log2]
 mircroTask: [pro1Callback]
 macroTask: [set1Callback,set2Callback]

 1 4 7

 Stack: [pro1Callback]
 mircroTask: []
 macroTask: [set1Callback,set2Callback]

 5

 Stack: [set1Callback]
 mircroTask: [pro2Callback]
 macroTask: [set2Callback]

 2

 Stack: [pro2Callback]
 mircroTask: []
 macroTask: [set2Callback]

 3

 Stack: [set2Callback]
 mircroTask: []
 macroTask: []

 6

 Stack: []
 mircroTask: []
 macroTask: []
*/
```



### 浏览器的Event Loop

	>**node版本之间的差异：**
	>
	>**node11以前：宏队列优先级比微队列优先级高**
	>
	0>0**node11以后（包括11）：微队列比宏队列优先级高**（现代使用的版本）





![browser-eventloop](./assets/1271505701-5a659863bb046_articlex-1603534210595.png)

这张图将浏览器的Event Loop完整的描述了出来，我来讲执行一个JavaScript代码的具体流程：

1. 执行全局Script同步代码，这些同步代码有一些是同步语句，有一些是异步语句（比如setTimeout等）；
2. 全局Script代码执行完毕后，调用栈Stack会清空；
3. 从微队列microtask queue中取出位于队首的回调任务，放入调用栈Stack中执行，执行完后microtask queue长度减1；
4. 继续取出位于队首的任务，放入调用栈Stack中执行，以此类推，直到直到把microtask queue中的所有任务都执行完毕。**注意，如果在执行microtask的过程中，又产生了microtask，那么会加入到队列的末尾，也会在这个周期被调用执行**；
5. microtask queue中的所有任务都执行完毕，此时microtask queue为空队列，调用栈Stack也为空；
6. 取出宏队列macrotask queue中位于队首的任务，放入Stack中执行；
7. 执行完毕后，调用栈Stack为空；
8. 重复第3-7个步骤；
9. 重复第3-7个步骤；
10. ......

**可以看到，这就是浏览器的事件循环Event Loop**

这里归纳3个重点：

1. 宏队列macrotask一次只从队列中取一个任务执行，执行完后就去执行微任务队列中的任务；
2. 微任务队列中所有的任务都会被依次取出来执行，知道microtask queue为空；
3. 图中没有画UI rendering的节点，因为这个是由浏览器自行判断决定的，但是只要执行UI rendering，它的节点是在执行完所有的microtask之后，下一个macrotask之前，紧跟着执行UI render。

经典任务例题: 求打印顺序

```js
console.log(1);

setTimeout(() => {
  console.log(2);
  Promise.resolve().then(() => {
    console.log(3)
  });
});

new Promise((resolve, reject) => {
  console.log(4)
  resolve(5)
}).then((data) => {
  console.log(data);
})

setTimeout(() => {
  console.log(6);
})

console.log(7);

//1 4 7  5 2 3 6
```

经典任务例题: 求打印顺序

(注意的是下面的8和9他們的层级不同 9是在第一层，八是在第三层  所以9比8前)

```js
console.log(1);

setTimeout(() => {
  console.log(2);
  Promise.resolve().then(() => {
    console.log(3)
  });
});

new Promise((resolve, reject) => {
  console.log(4)
  resolve(5)
}).then((data) => {
  console.log(data);
  
  Promise.resolve().then(() => {
    console.log(6)
  }).then(() => {
    console.log(7)
    
    setTimeout(() => {
      console.log(8)
    }, 0);
  });
})

setTimeout(() => {
  console.log(9);
})

console.log(10);
```

重点: **在执行微队列microtask queue中任务的时候，如果又产生了microtask，那么会继续添加到队列的末尾，也会在这个周期执行，直到microtask queue为空停止。**



![img](./assets/73a678d56c2d45bfa07ac7745be1e578_tplv-k3u1fbpfcp-zoom-1.image)

### Nodejs 11 之前的EventLoop机制

#### libuv Node核心跨平台异步IO库

![node-libuv](./assets/1129945342-58b66e688fc3e_articlex.png)



（1）V8引擎解析JavaScript脚本。

（2）解析后的代码，调用Node API。

（3）[libuv库](https://github.com/joyent/libuv)负责Node API的执行。它将不同的任务分配给不同的线程，形成一个Event Loop（事件循环），以异步的方式将任务的执行结果返回给V8引擎。

（4）V8引擎再将结果返回给用户。

除了setTimeout和setInterval这两个方法，Node.js还提供了另外两个与"任务队列"有关的方法：[process.nextTick](http://nodejs.org/docs/latest/api/process.html#process_process_nexttick_callback)和[setImmediate](http://nodejs.org/docs/latest/api/timers.html#timers_setimmediate_callback_arg)。它们可以帮助我们加深对"任务队列"的理解。

**process.nextTick方法可以在当前"执行栈"的尾部----下一次Event Loop（主线程读取"任务队列"）之前----触发回调函数。也就是说，它指定的任务总是发生在所有异步任务之前。setImmediate方法则是在当前"任务队列"的尾部添加事件，也就是说，它指定的任务总是在下一次Event Loop时执行，这与setTimeout(fn, 0)很像。。**



#### NodeJS中的宏队列和微队列

NodeJS的Event Loop中，执行宏队列的回调任务有**6个阶段**，如下图：

![node-eventloop-6phase](./assets/2673283235-5b8f73ef670c4_articlex.png)

各个阶段执行的任务如下：

- **timers阶段**：这个阶段执行setTimeout和setInterval预定的callback
- **I/O callback阶段**：执行除了close事件的callbacks、被timers设定的callbacks、setImmediate()设定的callbacks这些之外的callbacks
- **idle, prepare阶段**：仅node内部使用
- **poll阶段：获取新的I/O事件**，适当的条件下node将阻塞在这里
- **check阶段**：执行setImmediate()设定的callbacks
- **close callbacks阶段**：执行socket.on('close', ....)这些callbacks

**NodeJS中宏队列主要有4个**

由上面的介绍可以看到，回调事件主要位于4个macrotask queue中：

1. Timers Queue
   1. IO Callbacks Queue

2. Check Queue
3. Close Callbacks Queue

这4个都属于宏队列，但是在浏览器中，可以认为只有一个宏队列，所有的macrotask都会被加到这一个宏队列中，但是在NodeJS中，不同的macrotask会被放置在不同的宏队列中。

**NodeJS中微队列主要有2个**：

1. Next Tick Queue：是放置process.nextTick(callback)的回调任务的
2. Other Micro Queue：放置其他microtask，比如Promise等

在浏览器中，也可以认为只有一个微队列，所有的microtask都会被加到这一个微队列中，但是在NodeJS中，不同的microtask会被放置在不同的微队列中。

具体可以通过下图加深一下理解：

![node-eventloop](./assets/3421275730-5b0e9a1df0600_articlex.png)

大体解释一下NodeJS的Event Loop过程：

1. 执行全局Script的同步代码
2. 执行microtask微任务，先执行所有Next Tick Queue中的所有任务，再执行Other Microtask Queue中的所有任务
3. 开始执行macrotask宏任务，共6个阶段，从第1个阶段开始执行相应每一个阶段macrotask中的所有任务，注意，这里是所有每个阶段宏任务队列的所有任务，在浏览器的Event Loop中是只取宏队列的第一个任务出来执行，每一个阶段的macrotask任务执行完毕后，开始执行微任务，也就是步骤2
4. Timers Queue -> 步骤2 -> I/O Queue -> 步骤2 -> Check Queue -> 步骤2 -> Close Callback Queue -> 步骤2 -> Timers Queue ......
5. 这就是Node的Event Loop



简单概述 Node 11版本之前 任务分配是 先执行全局Script代码，执行完同步代码调用栈清空后，先从微任务队列Next Tick Queue中依次取出所有的任务放入调用栈中执行，再从微任务队列Other Microtask Queue中依次取出所有的任务放入调用栈中执行。然后开始宏任务的6个阶段，每个阶段都将该宏任务队列中的所有任务都取出来执行（注意，这里和浏览器不一样，浏览器只取一个），每个宏任务阶段执行完毕后，开始执行微任务，再开始执行下一阶段宏任务，以此构成事件循环。



1. MacroTask包括： setTimeout、setInterval、 setImmediate(Node)、requestAnimation(浏览器)、IO、UI rendering
2. Microtask包括： process.nextTick(Node)、Promise、Object.observe、MutationObserver

```js
setTimeout(() => {
  console.log('t1');
  Promise.resolve().then(function() {
    console.log('p1');
  });
}, 0);

setTimeout(() => {
  console.log('t2');
  Promise.resolve().then(function() {
    console.log('p2');
  });
}, 0);


//node 10运行结果
//t1
//t2
//p1
//p2
```

### Node11 EventLoop机制

> 与浏览器相统一  

Node11之后，也是每个 Macrotask 执行完后，就去执行 Microtask 了，和浏览器的模型一致。
![node队列](./assets/690666428-5ab0a22b5cbca_articlex.png)

```js
setTimeout(() => {
  console.log('t1');
  Promise.resolve().then(function() {
    console.log('p1');
  });
}, 0);

setTimeout(() => {
  console.log('t2');
  Promise.resolve().then(function() {
    console.log('p2');
  });
}, 0);


//node 11运行结果
//t1
//p1
//t2
//p2
```



### Node任务队列方法

> [process.nextTick](http://nodejs.org/docs/latest/api/process.html#process_process_nexttick_callback)和[setImmediate](http://nodejs.org/docs/latest/api/timers.html#timers_setimmediate_callback_arg)。它们可以帮助我们加深对"任务队列"的理解。

process.nextTick方法可以在当前"执行栈"的尾部----下一次Event Loop（主线程读取"任务队列"）之前----触发回调函数。也就是说，它指定的任务总是发生在所有异步任务之前。setImmediate方法则是在当前"任务队列"的尾部添加事件，也就是说，它指定的任务总是在下一次Event Loop时执行，这与setTimeout(fn, 0)很像。

```js
process.nextTick(function A() {
  console.log(1);
  process.nextTick(function B(){console.log(2);});
});

setTimeout(function timeout() {
  console.log('TIMEOUT FIRED');
}, 0)
// 1
// 2
// TIMEOUT FIRED
```

上面代码中，由于process.nextTick方法指定的回调函数，总是在当前"执行栈"的尾部触发，所以不仅函数A比setTimeout指定的回调函数timeout先执行，而且函数B也比timeout先执行。这说明，如果有多个process.nextTick语句（不管它们是否嵌套），将全部在当前"执行栈"执行。

现在，再看setImmediate。

```javascript
 setImmediate(function A() {
  console.log(1);
   setImmediate(function B(){console.log(2);});
 });
 
 setTimeout(function timeout() {
   console.log('TIMEOUT FIRED');
 }, 0);
```

上面代码中，setImmediate与setTimeout(fn,0)各自添加了一个回调函数A和timeout，都是在下一次Event Loop触发。那么，哪个回调函数先执行呢？答案是不确定。运行结果可能是1--TIMEOUT FIRED--2，也可能是TIMEOUT FIRED--1--2。

Node.js文档中称，setImmediate指定的回调函数，总是排在setTimeout前面。实际上，这种情况只发生在递归调用的时候。

```javascript
 setImmediate(function (){
   setImmediate(function A() {
     console.log(1);
     setImmediate(function B(){
         console.log(2);
     });
   });
 
   setTimeout(function timeout() {
     console.log('TIMEOUT FIRED');
   }, 0);
 });
 // 1
 // TIMEOUT FIRED
 // 2
```

上面代码中，setImmediate和setTimeout被封装在一个setImmediate里面，它的运行结果总是1--TIMEOUT FIRED--2，这时函数A一定在timeout前面触发。至于2排在TIMEOUT FIRED的后面（即函数B在timeout后面触发），是因为setImmediate总是将事件注册到下一轮Event Loop，所以函数A和timeout是在同一轮Loop执行，而函数B在下一轮Loop执行。

我们由此得到了process.nextTick和setImmediate的一个重要区别：多个process.nextTick语句总是在当前"执行栈"一次执行完，多个setImmediate可能则需要多次loop才能执行完。事实上，这正是Node.js 10.0版添加setImmediate方法的原因，否则像下面这样的递归调用process.nextTick，将会没完没了，主线程根本不会去读取"事件队列"！

```javascript
 process.nextTick(function foo() {
   process.nextTick(foo);
 });
```

事实上，现在要是你写出递归的process.nextTick，Node.js会抛出一个警告，要求你改成setImmediate。

另外，由于process.nextTick指定的回调函数是在本次"事件循环"触发，而setImmediate指定的是在下次"事件循环"触发，所以很显然，前者总是比后者发生得早，而且执行效率也高（因为不用检查"任务队列"）。



### 关于同步/异步 阻塞/非阻塞

> 单纯从nodejs角度来讲一下同步(Synchronous)异步(Asynchronous)  阻塞(Blocking) 非阻塞 (Nonblocking)的概念

这两组概念很容易混淆, 不过本课程不探讨系统级IO 只在Nodejs基础上进行抽象区分

#### 同步 异步

同步异步关心的是消息的通知方式

同步: 当发起一个调用(请求)的时候, 没有取得反馈(结果)之前, 调用不会返回, 直到取得结果。 一次只做一件事 做完在做下一件

异步:  当发起一个调用(请求)的时候, 没有取得反馈(结果)之前, 调用就返回了, 调用者不会立刻得到结果, 而是等待被调用者通知调用者,通过回调函数等方式处理结果

**ps**

> 代码异步回调的本质是执行回调函数。

**案例**

```js
    console.log("1")
    setTimeout(() => {
      console.log("set");
    })
    
    new Promise((resolve, reject) => {
      console.log("2");
      resolve("pro")
    }).then(res => console.log(res))
    console.log("3")

//打印的顺序是1 2 3 pro set

//为什么2在3的前面，这里就要理解什么是异步原理在 浏览器的Event loop中进入任务队列的是回调函数，那么就可以理解为 回调函数才是异步的实现  
//而上面的setTimeout 这个方法是同步的  只有里面的回调函数才是异步
// Promise同理  所以打印2
```



#### 阻塞 非阻塞

阻塞非阻塞关注的是等待结果(返回值)时的状态

阻塞: 在等待结果的过程中, 不能干其他事, 线程被挂起, 知道结果返回

非阻塞: 在等待结果的过程中, 还能干其他事, 线程不会被阻塞



同步和异步是被调用方决定的, 决定马上给你结果 还是过会通知你 给你结果

阻塞与非阻塞是调用方决定的, 在等待结果的过程中, 是否可以做其他的事情

## Nodejs 模块

> 为了让Node.js的文件可以相互调用，Node.js提供了一个简单的模块系统。
>
> **模块是Node.js 应用程序的基本组成部分**，文件和模块是一一对应的。换言之，一个 Node.js 文件就是一个模块，这个文件可能是JavaScript 代码、JSON 或者编译过的C/C++ 扩展。

### Nodejs 模块的基本规则

>/*
>  require
>
>````js
>[Function: require] {
>  resolve: [Function: resolve] { paths: [Function: paths] },
>  main: Module {
>    id: '.',
>    path: '/Users/zhengkexiang/Desktop/VUE3/project/node/day01',
>    exports: {},
>    parent: null,
>    filename: '/Users/zhengkexiang/Desktop/VUE3/project/node/day01/app.js',
>    loaded: false,
>    children: [],
>    paths: [
>      '/Users/zhengkexiang/Desktop/VUE3/project/node/day01/node_modules',
>      '/Users/zhengkexiang/Desktop/VUE3/project/node/node_modules',
>      '/Users/zhengkexiang/Desktop/VUE3/project/node_modules',
>      '/Users/zhengkexiang/Desktop/VUE3/node_modules',
>      '/Users/zhengkexiang/Desktop/node_modules',
>      '/Users/zhengkexiang/node_modules',
>      '/Users/node_modules',
>      '/node_modules'
>    ]
>  },
>  extensions: [Object: null prototype] {
>    '.js': [Function (anonymous)],
>    '.json': [Function (anonymous)],
>    '.node': [Function (anonymous)]
>  },
>  cache: [Object: null prototype] {
>    '/Users/zhengkexiang/Desktop/VUE3/project/node/day01/app.js': Module {
>      id: '.',
>      path: '/Users/zhengkexiang/Desktop/VUE3/project/node/day01',
>      exports: {},
>      parent: null,
>      filename: '/Users/zhengkexiang/Desktop/VUE3/project/node/day01/app.js',
>      loaded: false,
>      children: [],
>      paths: [Array]
>    }
>  }
>}
>````
>
>
>
>  1. require.main 入口文件 主程入口  入口模c块(文件) 的 module对象
> 2.   当前模块(文件) 的模块对象
>
>````js
>	console.log(module)
>
>Module {
>    id: '.', // 当前文件则用.表示。  如果获取子文件时是子文件的路径名
>    path: '/Users/zhengkexiang/Desktop/VUE3/project/node/day01', // 当前文件的文件夹位置
>    exports: {}, // 引入文件 module.exports  导出的数据
>    parent: null,
>    filename: '/Users/zhengkexiang/Desktop/VUE3/project/node/day01/app.js',// 当前主入口的路径（就是node在终端执行的模块的文件路径）
>    loaded: false,  // 文件 是否正在加载
>    children: [], // require 引入的文件
>    paths: [ // node_modules 查找顺序
>        '/Users/zhengkexiang/Desktop/VUE3/project/node/day01/node_modules',
>        '/Users/zhengkexiang/Desktop/VUE3/project/node/node_modules',
>        '/Users/zhengkexiang/Desktop/VUE3/project/node_modules',
>        '/Users/zhengkexiang/Desktop/VUE3/node_modules',
>        '/Users/zhengkexiang/Desktop/node_modules',
>        '/Users/zhengkexiang/node_modules',
>        '/Users/node_modules',
>        '/node_modules'
>    ]
>}
>````
>
>  1. require.main 与 module 一致
>
>  2. __filename 当前模块(文件) 的文件名 等同于 module.filename   f:\node\day6\app.js
>    __dirname 当前模块的目录名    f:\node\day6
>  3. require() 传参模块路径/模块名称 如果没有写任何路径符 '/' '../' './' require默认模块寻址目录为 	     root/node_modules文件夹中寻找
>     a. 如果默认root/node_modules  寻找的文件有多级目录 则要在它的文件当前目录配置package.json文件
>     b. 不管是否是主模块都适用这条规则
>  4. **require() 参数直接指定某个文件夹 而非文件的时候 会默认将文件夹内的 index.js 作为模块文件  如              foo/index.js**
>
> 6.require 导入自定义模块名称如果与原生node内置模块冲突 优先使用node内置模块
>
> 7. require('./foo')
>    1. root 根目录下的 foo.js
>    2. root 根目录下的 foo 文件夹里 找package.json 里面 的 main 属性的值 对应的文件作为 模块文件
>    3. root 根目录下的 foo 文件夹 里的 index.js
>
>*/
>
>**注意事项**
>
>````js
>exports
>// 写法
>module.exports = { }
>// 或者
>exports.x = {}
>// 不可以 写
>exports = {} // 会改变内存指向
>// 相当于给一个隐式声明的变量 exports 赋值 {a:1,b:2}
>// 每个文件模块 会有一行隐式代码 如下
>let exports = module.exports // 对象 赋值给变量 引用关系
>
>exports.a = 10; // module.exports.a = 10
>
>**exports = {}; // 内存中 exports的地址不再指向 module.exports 而是指向一个新的 地址 这就切断了 exports变量与module.exports 的引用关系**
>````
>
>

Nodejs使用commonjs规范作为模块化标准, 每个文件都被视为一个独立的模块。

### 主模块（就是node执行的模块  一般都是app.js 自己所建的文件）

> **当 Node.js 直接运行一个文件时**， `require.main` 会被设为它的 `module`。 这意味着可以通过 `require.main === module` 来判断一个文件是否被直接运行：

对于 `xx.js` 文件，如果通过 `node xx.js` 运行则为 `true`，但如果通过 `require('./xx')` 运行则为 `false`。

因为 `module` 提供了一个 `filename` 属性（通常等同于 `__filename`），所以可以通过检查 `require.main.filename` 来获取当前应用程序的入口点。



### 加载目录顺序

> 如果传递给 `require()` 的模块标识符不是一个`核心模块`，也没有以 `'/'` 、 `'../'` 或 `'./'` 开头，则 Node.js 会从当前模块的父目录开始，尝试从它的 `/node_modules` 目录里加载模块。 Node.js 不会附加 `node_modules` 到一个已经以 `node_modules` 结尾的路径上。
>
> 如果还是没有找到，则移动到再上一层父目录，直到文件系统的根目录。

如果在 `'/home/ry/projects/foo.js'` 文件里调用了 `require('bar.js')`，则 Node.js 会按以下顺序查找：

- `/home/ry/projects/node_modules/bar.js`
- `/home/ry/node_modules/bar.js`
- `/home/node_modules/bar.js`
- `/node_modules/bar.js`

这使得程序本地化它们的依赖，避免它们产生冲突。

通过在模块名后包含一个路径后缀，可以请求特定的文件或分布式的子模块。 例如， `require('example-module/path/to/file')` 会把 `path/to/file` 解析成相对于 `example-module` 的位置。 后缀路径同样遵循模块的解析语法。

### 缓存

​	模块在第一次加载后会被缓存。 这也意味着（类似其他缓存机制）如果每次调用 `require('foo')` 都解析到同一文件，则返回相同的对象。

多次调用 `require(foo)` 不会导致模块的代码被执行多次。 这是一个重要的特性。 借助它, 可以返回“部分完成”的对象，从而允许加载依赖的依赖, 即使它们会导致循环依赖。

如果想要多次执行一个模块，可以导出一个函数，然后调用该函数。

#### 模块缓存的注意事项

​	模块是基于其解析的文件名进行缓存的。 由于调用模块的位置的不同，模块可能被解析成不同的文件名（比如从 `node_modules` 目录加载），这样就不能保证 `require('foo')` 总能返回完全相同的对象。

​	此外，在不区分大小写的文件系统或操作系统中，被解析成不同的文件名可以指向同一文件，但缓存仍然会将它们视为不同的模块，并多次重新加载。 例如， `require('./foo')` 和 `require('./FOO')` 返回两个不同的对象，而不会管 `./foo` 和 `./FOO` 是否是相同的文件。

### 核心模块

Node.js 有些模块会被编译成二进制。 这些模块别的地方有更详细的描述。

核心模块定义在 Node.js 源代码的 `lib/` 目录下。

`require()` 总是会优先加载核心模块。 例如， `require('http')` 始终返回内置的 HTTP 模块，即使有同名文件。

### 模块作用域

#### __dirname

当前模块的目录名。 相当于 __filename 的 `path.dirname()`

示例，从 `/Users/mjr` 运行 `node example.js`：

```js
console.log(__dirname);
// 打印: /Users/mjr
console.log(path.dirname(__filename));
// 打印: /Users/mjr
```

#### process.cwd() 

方法会返回 Node.js 进程的当前工作目录。 

process.cwd()返回当前工作目录。如：调用node命令执行脚本时的目录。

 __dirname返回源代码所在的目录。

eg：对于d:\dir\index.js。

```
console.log(`cwd: ${process.cwd()}`);
console.log(`dirname: ${__dirname}`);
```

| 命令              | process.cwd() | __dirname |
| ----------------- | ------------- | --------- |
| node index.js     | d:\dir        | d:\dir    |
| node dir\index.js | d:            | d:\dir    |

#### __filename

当前模块的文件名。 这是当前的模块文件的绝对路径（符号链接会被解析）。

对于主程序，这不一定与命令行中使用的文件名相同。

有关当前模块的目录名，参见 `__dirname`

示例：

从 `/Users/mjr` 运行 `node example.js`：

```js
console.log(__filename);
// 打印: /Users/mjr/example.js
console.log(__dirname);
// 打印: /Users/mjr
```

给定两个模块：`a` 和 `b`，其中 `b` 是 `a` 的依赖文件，且目录结构如下：

- `/Users/mjr/app/a.js`
- `/Users/mjr/app/node_modules/b/b.js`

`b.js` 中的 `__filename` 的引用会返回 `/Users/mjr/app/node_modules/b/b.js`，而 `a.js` 中的 `__filename` 的引用会返回 `/Users/mjr/app/a.js`。

#### exports

这是一个对于 `module.exports` 的更简短的引用形式。

`exports` 变量是在模块的文件级作用域内可用的，且在模块执行之前赋值给 `module.exports`。

它允许使用快捷方式，因此 `module.exports.f = ...` 可以更简洁地写成 `exports.f = ...`。 但是，就像任何变量一样，如果为 `exports` 赋予了新值，则它将不再绑定到 `module.exports`：

```js
module.exports.hello = true; // 从模块的引用中导出。
exports = { hello: false };  // 不导出，仅在模块中可用。
```

当 `module.exports` 属性被新对象完全替换时，通常也会重新赋值 `exports`：

```js
module.exports = exports = function Constructor() {
  // ... 
};
```

为了说明这种行为，想象对 `require()` 的假设实现，它与 `require()` 的实际实现非常类似：

```js
function require(/* ... */) {
  const module = { exports: {} };
  ((module, exports) => {
    // 模块代码在这。在这个例子中，定义了一个函数。
    function someFunc() {}
    exports = someFunc;
    // 此时，exports 不再是一个 module.exports 的快捷方式，
    // 且这个模块依然导出一个空的默认对象。
    module.exports = someFunc;
    // 此时，该模块导出 someFunc，而不是默认对象。
  })(module, module.exports);
  return module.exports;
}
```

#### module

在每个模块中， `module` 的自由变量是对表示当前模块的对象的引用。 为方便起见，还可以通过全局模块的 `exports` 访问 `module.exports`。 **`module` 实际上不是全局的，而是每个模块本地的**。

```json
//module对象
{
    id:'模块的标识符。 通常是完全解析后的文件名',
    filename:'模块的完全解析后的文件名',
    loaded:'模块是否已经加载完成，或正在加载中',
    path:'模块的目录名称',
    paths:'模块的搜索路径',
    exports:'导出的模块内容'
}
```

#### require(ID)

> 用于引入模块、 `JSON`、或本地文件。 可以从 `node_modules` 引入模块。 可以使用相对路径（例如 `./`、 `./foo`、 `./bar/baz`、 `../foo`）引入本地模块或 JSON 文件，路径会根据 `__dirname` 定义的目录名或当前工作目录进行处理。 POSIX 风格的相对路径会以与操作系统无关的方式解析，这意味着上面的示例将会在 Windows 上以与在 Unix 系统上相同的方式工作。

##### require.cache（缓存module对象 就是模块的module信息）

被引入的模块将被缓存在这个对象中。 从此对象中删除键值对将会导致下一次 `require` 重新加载被删除的模块。 这不适用于原生插件，因为它们的重载将会导致错误。

可以添加或替换入口。 在加载原生模块之前会检查此缓存，如果将与原生模块匹配的名称添加到缓存中，则引入调用将不再获取原生模块。 谨慎使用！





##### require.main

表示当 Node.js 进程启动时加载的入口脚本

##### require.resolve(request[, options])

```
request <string> 需要解析的模块路径。
options <Object>
paths <string[]> 从中解析模块位置的路径。 如果存在，则使用这些路径而不是默认的解析路径，但 GLOBAL_FOLDERS 除外，例如 $HOME/.node_modules，它们总是包含在内。 这些路径中的每一个都用作模块解析算法的起点，这意味着从该位置开始检查 node_modules 层次结构。
返回: <string>
使用内部的 require() 机制查询模块的位置，此操作只返回解析后的文件名，不会加载该模块。

如果找不到模块，则会抛出 MODULE_NOT_FOUND 错误。
```

##### require.resolve.paths(request)

```
request <string> 被查询解析路径的模块的路径。
返回: <string[]> | <null>
返回一个数组，其中包含解析 request 过程中被查询的路径，如果 request 字符串指向核心模块（例如 http 或 fs）则返回 null。
```

#### 案例

```js
// 判断是否为主模块   主入口文件
// console.log(require.main === module)
// console.dir(module)

// 主调用接口 
// require.main.filenmae 返回的是模块的主入口 就是node在终端执行的模块的文件路径
//如果node执行的是 app.js 则返回他的绝对路径 必须要到别的模块执行
// 当前打印的undefined 

// __filename
// 返回的是当前执行的模块的绝对路径
// console.log(require.main.filenmae,__filename)
// 打印当前模块的基本信息
// console.dir(module)
// 当前模块的目录名
// console.log(__dirname)
// 打印缓存对象
// console.log(require.cache)

// console.log(module);
// Module {
//   id: 'f:\\node\\day6\\node_modules\\sty\\foo2.js',
//   path: 'f:\\node\\day6\\node_modules\\sty',
//   exports: {},
//   parent: [Circular *1],
//   filename: 'f:\\node\\day6\\node_modules\\sty\\foo2.js',
//   loaded: true,
//   children: [],
//   paths: [Array]
// }
// 解析子模块的路径
// console.log(require.resolve(module.children[0].filename))
// console.log(require.resolve(module.children[0].id))
// 被查询解析路径的模块的路径。
console.log("======")
console.log(require.resolve.paths('foo'))
// 查询文件的路径优先级  从上往下
/*
  [
  'f:\\node\\day6\\node_modules',
  'f:\\node\\node_modules',
  'f:\\node_modules',
  'D:\\Program Files\\nodejs\\node_modules\\',
  'C:\\Users\\zheng\\.node_modules',
  'C:\\Users\\zheng\\.node_libraries',
  'C:\\Program Files\\nodejs\\lib\\node'
]
*/
```





## Nodejs 事件触发器 events模块

如果你在浏览器中使用 JavaScript，则你会知道通过事件处理了许多用户的交互：鼠标的单击、键盘按钮的按下、对鼠标移动的反应等等。

在后端，Node.js 也提供了使用`events`模块构建类似系统的选项。

具体上，此模块提供了 `EventEmitter` 类，用于处理事件。

使用以下代码进行初始化：

```javascript
const EventEmitter = require('events')
const eventEmitter = new EventEmitter()
```

该对象公开了 `on` 和 `emit` 方法。

- `emit` 用于触发事件。
- `on` 用于添加回调函数（会在事件被触发时执行）。

例如，创建 `start` 事件，并提供一个示例，通过记录到控制台进行交互：

```javascript
eventEmitter.on('start', () => {
  console.log('开始')
})
```

当运行以下代码时：

```javascript
eventEmitter.emit('start')
```

事件处理函数会被触发，且获得控制台日志。

可以通过将参数作为额外参数传给 `emit()` 来将参数传给事件处理程序：

```javascript
eventEmitter.on('start', number => {
  console.log(`开始 ${number}`)
})

eventEmitter.emit('start', 23)
```

多个参数：

```javascript
eventEmitter.on('start', (start, end) => {
  console.log(`从 ${start} 到 ${end}`)
})

eventEmitter.emit('start', 1, 100)
```

EventEmitter 对象还公开了其他几个与事件进行交互的方法，例如：

- `once()`: 添加单次监听器。
- `removeListener()` / `off()`: 从事件中移除事件监听器。
- `removeAllListeners()`: 移除事件的所有监听器。

### events

大多数 Node.js 核心 API 构建于惯用的异步事件驱动架构，其中某些类型的对象（又称触发器，Emitter）会触发命名事件来调用函数（又称监听器，Listener）。

例如，`net.Server`会在每次有新连接时触发事件，`fs.ReadStream`会在打开文件时触发事件，`stream`会在数据可读时触发事件。

所有能触发事件的对象都是 `EventEmitter` 类的实例。 这些对象有一个 `eventEmitter.on()` 函数，用于将一个或多个函数绑定到命名事件上。 事件的命名通常是驼峰式的字符串，但也可以使用任何有效的 JavaScript 属性键。。

当 `EventEmitter` 对象触发一个事件时，所有绑定在该事件上的函数都会被同步地调用。 被调用的监听器返回的任何值都将会被忽略并丢弃。

例子，一个简单的 `EventEmitter` 实例，绑定了一个监听器。 `eventEmitter.on()` 用于注册监听器， `eventEmitter.emit()` 用于触发事件。

```js
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
  console.log('触发事件');
});
myEmitter.emit('event');
```



#### 将参数和 this 传给监听器

`eventEmitter.emit()` 方法可以传任意数量的参数到监听器函数。 当监听器函数被调用时， `this` 关键词会被指向监听器所绑定的 `EventEmitter` 实例。

```js
const myEmitter = new MyEmitter();
myEmitter.on('event', function(a, b) {
  console.log(a, b, this, this === myEmitter);
  // 打印:
  //   a b MyEmitter {
  //     domain: null,
  //     _events: { event: [Function] },
  //     _eventsCount: 1,
  //     _maxListeners: undefined } true
});
myEmitter.emit('event', 'a', 'b');
```

也可以使用 ES6 的箭头函数作为监听器。但 `this` 关键词不会指向 `EventEmitter` 实例：

```js
const myEmitter = new MyEmitter();
myEmitter.on('event', (a, b) => {
  console.log(a, b, this);
  // 打印: a b {}
});
myEmitter.emit('event', 'a', 'b');
```



#### 异步 VS 同步

`EventEmitter` 以注册的顺序同步地调用所有监听器。 这样可以确保事件的正确排序，并有助于避免竞态条件和逻辑错误。 当适当时，监听器函数可以使用 `setImmediate()` 和 `process.nextTick()` 方法切换到异步的操作模式：

```js
const myEmitter = new MyEmitter();
myEmitter.on('event', (a, b) => {
  setImmediate(() => {
    console.log('异步地发生');
  });
});
myEmitter.emit('event', 'a', 'b');
```

#### 仅处理事件一次

当使用 `eventEmitter.on()` 注册监听器时，监听器会在每次触发命名事件时被调用。

```js
const myEmitter = new MyEmitter();
let m = 0;
myEmitter.on('event', () => {
  console.log(++m);
});
myEmitter.emit('event');
// 打印: 1
myEmitter.emit('event');
// 打印: 2
```

使用 `eventEmitter.once()` 可以注册最多可调用一次的监听器。 当事件被触发时，监听器会被注销，然后再调用。

```js
const myEmitter = new MyEmitter();
let m = 0;
myEmitter.once('event', () => {
  console.log(++m);
});
myEmitter.emit('event');
// 打印: 1
myEmitter.emit('event');
// 不触发
```

#### 错误事件

当 `EventEmitter` 实例出错时，应该触发 `'error'` 事件。 这些在 Node.js 中被视为特殊情况。

如果没有为 `'error'` 事件注册监听器，则当 `'error'` 事件触发时，会抛出错误、打印堆栈跟踪、并退出 Node.js 进程。

```js
const myEmitter = new MyEmitter();
myEmitter.emit('error', new Error('错误信息'));
// 抛出错误并使 Node.js 崩溃。
```

为了防止崩溃 Node.js 进程，可以使用 `domain` 模块。 （但请注意，不推荐使用 `domain` 模块。）

作为最佳实践，应该始终为 `'error'` 事件注册监听器。

```js
const myEmitter = new MyEmitter();
myEmitter.on('error', (err) => {
  console.error('错误信息');
});
myEmitter.emit('error', new Error('错误'));
// 打印: 错误信息
```



## Nodejs Path 路径系统模块

path 模块是 nodejs 中用于处理文件/目录路径的一个**内置模块**，可以看作是一个工具箱，提供诸多方法供我们使用，当然都是和路径处理有关的。同时在前端开发中 path 模块出现的频率也是比较高的，比如配置 webpack 的时候等。本文是对该模块中一些常用的方法进行介绍，走，一起学习下吧。

```js
const path = require('path')
```



### 关于 Windows 路径 与  POSIX 路径

> 在Unix世界中，最流行的应用编程接口是基于POSIX标准的。从纯技术的角度看，POSIX是由IEEE的一组标准组成，其目标是提供一套大体上基于Unix的可移植操作系统标准。Linux是与POSIX兼容的。

`path` 模块的默认操作会因 Node.js 应用程序运行所在的操作系统而异。 具体来说，当在 Windows 操作系统上运行时， `path` 模块会假定正被使用的是 Windows 风格的路径。

因此，使用 `path.basename()` 可能会在 POSIX 和 Windows 上产生不同的结果：

在 POSIX 上:

```js
path.basename('C:\\temp\\myfile.html');
// 返回: 'C:\\temp\\myfile.html'
```

在 Windows 上:

```js
path.basename('C:\\temp\\myfile.html');
// 返回: 'myfile.html'
```

如果要在任意操作系统上使用 Windows 文件路径时获得一致的结果，则使用 [`path.win32`](http://nodejs.cn/s/eH3AFM)：

在 POSIX 和 Windows 上:

```js
path.win32.basename('C:\\temp\\myfile.html');
// 返回: 'myfile.html'
```

如果要在任意操作系统上使用 POSIX 文件路径时获得一致的结果，则使用 [`path.posix`](http://nodejs.cn/s/c8hd35)：

在 POSIX 和 Windows 上:

```js
path.posix.basename('/tmp/myfile.html');
// 返回: 'myfile.html'
```

在 Windows 上，Node.js 遵循独立驱动器工作目录的概念。 当使用没有反斜杠的驱动器路径时，可以观察到此行为。 例如， `path.resolve('C:\\')` 可能会返回与 `path.resolve('C:')` 不同的结果。 详见[此 MSDN 页面](http://nodejs.cn/s/qMc4eE)。



### path.basename(path[, ext])

- path <String>
- ext <String> 可选的文件扩展名
- 返回：<String>

`path.basename()`方法返回一个`path`的最后一部分，类似于Unix中的`basename`命令。

例子：



```csharp
path.basename('/foo/bar/quux.html'); // 返回：‘quux.html’
path.basename('/foo/bar/quux.html', '.html'); // 返回：‘quux’
```

如果`path`不是一个字符串或提供了`ext`但不是一个字符串，则抛出TypeError。

**PS**：

```js
path.basename('/foo/bar/quux.html', 'x.html'); // 返回：quu   相当于把文件名切割了 但我们一般还是传后缀名

```



### path.delimiter（属性）

- <String>

提供平台特定的路径分隔符(path.delimiter)：

- Windows 上是  `;`
- POSIX 上是 `:`

> path.delimiter： 根据不同的系统，选用不同的分隔符来切割文件

例如，在POSIX上：



```ruby
console.log(process.env.PATH);
// 输出： '/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin'
process.env.PATH.split(path.delimiter);
// 返回：['/usr/bin', '/bin', '/usr/sbin', '/sbin', '/usr/local/bin']
```

在Windows上：



```bash
console.log(process.env.PATH);
// 输出： 'C:\Windows\system32;C:\Windows;C:\Program Files\node\'
process.env.PATH.split(path.delimiter);
// 返回：['C:\\Windows\\system32', 'C:\\Windows', 'C:\\Program Files\\node\\']
```

### path.dirname(path)

- path <String>
- 返回：<String>

`path.dirname()`方法返回一个`path`的目录名，类似于Unix中的`dirname`命令。

例子：

```csharp
path.dirname('/foo/bar/baz/asdf/quux');
// 返回：‘/foo/bar/baz/asdf’
```

如果`path`不是一个字符串，则抛出TypeError。

### path.extname(path)

- path <String>
- 返回：<String>

`path.extname()`方法返回`path`的扩展名，即从`path`的最后一部分中的最后一个`.`字符到字符串结束。如果`path`的最后一部分没有`.`或`path`的文件名的第一个字符是`.`,则返回一个空字符串。

例子：



```csharp
path.extname('index.html'); // 返回：‘.html’
path.extname('index.coffee.md'); // 返回：‘.md’
path.extname('index.'); // 返回： ‘.’
path.extname('index'); // 返回：‘’
path.extname('.index'); // 返回：‘’
```

如果`path`不是一个字符串，则抛出TypeError。

### path.format(pathObject)

**根据对象生成相应的路径**

- pathObject <Object>
  - dir <String>
  - root <String>
  - base <String>
  - name <String>
  - ext <String>
- 返回：<String>

`path.format()`方法会从一个对象返回一个路径字符串。与`path.parse()`相反。

当`parhObject`提供的属性有组合时，有些属性的优先级比其他的高：

- 如果提供了`pathObject.dir`,则`pathObject.root`会被忽略
- 如果提供`pathObject.base`存在，则`pathObject.ext`和`pathObject.name`会被忽略

例如，在POSIX上：

```bash
// 如果提供了'dir'、'root'和'base',则返回'${dir}$(path.sep)${base}'。
// 'root'会被忽略
path.format({
  root: '/ignored',
  dir: '/home/user/dir',
  base: 'file.txt'
});
// 返回：'/home/user/dir/file.txt'

// 如果没有指定'dir',则'root'会被使用。
// 如果只提供了'root'或'dir'等于'root',则平台的分隔符不会被包含。
// 'ext'会被忽略
path.format({
  root: '/',
  name: 'file',
  ext: '.txt' 
})
// 返回：'/file.txt'
```

在Windows上：

```csharp
path.format({
  dir: 'C:\\path\\dir',
  base: 'file.txt'
})
// 返回：'C:\\path\\dir\\file.txt'
```

### path.isAbsolute(path)

- `path` <String>
- 返回：<String>

`path.isAbsolute()`方法会判定`path`是否为一个绝对路径。

如果给定的`path`是一个长度为零的字符串，则返回`false`。

例如，在POSIX上：

```ruby
path.isAbsolute('/foo/bar'); // true
path.isAbsolute('/baz/..'); // true
path.isAbsolute('qux/'); // false
path.isAbsolute('.'); // false
```

在Windows上：

```bash
path.isAbsolute('//server')    // true
path.isAbsolute('\\\\server')  // true
path.isAbsolute('C:/foo/..')   // true
path.isAbsolute('C:\\foo\\..') // true
path.isAbsolute('bar\\baz')    // false
path.isAbsolute('bar/baz')     // false
path.isAbsolute('.')           // false
```

如果 path不是一个字符串，则抛出 TypeError

### path.join([...paths])

- ...paths <String> 一个路径片段的序列
- 返回：<String>

`path.join()`方法使用平台特定的分隔符把全部给定的 `path` 片段连接到一起，并规范化生成的路径。

长度为零的 `path` 片段会被忽略。 如果连接后的路径字符串是一个长度为零的字符串，则返回 '.'，表示当前工作目录。

例子：

```csharp
path.join('/foo', 'bar', 'baz/asdf', 'quux', '..')
// 返回: '/foo/bar/baz/asdf'

path.join('foo', {}, 'bar')
// 抛出 TypeError: path.join 的参数必须为字符串
```

如果任一路径片段不是一个字符串，则抛出 TypeError。

### path.normalize(path)

- path <String>
- 返回：<String>

`path.normalize()` 方法会规范化给定的 `path`，并解析 `..` 和 `.` 片段。

当发现多个连续的路径分隔符时（如 POSIX 上的 / 与 Windows 上的 \），它们会被单一的路径分隔符替换。 末尾的多个分隔符会被保留。

如果 path 是一个长度为零的字符串，则返回 '.'，表示当前工作目录。

例如，在 POSIX 上：



```bash
path.normalize('/foo/bar//baz/asdf/quux/..')
// 返回: '/foo/bar/baz/asdf'
```

在 Windows 上：



```ruby
path.normalize('C:\\temp\\\\foo\\bar\\..\\');
// 返回: 'C:\\temp\\foo\\'
```

如果 path不是一个字符串，则抛出 TypeError。

### path.parse(path)

- path <String>
- 返回：<Object>

`path.parse()`方法返回一个对象，对象的属性表示 path 的元素。

返回的对象有以下属性：

- root <String>
- dir <String>
- base <String>
- ext <String>
- name <String>

例如，在 POSIX 上：



```csharp
path.parse('/home/user/dir/file.txt')
// 返回:
// {
//    root : "/",
//    dir : "/home/user/dir",
//    base : "file.txt",
//    ext : ".txt",
//    name : "file"
// }
```

在 Windows 上：



```csharp
path.parse('C:\\path\\dir\\file.txt')
// 返回:
// {
//    root : "C:\\",
//    dir : "C:\\path\\dir",
//    base : "file.txt",
//    ext : ".txt",
//    name : "file"
// }
```

如果 path 不是一个字符串，则抛出TypeError。

### path.relative(from, to)

- from <String>
- to <String>
- 返回：<String>

path.relative() 方法返回从 from 到 to 的相对路径。 如果 from 和 to 各自解析到同一路径（调用 path.resolve()），则返回一个长度为零的字符串。

如果 from 或 to 传入了一个长度为零的字符串，则当前工作目录会被用于代替长度为零的字符串。

例如，在 POSIX 上：



```bash
path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb')
// 返回: '../../impl/bbb'
```

在 Windows 上：



```rust
path.relative('C:\\orandea\\test\\aaa', 'C:\\orandea\\impl\\bbb')
// 返回: '..\\..\\impl\\bbb'
```

如果 from 或 to 不是一个字符串，则抛出 TypeError。

### path.resolve([...paths])

- ...paths <String>  一个路径或路径片段的序列
- 返回：<String>

path.resolve() 方法会把一个路径或路径片段的序列解析为一个绝对路径。

给定的路径的序列是从右往左被处理的，后面每个 path 被依次解析，直到构造完成一个绝对路径。 例如，给定的路径片段的序列为：/foo、/bar、baz，则调用 path.resolve('/foo', '/bar', 'baz') 会返回 /bar/baz。

如果处理完全部给定的 path 片段后还未生成一个绝对路径，则当前工作目录会被用上。

生成的路径是规范化后的，且末尾的斜杠会被删除，除非路径被解析为根目录。

长度为零的 path 片段会被忽略。

如果没有传入 path 片段，则 path.resolve() 会返回当前工作目录的绝对路径。

例子：



```csharp
path.resolve('/foo/bar', './baz')
// 返回: '/foo/bar/baz'

path.resolve('/foo/bar', '/tmp/file/')
// 返回: '/tmp/file'

path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif')
// 如果当前工作目录为 /home/myself/node，
// 则返回 '/home/myself/node/wwwroot/static_files/gif/image.gif'
```

如果任何参数不是一个字符串，则抛出TypeError。

### path.sep

- <String>

提供了平台特定的路径片段分隔符：

- Windows 上是 `\`
- POSIX 上是 `/`

例如，在 POSIX 上：

```bash
'foo/bar/baz'.split(path.sep)
// 返回: ['foo', 'bar', 'baz']
```

在 Windows 上：

```bash
'foo\\bar\\baz'.split(path.sep)
// 返回: ['foo', 'bar', 'baz']
```

```js
const path = require('path');
const fs = require('fs');
/**
 * normalize 将非标准化的路径转化成标准化的路径
 * 1.解析. 和 ..
 * 2.多个斜杠会转成一个斜杠
 * 3.window下的斜杠会转成正斜杠
 * 4.如果以斜杠会保留
 **/

console.log(path.normalize('./a////b//..\\c//e//..//'));
//  \a\c\

//多个参数字符串合并成一个路径 字符串
console.log(path.join(__dirname,'a','b'));

/**
 * resolve
 * 以就用程序为根目录，做为起点，根据参数解析出一个绝对路径
 *  1.以应用程序为根起点
 *  2... .
 *  3. 普通 字符串代表子目录
 *  4. /代表绝地路径根目录
 */
console.log(path.resolve());//空代表当前的目录 路径
console.log(path.resolve('a','/c'));// /a/b
// d:\c
//可以获取两个路径之间的相对关系
console.log(path.relative(__dirname,'/a'));
// a
//返回指定路径的所在目录
console.log(path.dirname(__filename)); // 9.path
console.log(path.dirname('./1.path.js'));//  9.path
//basename 获取路径中的文件名
console.log(path.basename(__filename));
console.log(path.basename(__filename,'.js'));
console.log(path.extname(__filename));

console.log(path.sep);//文件分隔符 window \ linux /
console.log(path.win32.sep);
console.log(path.posix.sep);
console.log(path.delimiter);//路径 分隔符 window ; linux :

```

### 常用操作

```js
获取规范化的路径：path.normaliz(filepath)
获取路径：path.dirname(filepath)
获取文件名：path.basename(filepath)
获取扩展名：path.extname(filepath)
```

### Path文件路径方法总结

```js
/*
  basename 返回路径中最终的文件名称+后缀
  path.delimiter 在windows 环境下是 ; 在posix 环境下是 :
      process.env.PATH用户环境变量 
      windows ; 
      posix :
  dirname 获取路径中的目录名称 

  extname 获取路径中文件的后缀名称(扩展名)

  parse 解析路径 
    { 
      //根目录
      root: 'D:\\', 
      //dirname
      dir: 'D:\\预科班6.2\\Node服务班\\Node第七天 Node events 事件\\案例',
      //basename
      base: 'case-path.js',
      //extname
      ext: '.js',
      //basename(path,extname)
      name: 'case-path'
    }

  format 传递一个对象 根据对象生成对应path地址

  - 如果提供了`pathObject.dir`,则`pathObject.root`会被忽略
  - 如果提供`pathObject.base`存在，则`pathObject.ext`和`pathObject.name`会被忽略

  path.isAbsolute(path) 返回布尔值 判断path是否是绝对路径  / \\

    path.isAbsolute('/foo/bar'); // true
    path.isAbsolute('/baz/..'); // true
    path.isAbsolute('qux/'); // false
    path.isAbsolute('.'); // false

  path.join([...paths])
    根据当前path系统环境拼接 paths 
  path.normalize
    规范路径 清除路径中的无效目录 无效内容 
    返回 标准化路径内容

  path.resolve([...paths])  
    将路径或者路径片段序列解析为绝对路径 
      在服务器或者电脑上 锚定一个资源最稳定的方式是 获取资源的相对路径

    系统资源图片A  D://pic/logo/a.png

    app.js  D://node/src/proj/app.js

    在app.js中引入 图片A 相对路径写法 ../../../pic/logo/a.png

    如果把 app.js 移到了E盘 这个相对路径 瞬间失效 无法正确获取到资源图片A


    path.sep 属性 当前系统下的 默认路径符号 Windows  \\ 或者 posix /
    path.delimiter 属性 当前系统下的环境变量地址分隔符 Windows ; 或者 posix :
*/
```

### 案例

```js
 */
const path = require('path')

//  F:\node\day7\03path_fs.js  __filename 获取文件的路径
// console.log(__filename)
// 返回的文件名+后缀   第一个参数是： 文件路径  
// 第二个参数是： 文件的后缀（相当于切割前面的文件名 不一定是后缀 ）  
const styleFileName = path.basename(__filename, '.js'); 
const styleFileName1 = path.basename('./node/common/foo.js', "o.js")//fo
// 返回目录名 不包括文件名
const pathDirName = path.dirname('./bar/logo/src/1.text')//./bar/logo/src/
const pathDirName1 = path.dirname(__filename);//F:\node\day7 

// const pathDelimiter = path.
// 获取系统的分隔符：path.delimiter
const pathEnv = process.env.PATH//获取环境变量的文件路径
// console.log(pathEnv.split(path.delimiter))

// 获取后缀名
const pathExtName = path.extname(__filename);

// 返回一个文件路径 基本信息对象 parse
/* 
  {
  root: 'F:\\',
  dir: 'F:\\node\\day7',
  base: '03path_fs.js',
  ext: '.js',
  name: '03path_fs'
}
*/
const pathParse = path.parse(__filename);


// 将对象拼接成相应的路劲
const pathformat = path.format({
  root: 'F:\\',
  dir: 'F:\\node\\day7',
  base: '03path_fs.js',
  ext: '.js',
  name: '03path_fs'
})
// console.log("format"+pathformat);

// 判断路径是否是绝对路径
const pathIsAbsolute = path.isAbsolute('./comon/foo')//false
const pathIsAbsolute1 = path.isAbsolute(__filename);//true


// path.join  返回一个路径片段拼接的路径
const pathJoin = path.join('/foo', 'bar', 'baz/asdf', 'quux', __filename)
//console.log(pathJoin) //\foo\bar\baz\asdf\quux\F:\node\day7\03path_fs.js

const pathNormalize = path.normalize('/foo/bar//baz/asdf/quux/..')
//console.log(pathNormalize);//\foo\bar\baz\asdf   //  双斜杠 格式化了返回window标准的文件路径格式

// 返回相对路径
const pathRelative = path.relative('/data/orandea/test/aaa/bbb/ccc/ddd', '/data/orandea/impl/bbb/ccc');
//..\..\..\..\node\day7   第二个参数是空字符串的时候返回当前文件的相对路径
//如果两个路径前面相同 当时后面不同则返回 第二个参数的不同的文件名
console.log(pathRelative)
```



## Node.js Buffer(缓冲区)

JavaScript 语言自身只有字符串数据类型，没有二进制数据类型。

但在处理像TCP流或文件流时，必须使用到二进制数据。因此在 Node.js中，定义了一个 Buffer 类，该类用来创建一个专门存放二进制数据的缓存区。

在 Node.js 中，Buffer 类是随 Node 内核一起发布的核心库。**Buffer 库为 Node.js 带来了一种存储原始数据的方法**，可以让 Node.js 处理二进制数据，每当需要在 Node.js 中处理I/O操作中移动的数据时，就有可能使用 Buffer 库。原始数据存储在 Buffer 类的实例中。一个 Buffer 类似于一个整数数组，但它对应于 V8 堆内存之外的一块原始内存。

> 在v6.0之前创建Buffer对象直接使用new Buffer()构造函数来创建对象实例，但是Buffer对内存的权限操作相比很大，可以直接捕获一些敏感信息，所以在v6.0以后，官方文档里面建议使用 **Buffer.from()** 接口去创建Buffer对象。

------

### Buffer 与字符编码

Buffer 实例一般用于表示编码字符的序列，比如 UTF-8 、 UCS2 、 Base64 、或十六进制编码的数据。 通过使用显式的字符编码，就可以在 Buffer 实例与普通的 JavaScript 字符串之间进行相互转换。

```
const buf = Buffer.from('runoob', 'ascii');

// 输出 72756e6f6f62
console.log(buf.toString('hex'));

// 输出 cnVub29i
console.log(buf.toString('base64'));

```

**Node.js 目前支持的字符编码包括：**

- **ascii** - 仅支持 7 位 ASCII 数据。如果设置去掉高位的话，这种编码是非常快的。
- **utf8** - 多字节编码的 Unicode 字符。许多网页和其他文档格式都使用 UTF-8 。
- **utf16le** - 2 或 4 个字节，小字节序编码的 Unicode 字符。支持代理对（U+10000 至 U+10FFFF）。
- **ucs2** - **utf16le** 的别名。
- **base64** - Base64 编码。
- **latin1** - 一种把 **Buffer** 编码成一字节编码的字符串的方式。
- **binary** - **latin1** 的别名。
- **hex** - 将每个字节编码为两个十六进制字符。

------

### 创建 Buffer 类

Buffer 提供了以下 API 来创建 Buffer 类：

- **Buffer.alloc(size[, fill[, encoding]])：** **返回一个指定大小的 Buffer 实例，如果没有设置 fill，则默认填满 **0
- **Buffer.allocUnsafe(size)：** 返回一个指定大小的 Buffer 实例，但是它不会被初始化，所以它可能包含敏感的数据
- **Buffer.allocUnsafeSlow(size)**
- **Buffer.from(array)：** 返回一个被 array 的值初始化的新的 Buffer 实例（传入的 array 的元素只能是数字，不然就会自动被 0 覆盖）
- **Buffer.from(arrayBuffer[, byteOffset[, length]])：** 返回一个新建的与给定的 ArrayBuffer 共享同一内存的 Buffer。
- **Buffer.from(buffer)：** 复制传入的 Buffer 实例的数据，并返回一个新的 Buffer 实例
- **Buffer.from(string[, encoding])：** 返回一个被 string 的值初始化的新的 Buffer 实例

```js
// 创建一个长度为 10、且用 0 填充的 Buffer。
const buf1 = Buffer.alloc(10);

// 创建一个长度为 10、且用 0x1 填充的 Buffer。 
const buf2 = Buffer.alloc(10, 1);

// 创建一个长度为 10、且未初始化的 Buffer。
// 这个方法比调用 Buffer.alloc() 更快，
// 但返回的 Buffer 实例可能包含旧数据，
// 因此需要使用 fill() 或 write() 重写。
const buf3 = Buffer.allocUnsafe(10);

// 创建一个包含 [0x1, 0x2, 0x3] 的 Buffer。
const buf4 = Buffer.from([1, 2, 3]);

// 创建一个包含 UTF-8 字节 [0x74, 0xc3, 0xa9, 0x73, 0x74] 的 Buffer。
const buf5 = Buffer.from('tést');

// 创建一个包含 Latin-1 字节 [0x74, 0xe9, 0x73, 0x74] 的 Buffer。
const buf6 = Buffer.from('tést', 'latin1');

```

------

### 写入缓冲区

**语法**

写入 Node 缓冲区的语法如下所示： 

```
buf.write(string[, offset[, length]][, encoding])

```

**参数**

参数描述如下：

- **string** - 写入缓冲区的字符串。
- **offset** - 缓冲区开始写入的索引值，默认为 0 。
- **length** - 写入的字节数，默认为 buffer.length
- **encoding** - 使用的编码。默认为 'utf8' 。

根据 encoding 的字符编码写入 string 到 buf 中的 offset 位置。 length 参数是写入的字节数。 如果 buf 没有足够的空间保存整个字符串，则只会写入 string 的一部分。 只部分解码的字符不会被写入。

**返回值**

返回实际写入的大小。如果 buffer 空间不足， 则只会写入部分字符串。

**实例**

```
buf = Buffer.alloc(256);
len = buf.write("www.runoob.com");

console.log("写入字节数 : "+  len);

```

执行以上代码，输出结果为：

```
$node main.js
写入字节数 : 14

```

------

### 从缓冲区读取数据(totring)

**语法**

读取 Node 缓冲区数据的语法如下所示：

```
buf.toString([encoding[, start[, end]]])

```

**参数**

参数描述如下：

- **encoding** - 使用的编码。默认为 'utf8' 。
- **start** - 指定开始读取的索引位置，默认为 0。
- **end** - 结束位置，默认为缓冲区的末尾。

**返回值**

解码缓冲区数据并使用指定的编码返回字符串。

**实例**

```
buf = Buffer.alloc(26);
for (var i = 0 ; i < 26 ; i++) {
  buf[i] = i + 97;
}

console.log( buf.toString('ascii'));       // 输出: abcdefghijklmnopqrstuvwxyz
console.log( buf.toString('ascii',0,5));   //使用 'ascii' 编码, 并输出: abcde
console.log( buf.toString('utf8',0,5));    // 使用 'utf8' 编码, 并输出: abcde
console.log( buf.toString(undefined,0,5)); // 使用默认的 'utf8' 编码, 并输出: abcde

```

执行以上代码，输出结果为：

```
$ node main.js
abcdefghijklmnopqrstuvwxyz
abcde
abcde
abcde

```

------

### 将 Buffer 转换为 JSON 对象

**语法**

将 Node Buffer 转换为 JSON 对象的函数语法格式如下：
  返回 buf 的 JSON 表示。 JSON.stringify() 在字符串化 Buffer 实例时隐式调用此函数。

  Buffer.from() 接受从此方法返回的格式的对象。 特别是，Buffer.from(buf.toJSON()) 的工作方式类似于 Buffer.from(buf)。

```
buf.toJSON()

```

当字符串化一个 Buffer 实例时，[JSON.stringify()](https://www.runoob.com/js/javascript-json-stringify.html) 会隐式地调用该 **toJSON()**。

**返回值**

返回 JSON 对象。

**实例**

```
const buf = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5]);
const json = JSON.stringify(buf);

// 输出: {"type":"Buffer","data":[1,2,3,4,5]}
console.log(json);

const copy = JSON.parse(json, (key, value) => {
  return value && value.type === 'Buffer' ?
    Buffer.from(value.data) :
    value;
});

// 输出: <Buffer 01 02 03 04 05>
console.log(copy);

```

执行以上代码，输出结果为：

```
{"type":"Buffer","data":[1,2,3,4,5]}
<Buffer 01 02 03 04 05>

```

------

### 缓冲区合并

**语法**

Node 缓冲区合并的语法如下所示：

```
Buffer.concat(list[, totalLength])

```

**参数**

参数描述如下：

- **list** - 用于合并的 Buffer 对象数组列表。
- **totalLength** - 指定合并后Buffer对象的总长度。

**返回值**

返回一个多个成员合并的新 Buffer 对象。

**实例**

```
var buffer1 = Buffer.from(('菜鸟教程'));
var buffer2 = Buffer.from(('www.runoob.com'));
var buffer3 = Buffer.concat([buffer1,buffer2]);
console.log("buffer3 内容: " + buffer3.toString());

```

执行以上代码，输出结果为：

```
buffer3 内容: 菜鸟教程www.runoob.com

```

------

### 缓冲区比较

**语法**

Node Buffer 比较的函数语法如下所示, 该方法在 Node.js v0.12.2 版本引入：

```
buf.compare(otherBuffer);

```

**参数**

参数描述如下：

- **otherBuffer** - 与 **buf** 对象比较的另外一个 Buffer 对象。

**返回值**

返回一个数字，表示 **buf** 在 **otherBuffer** 之前，之后或相同。

**实例**

```
var buffer1 = Buffer.from('ABC');
var buffer2 = Buffer.from('ABCD');
var result = buffer1.compare(buffer2);

if(result < 0) {
   console.log(buffer1 + " 在 " + buffer2 + "之前");
}else if(result == 0){
   console.log(buffer1 + " 与 " + buffer2 + "相同");
}else {
   console.log(buffer1 + " 在 " + buffer2 + "之后");
}

```

执行以上代码，输出结果为：

```
ABC在ABCD之前

```

------

### 拷贝缓冲区(也可以理解为替换)

**语法**

Node 缓冲区拷贝语法如下所示：

```
buf.copy(targetBuffer[, targetStart[, sourceStart[, sourceEnd]]])

```

**参数**

参数描述如下：

- **targetBuffer** - 要拷贝的 Buffer 对象。
- **targetStart** - 数字, 可选, 默认: 0
- **sourceStart** - 数字, 可选, 默认: 0
- **sourceEnd** - 数字, 可选, 默认: buffer.length

**返回值**

没有返回值。

**实例**

```
var buf1 = Buffer.from('abcdefghijkl');
var buf2 = Buffer.from('RUNOOB');

//将 buf2 插入到 buf1 指定位置上
buf2.copy(buf1, 2);

console.log(buf1.toString());

```

执行以上代码，输出结果为：

```
abRUNOOBijkl

```

------

#### 缓冲区裁剪

Node 缓冲区裁剪语法如下所示：

```
buf.subarray([start[, end]])

```
**参数**

参数描述如下：
  start <integer> 新的 Buffer 将开始的位置。 默认值: 0。
  end <integer> 新的 Buffer 将结束的位置（不包括在内）。 默认值: buf.length。
  返回： <Buffer>


**返回值**
  返回一个新的缓冲区，它和旧缓冲区指向同一块内存，但是从索引 start 到 end 的位置剪切。
**用法**
返回新的 Buffer，其引用与原始缓冲区相同的内存，但由 start 和 end 索引进行偏移和裁剪。

指定 end 大于 buf.length 将返回与 end 等于 buf.length 相同的结果。

该方法继承自 TypedArray.prototype.subarray()。

修改新的 Buffer 切片会修改原来 Buffer 中的内存，因为两个对象分配的内存是重叠的。

**实例**

```
var buffer1 = Buffer.from('runoob');
// 剪切缓冲区
var buffer2 = buffer1.subarray(0,2);
console.log("buffer2 content: " + buffer2.toString());

const buf1 = Buffer.allocUnsafe(26);

for (let i = 0; i < 26; i++) {
  // 97 is the decimal ASCII value for 'a'.
  buf1[i] = i + 97;
}

const buf2 = buf1.subarray(0, 3);

console.log(buf2.toString('ascii', 0, buf2.length));
// Prints: abc

buf1[0] = 33;

console.log(buf2.toString('ascii', 0, buf2.length));


```

执行以上代码，输出结果为：

```
buffer2 content: ru

```

------

### 缓冲区长度

**语法**

Node 缓冲区长度计算语法如下所示：

```
buf.length;

```

**返回值**

返回 Buffer 对象所占据的内存长度。

**实例**

```js
var buffer = Buffer.from('www.runoob.com');
//  缓冲区长度
console.log("buffer length: " + buffer.length);

```

执行以上代码，输出结果为：

```js
buffer length: 14

```

### 案例总结

```js

// 转换成对应的编码格式
let from = Buffer.from('hello wrod')
const from1 = Buffer.from('hello wrod', 'ascii')
const from2 = Buffer.from('hello wrod', 'utf8')
// console.log(from2)

/* 
   alloc   默认用0填充 
   第一个参数：buffer字节位数  
   第一个参数： ascii码  就是默认填充值
*/  
let alloc = Buffer.alloc(4);
// 先转化成对应的ascii数字  经过toString转化成@
const alloc1 = Buffer.alloc(4, 64, 'ascii')
// console.log(alloc1.toString())

const buf = Buffer.alloc(7, 64);
/* 
  write 
    - string - 写入缓冲区的字符串。
    - offset - 缓冲区开始写入的索引值，默认为 0 。
    - length - 写入的字节数，默认为 buffer.length
    - encoding - 使用的编码。默认为 'utf8' 。
  如果数据是汉字，字节位数不够的情况使用默认值填充
*/
let len = buf.write('hello world', 3,1)
// console.log(buf)//<Buffer 40 40 40 68 40 40 40>
let len1 = buf.write('hello world', 1, 7, 'ascii');

/* 
  //buf.toString()读取Buffer中的数据 
  - encoding - 使用的编码。默认为 'utf8' 。
  - start - 指定开始读取的索引位置，默认为 0。
  - end - 结束位置，默认为缓冲区的末尾。

*/
// console.log(buf.toString()) //@hello 

//把buffer缓存区的值转化成对应的JSon格式
let jsonBuf = buf.toJSON();
// console.log(jsonBuf);


/* 
// 缓冲区合并
参数描述如下：
- list - 用于合并的 Buffer 对象数组列表。
- totalLength - 指定合并后Buffer对象的总长度。
*/
const buffer1 = Buffer.from('hello')
const buffer2 = Buffer.from('my name is bee')

const concat = Buffer.concat([buffer1, buffer2])
const concat1 = Buffer.concat([buffer1, buffer2], 10)
// console.log(concat1.toString())

/* 
  缓冲区比较
  0 代表 两个buffer完全一致  *
  小于0 代表 compare2 包含 compare1
  大于0  代表 compare1 与 compare不相等 但也可能包含compare2
*/
const compare1 = Buffer.from('ds');
const compare2 = Buffer.from('abc');
const result = compare1.compare(compare2);
// console.log(result)//1

/* 
  拷贝缓冲区
  参数描述如下：

    - targetBuffer - 要拷贝的 Buffer 对象。
    - targetStart - 数字, 可选, 默认: 0 target目标缓冲区开始位置
    - sourceStart - 数字, 可选, 默认: 0 source 源缓冲区开始位置
    - sourceEnd - 数字, 可选, 默认: buffer.lengthsource 源缓冲区开始位置结束位置

*/
// 问题
// const allocs = Buffer.alloc(7, 64)
// const writeBuf = allocs.write('hello world',1 , 7);
// const writeBuf1 = allocs.write('你好', 0, 3)
// writeBuf.copy(writeBuf1,2)
// console.log(writeBuf)

const buf1 = Buffer.from('hello')
const buf2 = Buffer.from('world')
buf1.copy(buf2, 2, 2, 5);
// console.log(buf2.toString()) //wollo


/*  
  缓冲区裁剪
  参数描述如下：

    - start - 数字, 可选, 默认: 0
    - end - 数字, 可选, 默认: buffer.length

*/

const sliceBuf = Buffer.alloc(7, 64);
const sliceBuf2 = sliceBuf.write('你好',0, 4)
// console.log(sliceBuf.toString());//你@
const sliceBuffer = sliceBuf.slice(0, 3)
console.log(sliceBuffer.toString())


```



## Nodejs fs 文件系统模块

`fs` 模块提供了许多非常实用的函数来访问文件系统并与文件系统进行交互。

无需安装。 作为 Node.js 核心的组成部分，可以通过简单地引用来使用它：

注意:

- 在Node.js中，使用fs模块来实现所有有关文件及目录的创建、写入及删除操作。
- **在fs模块中，所有的方法都分为同步和异步两种实现。**
- 具有`sync`后缀的方法为同步方法，不具有`sync`后缀的方法为异步方法。

```js
const fs = require('fs')
```

### flag
// 排它：  如果文件不存在则创建， 存在则报错
| 符号 | 含义                                     |
| ---- | ---------------------------------------- |
| r    | 读文件，文件不存在报错                   |
| r+   | 读取并写入，文件不存在报错               |
| rs   | 同步读取文件并忽略缓存                   |
| w    | 写入文件，不存在则创建，存在则清空       |
| wx   | 排它写入文件                             |
| w+   | 读取并写入文件，不存在则创建，存在则清空 |
| wx+  | 和w+类似，排他方式打开                   |
| a    | 追加写入                                 |
| ax   | 与a类似，排他方式写入                    |
| a+   | 读取并追加写入，不存在则创建             |
| ax+  | 作用与a+类似，但是以排他方式打开文件     |

### 整体读取文件

#### 异步读取

```
fs.readFile(path[, options], callback)

cosnt fs = require("fs").promise
let result = fs.readFile(path[, options], callback)//result文件数据
需要在回调函数中获取数据  也可直接等于 但是要使用fs的promise块
```

- options
  - encoding
  - flag flag 默认 = 'r'

#### 同步读取

```
fs.readFileSync(path[, options])   直接获取文件数据
let result = fs.readFileSync(path[, options])  
result数据  同步方法
```

### 写入文件

#### 异步写入

```
fs.writeFile(file, data[, options], callback)

```

- options
  - encoding
  - flag flag 默认 = 'w'
  - mode 读写权限，默认为0666

```
let fs = require('fs');
fs.writeFile('./1.txt',Date.now()+'\n',{flag:'a'},function(){
  console.log('ok');
});

```

#### 同步写入

```
fs.writeFileSync(file, data[, options])

```

#### 追加文件

> fs.appendFile(file, data[, options], callback)
    参数
        path <string> | <Buffer> | <URL> | <number> 文件名或文件描述符
        data <string> | <Buffer>
        options <Object> | <string>
            encoding <string> | <null> 默认值： 'utf8'
            mode <integer> 默认值： 0o666
            flag <string> 参见 支持文件系统 flags。 默认值: 'a'。
        callback <Function>
            err <Error>

            
    异步地将数据追加到文件，如果该文件尚不存在，则创建该文件。 data 可以是字符串<Buffer>。
    mode 选项仅影响新创建的文件。 有关详细信息，请参阅 fs.open()。
```
fs.appendFile('./1.txt',Date.now()+'\n',function(){
  console.log('ok');
})
```

#### 拷贝文件

```
function copy(src,target){
  fs.readFile(src,function(err,data){
    fs.writeFile(target,data);
  })
}
```

### 从指定位置处开始读取文件

#### 打开文件

> fs.open(filename,flags,[mode],callback);
>
> - filename, 必选参数，文件名 
> - \* flags, 操作标识，如"r",读方式打开 
> - [mode],权限，如777，表示任何用户读写可执行 
> - callback 打开文件后回调函数，参数默认第一个err,第二个fd为一个整数，表示打开文件返回的文件描述符，window中又称文件句柄

文件权限描述
常量	                 八进制	描述
fs.constants.S_IRUSR	0o400	所有者阅读
fs.constants.S_IWUSR	0o200	所有者可写
fs.constants.S_IXUSR	0o100	由所有者执行/搜索
fs.constants.S_IRGRP	0o40	分组阅读
fs.constants.S_IWGRP	0o20	群组可写
fs.constants.S_IXGRP	0o10	按组执行/搜索
fs.constants.S_IROTH	0o4	别人读
fs.constants.S_IWOTH	0o2	其他人可写
fs.constants.S_IXOTH	0o1	由他人执行/搜索

0666: 读写执行权限所有人
0644:读权限所有人, 写权限所有者
0600:只有所有者具有读写执行权限


```
fs.open(filePath, 'r', '0600', (err, fd) => {
    if (err) {
        throw new Error(err);
    }
    console.log(fd);
    fs.readFile(fd, (err, data) => {
        console.log(data)
    })
});

```

#### 读取文件

> fs.read(fd, buffer, offset, length, position, callback((err, bytesRead, buffer)))

```js
/**
 * fd, 使用fs.open打开成功后返回的文件描述符
 * buffer, 一个Buffer对象，v8引擎分配的一段内存
 * offset, 整数，向缓存区中写入时的初始位置，以字节为单位
 * length, 整数，读取文件的长度
 * position, 整数，读取文件初始位置；文件大小以字节为单位
 * callback(err, bytesRead, buffer), 读取执行完成后回调函数，bytesRead实际读取字节数，被读取的缓存区对象
 */
```

```
const fs=require('fs');
const path=require('path');
fs.open(path.join(__dirname,'1.txt'),'r',0o666,function (err,fd) {
    console.log(err);
    let buf = Buffer.alloc(6);
     fs.read(fd,buf,0,6,3,function(err, bytesRead, buffer){
       console.log(bytesRead);//6
       console.log(buffer===buf);//true
       console.log(buf.toString());
     })
})

```
fs.read 和 fs.readFile 的区别:
  fs.read 是流式读取,适用于大文件。它一次读取部分内容,需要重复调用才能读取完整文件。
  fs.readFile 是一次性读取整个文件内容。
使用场景:
  小文件:推荐使用 fs.readFile,简单方便
  大文件:推荐使用 fs.read,避免一次性读入内存过大导致性能问题

总的来说:
  fs.readFile 更简单,适用于小文件
  fs.read 内部实现使用了可流式读取,更适用于大文件


#### 写入文件

> fs.write(fd, buffer[, offset[, length[, position]]], callback)

```js
//fs.write(fd, buffer, offset, length, position, callback);

/**
 * fd, 使用fs.open打开成功后返回的文件描述符
 * buffer, 一个Buffer对象，v8引擎分配的一段内存
 * offset, 整数，从缓存区中读取时的初始位置，以字节为单位
 * length, 整数，从缓存区中读取数据的字节数
 * position, 整数，写入文件初始位置；
 * callback(err, written, buffer), 写入操作执行完成后回调函数，written实际写入字节数，buffer被读取的缓存区对象
 */
```



```
const fs=require('fs');
const path=require('path');
fs.open(path.join(__dirname,'1.txt'),'w',0o666,function (err,fd) {
    console.log(err);
    let buf=Buffer.from('你好成都');
     fs.write(fd,buf,3,6,0,function(err, bytesWritten, buffer){
       console.log(bytesWritten);//6
       console.log(buffer===buf);//true
       console.log(buf.toString());//你好成都
     })
})

```

```
/* 
    fs.writev(fd, buffers[, position], callback)
        参数：
            fd <integer>
            buffers <ArrayBufferView[]>
            position <integer> | <null> 默认值： null
            callback <Function>
                err <Error>
                bytesWritten <integer>
                buffers <ArrayBufferView[]>

        使用writev()将ArrayBufferView的数组写入fd指定的文件。
        position 是该数据应写入的文件开头的偏移量。 如果 typeof position !== 'number'，则数据将写入当前位置。

        回调将被赋予三个参数： err、bytesWritten 和 buffers。 bytesWritten 是从 buffers 写入的字节数。

        如果这个方法是 util.promisify() 的，它返回具有 bytesWritten 和 buffers 属性的 Object 的 promise。

        在同一个文件上多次使用 fs.writev() 而不等待回调是不安全的。 对于这种情况，请使用 fs.createWriteStream()。

        在 Linux 上，以追加模式打开文件时，位置写入不起作用。 内核会忽略位置参数，并始终将数据追加到文件末尾。
*/
fs.open(filePath, 'w', '0666', (err, fd) => {
    // 将Buffer数据写入到指定的文件中
    const buf = [Buffer.from(ancientPoetry), Buffer.from('作则：无名')];
    fs.writev(fd, buf, buf.length, (err, bytesWritten, buffers) => {
        if (err) throw new Error(err);
        console.log('bytesWritten: ', bytesWritten);
        console.log('buffers: ', buffers.toString());
    });
})

```

fs.writev()、fs.write() 和 fs.writeFile() 是三种常用的方式。

fs.writev() 是一个异步方法，用于将多个缓冲区的数据依次写入文件。这个方法的优点是可以一次写入多个缓冲区，从而提高写入效率。但是，它的参数比较复杂，需要传递一个数组，数组中的每个元素是一个缓冲区。

fs.write() 是一个异步方法，用于将一个缓冲区的数据写入文件。这个方法的优点是参数比较简单，只需要传递一个缓冲区即可。但是，如果需要写入多个缓冲区，则需要多次调用这个方法。

fs.writeFile() 是一个异步方法，用于将一个字符串或缓冲区的数据写入文件。这个方法的优点是参数非常简单，只需要传递一个文件名和数据即可。但是，它的写入方式是将整个数据写入文件，因此对于大文件可能会比较慢。

根据不同的需求，你可以选择不同的写入方式。如果需要写入多个缓冲区，可以选择 fs.writev()；如果只需要写入一个缓冲区，可以选择 fs.write()；如果写入的是字符串或缓冲区，并且文件不是很大，可以选择 fs.writeFile()。

此外，这些方法还有对应的同步版本，例如 fs.writevSync()、fs.writeSync() 和 fs.writeFileSync()，它们的使用方式和异步版本类似，只是方法名中多了一个 Sync。需要注意的是，同步方法会阻塞主线程，因此在使用时需要格外小心。

#### 同步磁盘缓存

> fs.fsync(fd,[callback]);

```js
// 使用fs.write写入文件时，操作系统是将数据读到内存，再把数据写入到文件中，当数据读完时并不代表数据已经写完，因为有一部分还可能在内在缓冲区内。
// 因此可以使用fs.fsync方法将内存中数据写入文件；--刷新内存缓冲区；

// fs.fsync() 是一个用于将文件数据刷新到磁盘的方法，它可以确保文件的写入操作已经被写入到磁盘中

/* 
  需要注意的是，由于 fs.fsync() 方法需要将数据刷新到磁盘中，因此它的性能比较低，通常只有在确保数据写入磁盘后才会使用这个方法。如果只是需要将数据写入文件中，可以使用 fs.write() 或 fs.writeFile() 方法。

另外，由于 fs.fsync() 方法会阻塞线程，因此在使用时需要格外小心，避免对应用程序的性能产生影响。

fsync 有两个作用:

  数据持久化:将内存缓存的数据写入磁盘,确保在断电等情况下不丢失数据。

  数据一致性:保证一个文件操作完成后,其他进程能立即访问到最新数据。

  

fsync 如果能及时调用,有利于提高文件系统的可靠性和一致性。

它对应的异步版本是 fs.fsync(fd, callback) 。

所以总的来说,fs.fsync 的作用主要是确保文件数据能及时写入磁盘,以保障数据的完整性和一致性。
*/

//fs.fsync(fd, [callback])
/**
 * fd, 使用fs.open打开成功后返回的文件描述符
 * [callback(err, written, buffer)], 写入操作执行完成后回调函数，written实际写入字节数，buffer被读取的缓存区对象
 */
```

```js
fs.open(__dirname + '/test.txt', 'a', function (err, fd) {
  if(err)
    throw err;
  var buffer = new Buffer('你好,我是海牙');
  fs.write(fd, buffer, 0, 9, 0, function (err, written, buffer) {
    console.log(written.toString());
    fs.write(fd, buffer, 9, buffer.length - 9, null, function (err, written) {
      console.log(written.toString());
      fs.fsync(fd);
      fs.close(fd);
    })
  });
});
```



#### 关闭文件

> fs.close(fd,[callback]);

```js
let buf = Buffer.from('你好,同学');
fs.open('./2.txt', 'w', function (err, fd) {
  fs.write(fd, buf, 3, 6, 0, function (err, written, buffer) {
    console.log(written);
    fs.fsync(fd, function (err) {
      fs.close(fd, function (err) {
          console.log('写入完毕!')
        }
      );
    });
  })
});
```

#### 拷贝文件

```js
let BUFFER_SIZE=1;
const path=require('path');
const fs=require('fs');
function copy(src,dest,callback) {
    let buf=Buffer.alloc(BUFFER_SIZE);
    fs.open(src,'r',(err,readFd)=>{
        fs.open(dest,'w',(err,writeFd) => {
            !function read() {
                fs.read(readFd,buf,0,BUFFER_SIZE,null,(err,bytesRead) => {
                    bytesRead&&fs.write(writeFd,buf,0,bytesRead,read);
                });
            }()
        })
    });
}
copy(path.join(__dirname,'1.txt'),path.join(__dirname,'2.txt'),()=>console.log('ok'));
```

### 目录操作

#### 创建目录

> fs.mkdir(path[, mode], callback)

> 要求父目录必须存在

#### 判断一个文件是否有权限访问

 fs.access(path[, mode], callback)

fs.constants 对象是 Node.js 中 fs 模块中的一个常量集合，包含了一些常用的文件系统常量。下面是 fs.constants 对象下所有属性及其对应的意思：

fs.constants.F_OK：用于 fs.access() 函数中，表示文件可见性检查标志，表示文件存在即可。
fs.constants.R_OK：用于 fs.access() 函数中，表示文件可读性检查标志，表示文件可被读取。
fs.constants.W_OK：用于 fs.access() 函数中，表示文件可写性检查标志，表示文件可被写入。
fs.constants.X_OK：用于 fs.access() 函数中，表示文件可执行性检查标志，表示文件可被执行。
fs.constants.O_RDONLY：表示以只读模式打开文件。
fs.constants.O_WRONLY：表示以只写模式打开文件。
fs.constants.O_RDWR：表示以读写模式打开文件。
fs.constants.O_CREAT：表示如果文件不存在，则创建文件。
fs.constants.O_TRUNC：表示在打开文件时截断文件，将文件长度设置为 0。
fs.constants.O_APPEND：表示在写文件时将数据追加到文件末尾。
fs.constants.O_EXCL：表示与 O_CREAT 一起使用，如果文件已经存在，则创建文件失败。
fs.constants.S_IFMT：用于 fs.stat() 函数中，表示文件类型掩码。
fs.constants.S_IFREG：用于 fs.stat() 函数中，表示普通文件类型。
fs.constants.S_IFDIR：用于 fs.stat() 函数中，表示目录文件类型。
fs.constants.S_IFCHR：用于 fs.stat() 函数中，表示字符设备文件类型。
fs.constants.S_IFBLK：用于 fs.stat() 函数中，表示块设备文件类型。
fs.constants.S_IFIFO：用于 fs.stat() 函数中，表示 FIFO（命名管道）文件类型。
fs.constants.S_IFLNK：用于 fs.stat() 函数中，表示符号链接文件类型。
fs.constants.S_IFSOCK：用于 fs.stat() 函数中，表示套接字文件类型。
这些常量可用于文件系统操作函数中，例如 fs.access()、fs.open()、fs.stat() 等，用于指定文件的访问权限、打开模式和文件类型等信息。

````
 fs.access('/etc/passwd', fs.constants.R_OK | fs.constants.W_OK, (err) => {
   console.log(err ? 'no access!' : 'can read/write');
 });
 
````

#### 读取目录下所有的文件

> fs.readdir(path[, options], callback)

#### 查看文件目录信息

同步查看

```js
//2.同步版：
	fs.statSync(path)
  // 只接收一个path变量，fs.statSync(path)其实是一个fs.stats的一个实例；
```

##### 异步查看

> fs.stat(path, callback)

```js
Stats {
    dev: 2114, //设备的数字标识符
    ino: 48064969, //文件系统特定的文件索引节点编号
    mode: 33188, //描述文件类型和模式的位字段
    nlink: 1, //文件存在的硬链接数
    uid: 85, //拥有该文件（POSIX）的用户的数字型用户标识符
    gid: 100, //拥有该文件（POSIX）的群组的数字型群组标识符
    rdev: 0, //如果文件被视为特殊文件，则此值为数字型设备标识符
    size: 527, //文件的大小（以字节为单位）
    blksize: 4096, //用于 I/O 操作的文件系统块的大小
    blocks: 8, //为此文件分配的块数
    atimeMs: 1318289051000.1, //访问此文件的时间戳
    mtimeMs: 1318289051000.1, //修改此文件的时间戳
    ctimeMs: 1318289051000.1, //更改此文件的时间戳
    birthtimeMs: 1318289051000.1, //创建时间的时间戳
    atime: 'Mon, 10 Oct 2020 23:24:11 GMT', //文件数据最近被访问的时间。
    mtime: 'Mon, 10 Oct 2020 23:24:11 GMT', //文件数据最近被修改的时间。
    ctime: 'Mon, 10 Oct 2020 23:24:11 GMT', //文件状态最近被改变的时间（修改索引节点数据）。
    birthtime: 'Mon, 10 Oct 2020 23: 24: 11 GMT' //文件创建的时间。
}

```

- stats.isFile()  是否为文件
- stats.isDirectory() 是否为目录
- atime(Access Time)上次被读取的时间。
- ctime(State Change Time)：属性或内容上次被修改的时间。
- mtime(Modified time)：档案的内容上次被修改的时间。


````
fs.statfs(path[, options], callback)#
新增于: v19.6.0, v18.15.0
  path <string> | <Buffer> | <URL>
  options <Object>
  bigint <boolean> 返回的 <fs.StatFs> 对象中的数值是否应为 bigint。 默认值: false。
  callback <Function>
  err <Error>
  stats <fs.StatFs>
  // 异步的 statfs(2)。 返回有关包含 path 的已安装文件系统的信息。 回调有两个参数 (err, stats)，其中 stats 是 <fs.StatFs> 对象。

  // 如果出现错误，err.code 将是 常见系统错误 之一。

````

```
/* 
    fs.statfs(path[, options], callback)
        path <string> | <Buffer> | <URL>
        options <Object>
            bigint <boolean> 返回的 <fs.StatFs> 对象中的数值是否应为 bigint。 默认值: false。
        callback <Function>
            err <Error>
            stats <fs.StatFs>
        
        异步的 statfs(2)。 返回有关包含 path 的已安装文件系统的信息。 回调有两个参数 (err, stats)，其中 stats 是 <fs.StatFs> 对象。
*/

fs.statfs(filePath, { bufgint: true }, (err, stats) => {
    if (err) throw new Error(err);
    console.log(stats, 'stats');
    /* 
        statfs.bavail #非特权用户可用的空闲块。

        statfs.bfree#文件系统中的空闲块。

        statfs.blocks #文件系统中的总数据块。

        statfs.bsize #最佳传输块大小。

        statfs.ffree #文件系统中的空闲文件节点。

        statfs.files #文件系统中的文件节点总数。

        statfs.type #文件系统的类型。
    */
})
```

#### 文件是否存在

> fs.exists(path, callback)

```
方法说明：

测试某个路径下的文件是否存在。

回调函数包含一个参数exists，true则文件存在，否则是false。

语法：

复制代码代码如下:

fs.exists(path, callback)
由于该方法属于fs模块，使用前需要引入fs模块（var fs= require(“fs”) ）

接收参数：

path 欲检测的文件路径

callback 回调
```



#### 移动文件或目录

```
fs.rename(oldPath, newPath, callback)


```

#### 删除文件

```
/* 
    fs.unlink(path, callback)
        path <string> | <Buffer> | <URL>
        callback <Function>
            err <Error>

    异步地删除文件或符号链接。 除了可能的异常之外，没有为完成回调提供任何参数。

    fs.unlink() 不适用于目录，无论是空目录还是其他目录。 要删除目录，请使用 fs.rmdir()。

*/

const filePath = path.resolve(path.dirname(__filename), 'auto_mkdir')

fs.mkdir(filePath, {recursive: true},(err, mkdirPath) => { // 创建一个目录
    if (err) throw new Error(err);
    const buf = Buffer.from('你好！我是自动创建的文件，学习node时只有用心学，并不会难！')
    const _path = path.resolve(filePath, 'text.text')
    fs.writeFile(_path, buf, (err) => { // 创建一个文件
        if (err) throw new Error(err);
        setTimeout(() => {
            fs.unlink(_path, (err) => { // 删除一个目录
                if (err) throw new Error(err);
                console.log(`${_path}------> 文件删除成功！！！！！`)
            })
        }, 2000);
    })

})


```

fs.unlink() 不适用于目录，无论是空目录还是其他目录。 要删除目录，请使用 fs.rmdir()。

#### 删除目录

```
/* 
    fs.rmdir(path[, options], callback)
        path <string> | <Buffer> | <URL>
        options <Object>
            maxRetries <integer> 如果遇到 EBUSY、EMFILE、ENFILE、ENOTEMPTY 或 EPERM 错误，Node.js 将在每次尝试时以 retryDelay 毫秒的线性退避等待时间重试该操作。 此选项表示重试次数。 如果 recursive 选项不为 true，则忽略此选项。 默认值: 0。
            recursive <boolean> 如果为 true，则执行递归目录删除。 在递归模式下，操作将在失败时重试。 默认值: false。 已弃用。
            retryDelay <integer> 重试之间等待的时间（以毫秒为单位）。 如果 recursive 选项不为 true，则忽略此选项。 默认值: 100。
        callback <Function>
            err <Error>


异步的 rmdir(2)。 除了可能的异常之外，没有为完成回调提供任何参数。

在文件（而不是目录）上使用 fs.rmdir()，则在 Windows 上会导致 ENOENT 错误，在 POSIX 上会导致 ENOTDIR 错误。

要获得类似于 rm -rf Unix 命令的行为，则使用具有选项 { recursive: true, force: true } 的 fs.rm()。

*/

const filePath = path.resolve(path.dirname(__filename), 'auto_mkdir');

fs.mkdir(filePath, (err) => {
    if (err) throw new Error(err);
    console.log(`创建目录 ---${filePath} ---- 成功`);
    setTimeout(() => {
        fs.rmdir(filePath, (err) => {
            if (err) throw new Error(err);
            console.log(`删除目录 ---${filePath} ---- 成功`);
        })
    }, 2000);
})

```

#### 截断文件

```
const path = require('path');
const fs = require('fs');
const { Buffer } = require('buffer');
const { ancientPoetry } = require('./data');

/* 
    fs.ftruncate(fd[, len], callback)
        fd <integer>
        len <integer> 默认值： 0
        callback <Function>
            err <Error>
    
    截断文件描述符。 除了可能的异常之外，没有为完成回调提供任何参数。

    有关更多详细信息，请参阅 POSIX ftruncate(2) 文档。

    如果文件描述符引用的文件大于 len 个字节，则文件中将仅保留前 len 个字节。
*/
const pathFile = path.resolve(__dirname, 'readFile/text.text')

fs.open(pathFile, 'r+', (err, fd) => { // 开启文件
    if (err) throw new Error(err);
    fs.ftruncate(fd, 1, (err) => { // 截取文件
        if (err) throw new Error(err);
        fs.close(fd); // 关闭文件
    })
});


```

#### 监视文件或目录

```js
fs.watchFile(filename[, options], listener)

let fs = require('fs');
fs.watchFile('1.txt', (curr, prev) => { //curr当前状态   之前状态prev

  //parse() 方法可解析一个日期时间字符串，并返回 1970/1/1 午夜距离该日期时间的毫秒数。
  if(Date.parse(prev.ctime)==0){
    console.log('创建');
  }else if(Date.parse(curr.ctime)==0){
    console.log('删除');
  }else if(Date.parse(prev.ctime) != Date.parse(curr.ctime)){
    console.log('修改');
  }
});


```

````
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


````

### 递归创建目录

#### 同步创建目录
fs.accessSync() 是 Node.js 文件系统模块（fs 模块）中的一个同步方法，用于检查文件或目录是否存在，并且是否具有指定的权限。

fs.accessSync() 方法的作用是检查指定的文件或目录是否存在，并且当前用户是否具有指定的权限（例如读、写、执行等）。如果文件或目录不存在，或者用户没有足够的权限，该方法将抛出一个错误，否则该方法将正常返回。

```js
let fs=require('fs');
let path=require('path');
function makepSync(dir) {
    let parts=dir.split(path.sep);
    for (let i=1;i<=parts.length;i++){
        let parent=parts.slice(0,i).join(path.sep);
        try {
            fs.accessSync(parent);
        } catch (error) {
            fs.mkdirSync(parent);
        }
    }
}

```

#### 异步创建目录

```js
function makepAsync(dir,callback) {
    let parts=dir.split(path.sep);
    let i=1;
    function next() {
        if (i>parts.length)
            return callback&&callback();    
        let parent=parts.slice(0,i++).join(path.sep);
        fs.access(parent,err => {
            if (err) {
                fs.mkdir(parent,next);
            } else {
                next();
            }
        });
   }
    next();
}
```



## URL模块



在头部输入以下代码: `const url = require("url");`

## url模块提供的方法

url模块目前提供三个方法url.parse(),url.format(),url.resolve();

#### url.parse(urlStr,[boolean],[boolean])

接口作用:解析一个url地址,返回一个url对象

参数:第一个参数 url地址字符串,第二个参数 为布尔值,默认false,当值为true,返回的url对象中query属性返回的是一个对象,第三个参数 为布尔值,默认false,如果设为 true,则//之后至下一个/之前的字符串会解析作为host.例如,//foo/bar会解析为{host:'foo',pathname:'/bar'} 而不是 {pathname:'//foo/bar'}.

示例代码:

```
let parseUrl = "https://www.google.com?q=node.js";
let urlObj = url.parse(parseUrl,true);
console.log(urlObj);


```

返回:

```js
PS E:\项目\nodejs> node url.js
Url {
  protocol: 'https:',
  slashes: true,
  auth: null,
  host: 'www.google.com',
  port: null,
  hostname: 'www.google.com',
  hash: null,
  search: '?q=node.js',
  query: [Object: null prototype] { q: 'node.js' },
  pathname: '/',
  path: '/?q=node.js',
  href: 'https://www.google.com/?q=node.js' }

```

#### url.format(urlObj)

接口作用:接受一个url对象,返回一个url字符串

参数:第一个参数 是一个url对象,具体参数见代码

示例代码:

```
let urlObj = {
    protocol: 'https:',
    slashes: true,
    auth: null,
    host: 'www.google.com',
    port: null,
    hostname: 'www.google.com',
    hash: null,
    search: '?q=node.js',
    query: '?q=node.js',
    pathname: '/',
    path: '/?q=node.js',
};
let objFormatUrl = url.format(urlObj);
console.log(objFormatUrl);


```

返回:

```
PS E:\项目\nodejs> node url.js
https://www.google.com/?q=node.js


```

#### url.resolve(from,to)

接口作用:拼接字符串网址

参数:第一个参数 拼接时相对的基本URL,第二个参数 要拼接的另一个url.

示例代码:

```
let urlAddress = url.resolve("https://www.google.com","image");
console.log(urlAddress);


```

返回:

```
PS E:\项目\nodejs> node url.js
https://www.google.com/image

```



## HTTP模块

HTTP全称是超文本传输协议，构建于TCP之上，属于应用层协议。

### 创建HTTP服务器

```
let server  = http.createServer([requestListener]);
server.on('request',requestListener);


```

- requestListener 当服务器收到客户端的连接后执行的处理
  - http.IncomingMessage 请求对象
  - http.ServerResponse对象 服务器端响应对象

### 启动HTTP服务器

```
server.listen(port,[host],[backlog],[callback]);
server.on('listening',callback);


```

- port 监听的端口号
- host 监听的地址
- backlog 指定位于等待队列中的客户端连接数

```
let http = require('http');
let server = http.createServer(function(req,res){
}).listen(8080,'127.0.0.1',function(){console.log('服务器端开始监听!')});


```

### 关闭HTTP服务器

```
server.close();
server.on('close',function(){});

let http = require('http');
let server = http.createServer(function(req,res){
});
server.on('close',function(){
    console.log('服务器关闭');
});
server.listen(8080,'127.0.0.1',function(){
    console.log('服务器端开始监听!')
    server.close();
});


```

### 监听服务器错误

```
server.on('error',function(){
    if(e.code == 'EADDRINUSE'){
         console.log('端口号已经被占用!);   
    }
});


```

### connection

```
let server = http.createServer(function(req,res){
});
server.on('connection',function(){
    console.log(客户端连接已经建立);
});


```

### setTimeout

设置超时时间，超时后不可再复用已经建立的连接，需要发请求需要重新建立连接。默认超时时间时2分钟

```
server.setTimeout(msecs,callback);
server.on('timeout',function(){
    console.log('连接已经超时');
});


```

### 获取客户端请求信息

- request

  - method 请求的方法

  - url 请求的路径

  - headers 请求头对象

    ```js
    {
      host: '127.0.0.1:3001',
      connection: 'keep-alive',
      'content-length': '13',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.190 Safari/537.36',
      'content-type': 'application/json;charset=UTF-8',
      accept: '*/*',
      origin: 'http://127.0.0.1:5502',
      'sec-fetch-site': 'same-site',
      'sec-fetch-mode': 'cors',
      'sec-fetch-dest': 'empty',
      referer: 'http://127.0.0.1:5502/',
      'accept-encoding': 'gzip, deflate, br',
      'accept-language': 'zh-CN,zh;q=0.9'
    }
    ```

    

  - httpVersion 客户端的http版本

  - socket 监听客户端请求的socket对象

    ```js
    let http = require('http');
    let fs = require('fs');
    let server = http.createServer(function(req,res){
      if(req.url != '/favicon.ico'){
      let out = fs.createWriteStream(path.join(__dirname,'request.log'));
      out.write('method='+req.method);
      out.write('url='+req.url);
      out.write('headers='+JSON.stringify(req.headers));
      out.write('httpVersion='+req.httpVersion);
    }
    }).listen(8080,'127.0.0.1);
    ```

```
let http = require('http');
let fs = require('fs');
let server = http.createServer(function(req,res){
  let body = [];
  req.on('data',function(data){
    body.push(data);
  });
  req.on('end',function(){
      let result = Buffer.concat(body);
      console.log(result.toString());
  });
}).listen(8080,'127.0.0.1);


```

### querystring

![image-20201031200627838](G:/node%E8%A7%86%E9%A2%91/day12/%E8%AF%BE%E4%BB%B6%E7%AC%94%E8%AE%B0/assets/image-20201031200627838.png)

querystring模块用来转换URL字符串和URL中的查询字符串

#### parse方法用来把字符串转换成对象

- `str`  要解析的 URL 查询字符串。
- `sep`  用于在查询字符串中分隔键值对的子字符串。**默认值:** `'&'`。
- `eq` 用于在查询字符串中分隔键和值的子字符串。**默认值:** `'='`。
- options
  - `decodeURIComponent` 当解码查询字符串中的百分比编码字符时使用的函数。**默认值:** `querystring.unescape()`。
  - `maxKeys` 指定要解析的键的最大数量。指定 `0` 可移除键的计数限制。**默认值:** `1000`。

`querystring.parse()` 方法将 URL 查询字符串 `str` 解析为键值对的集合。

```
foo=bar&hello=world

querystring.parse(str,[sep],[eq],[options]);
querystring.parse('localhost:8080/user?uid=9088808','&','=')

```

#### stringify方法用来把对象转换成字符串

```
querystring.stringify(obj,[sep],[eq]);


```

### querystring

```
url.parse(urlStr,[parseQueryString]);


```

- href 被转换的原URL字符串
- protocal 客户端发出请求时使用的协议
- slashes 在协议与路径之间是否使用了//分隔符
- host URL字符串中的完整地址和端口号
- auth URL字符串中的认证部分
- hostname URL字符串中的完整地址
- port URL字符串中的端口号
- pathname URL字符串的路径，不包含查询字符串
- search 查询字符串，包含?
- path 路径，包含查询字符串
- query 查询字符串，不包含起始字符串`?`
- hash 散列字符串，包含`#`

### 发送服务器响应流

http.ServerResponse对象表示响应对象

#### writeHead

```
response.writeHead(statusCode,[reasonPhrase],[headers]);


```

- content-type 内容类型
- location 将客户端重定向到另外一个URL地址
- content-disposition 指定一个被下载的文件名
- content-length 服务器响应内容的字节数
- set-cookie 在客户端创建Cookie
- content-encoding 指定服务器响应内容的编码方式
- cache-cache 开启缓存机制
- expires 用于制定缓存过期时间
- etag 指定当服务器响应内容没有变化不重新下载数据

#### Header

设置、获取和删除Header

```
response.setHeader('Content-Type','text/html;charset=utf-8');
response.getHeader('Content-Type');
response.removeHeader('Content-Type');
response.headersSent 判断响应头是否已经发送


```

#### headersSent

判断响应头是否已经发送

```
let http = require('http');
let server = http.createServer(function(req,res){
  console.log(resopnse.headersSent?"响应头已经发送":"响应头未发送!");
  res.writeHead(200,'ok);
  console.log(resopnse.headersSent?"响应头已经发送":"响应头未发送!");
});


```

#### sendDate

不发送Date

```
res.sendDate = false;


```

#### write

可以使用write方法发送响应内容

```
response.write(chunk,[encoding]);
response.end([chunk],[encoding]);


```

#### timeout

可以使用setTimeout方法设置响应让超时时间，如果在指定时间内不响应，则触发timeout事件

```
response.setTimeout(msecs,[callback]);
response.on('timeout',callback);

```

#### close

在响应对象的end方法被调用之前，如果连接中断，将触发http.ServerResponse对象的close事件

```
response.on('close',callback);


```

#### parser

获取地址信息

```
Url {
  protocol: 'http:',
  slashes: true,
  auth: null,
  host: 'www.baidu.com',
  port: null,
  hostname: 'www.baidu.com',
  hash: null,
  search: null,
  query: null,
  pathname: '/',
  path: '/',
  href: 'http://www.baidu.com/' }


```

## HTTP客户端

### 向其他网站请求数据

```
let req = http.request(options,callback);
req.on('request',callback);
request.write(chunk,[encoding]);
request.end([chunk],[encoding]);



```

- host 指定目标域名或主机名
- hostname 指定目标域名或主机名，如果和host都指定了，优先使用hostname
- port 指定目标服务器的端口号
- localAddress 本地接口
- socketPath 指定Unix域端口
- method 指定HTTP请求的方式
- path 指定请求路径和查询字符串
- headers 指定客户端请求头对象
- auth 指定认证部分
- agent 用于指定HTTP代理，在Node.js中，使用http.Agent类代表一个HTTP代理，默认使用keep-alive连接，同时使用http.Agent对象来实现所有的HTTP客户端请求

```
let http = require('http');
let options = {
    hostname: 'localhost',
    port: 8080,
    path: '/',
    method: 'GET'
}
let req = http.request(options, function (res) {
    console.log('状态吗:' + res.statusCode);
    console.log('响应头:' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log('响应内容', chunk);
    });
});
req.end();


```

### 取消请求

可以使用abort方法来终止本次请求

```
req.abort();


```

### 监听error事件

如果请求过程中出错了，会触发error事件

```
request.on('error',function(err){});


```

### socket

建立连接过程中，为该连接分配端口时，触发`socket`事件

```
req.on('socket',function(socket){
  socket.setTimeout(1000);
  socket.on('timeout',function(){req.abort()});
});


```

### get

可以使用get方法向服务器发送数据

```
http.get(options,callback);


```

### addTrailers

可以使用response对象的addTrailers方法在服务器响应尾部追加一个头信息

```
let http = require('http');
let path = require('path');
let crypto = require('crypto');


let server = http.createServer(function (req, res) {
    res.writeHead(200, {
        'Transfer-Encoding': 'chunked',
        'Trailer': 'Content-MD5'
    });
    let rs = require('fs').createReadStream(path.join(__dirname, 'msg.txt'), {
        highWaterMark: 2
    });
    let md5 = crypto.createHash('md5');
    rs.on('data', function (data) {
        console.log(data);
        res.write(data);
        md5.update(data);
    });
    rs.on('end', function () {
        res.addTrailers({
            'Content-MD5': md5.digest('hex')
        });
        res.end();
    });
}).listen(8080);

let http = require('http');
let options = {
    hostname: 'localhost',
    port: 8080,
    path: '/',
    method: 'GET'
}
let req = http.request(options, function (res) {
    console.log('状态吗:' + res.statusCode);
    console.log('响应头:' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log('响应内容', chunk);
    });
    res.on('end', function () {
        console.log('trailer', res.trailers);
    });
});
req.end();


```

### 制作代理服务器

```
let http = require('http');
let url = require('url');
let server = http.createServer(function (request, response) {
    let {
        path
    } = url.parse(request.url);
    let options = {
        host: 'localhost',
        port: 9090,
        path: path,
        headers: request.headers
    }
    let req = http.get(options, function (res) {
        console.log(res);
        response.writeHead(res.statusCode, res.headers);
        res.pipe(response);
    });
    req.on('error', function (err) {
        console.log(err);
    });
    request.pipe(req);
}).listen(8080);

```



## 前后端数据交互

#### form表单提交数据

##### 表单属性

| accept         | *MIME_type*                                                  | HTML 5 中不支持。                        |
| -------------- | ------------------------------------------------------------ | ---------------------------------------- |
| accept-charset | *charset_list*                                               | 规定服务器可处理的表单数据字符集。       |
| action         | *URL*                                                        | 规定当提交表单时向何处发送表单数据。     |
| autocomplete   | onoff                                                        | 规定是否启用表单的自动完成功能。         |
| enctype        | application/x-www-form-urlencoded /multipart/form-data/text/plain | 规定在发送表单数据之前如何对其进行编码。 |
| method         | getpost                                                      | 规定用于发送 form-data 的 HTTP 方法。    |
| name           | *form_name*                                                  | 规定表单的名称。                         |
| novalidate     | novalidate                                                   | 如果使用该属性，则提交表单时不进行验证。 |
| target         | _blank_self_parent_top*framename*                            | 规定在何处打开 action URL。              |



enctype 属性规定在发送到服务器之前应该如何对表单数据进行编码。

默认地，表单数据会编码为 "application/x-www-form-urlencoded"。就是说，在发送到服务器之前，所有字符都会进行编码（空格转换为 "+" 加号，特殊符号转换为 ASCII HEX 值）。

| 值                                | 描述                                                         |
| :-------------------------------- | :----------------------------------------------------------- |
| application/x-www-form-urlencoded | 在发送前编码所有字符（默认）key=value&key=value              |
| multipart/form-data               | 不对字符编码。在使用包含文件上传控件的表单时，必须使用该值。 |
| text/plain                        | 空格转换为 "+" 加号，但不对特殊字符编码。keyvalue            |

##### multiparty模块处理form表单

```js
npm install multiparty
```





#### 常用MIME对应content-type

```json
{
  "css": "text/css",
  "gif": "image/gif",
  "html": "text/html",
  "ico": "image/x-icon",
  "jpeg": "image/jpeg",
  "jpg": "image/jpeg",
  "js": "text/javascript",
  "json": "application/json",
  "pdf": "application/pdf",
  "png": "image/png",
  "svg": "image/svg+xml",
  "swf": "application/x-shockwave-flash",
  "tiff": "image/tiff",
  "txt": "text/plain",
  "wav": "audio/x-wav",
  "wma": "audio/x-ms-wma",
  "wmv": "video/x-ms-wmv",
  "xml": "text/xml"
}
```



### AJAX 异步交互

Asynchronous JavaScript + XML（异步JavaScript和XML）, 其本身不是一种新技术，而是一个在 2005年被Jesse James Garrett提出的新术语，用来描述一种使用现有技术集合的‘新’方法，包括: [HTML](https://developer.mozilla.org/en-US/docs/HTML) 或 [XHTML](https://developer.mozilla.org/en-US/docs/XHTML),  [CSS](https://wiki.developer.mozilla.org/en-US/docs/Web/CSS), [JavaScript](https://developer.mozilla.org/en-US/docs/JavaScript), [DOM](https://wiki.developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model), [XML](https://developer.mozilla.org/en-US/docs/XML), [XSLT](https://developer.mozilla.org/en-US/docs/XSLT), 以及最重要的 [`XMLHttpRequest`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)。当使用结合了这些技术的AJAX模型以后， 网页应用能够快速地将增量更新呈现在用户界面上，而不需要重载（刷新）整个页面。这使得程序能够更快地回应用户的操作。

尽管X在Ajax中代表XML, 但由于[JSON](https://developer.mozilla.org/zh-CN/docs/Glossary/JSON)的许多优势，比如更加轻量以及作为Javascript的一部分，目前JSON的使用比XML更加普遍。JSON和XML都被用于在Ajax模型中打包信息。



#### 核心 XMLHttpRequest

`XMLHttpRequest`（XHR）对象用于与服务器交互。通过 XMLHttpRequest 可以在不刷新页面的情况下请求特定 URL，获取数据。这允许网页在不影响用户操作的情况下，更新页面的局部内容。`XMLHttpRequest` 在 [AJAX](https://developer.mozilla.org/zh-CN/docs/Glossary/AJAX) 编程中被大量使用。



<iframe class="live-sample-frame inheritance-diagram-frame" frameborder="0" height="150" id="frame_inheritance_diagram" src="https://mdn.mozillademos.org/zh-CN/docs/Web/API/XMLHttpRequest$samples/inheritance_diagram?revision=1624671" width="650" style="margin: 0px; padding: 0px; border: 0px; max-width: 100%; color: rgb(51, 51, 51); font-family: Arial, x-locale-body, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: -0.04448px; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial;"></iframe>

尽管名称如此，`XMLHttpRequest` 可以用于获取任何类型的数据，而不仅仅是 XML。它甚至支持 [HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP) 以外的协议（包括 file:// 和 FTP），尽管可能受到更多出于安全等原因的限制。

```js
let xhr = new XMLHttpRequest()
```



#### 属性

*此接口继承了 [`XMLHttpRequestEventTarget`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequestEventTarget) 和 [`EventTarget`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget) 的属性。*

- [`XMLHttpRequest.onreadystatechange`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/onreadystatechange)

  当 `readyState` 属性发生变化时，调用的 [`EventHandler`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventHandler)。

  ```js
  var xhr= new XMLHttpRequest(),
      method = "GET",
      url = "https://developer.mozilla.org/";
  
  xhr.open(method, url, true);
  xhr.onreadystatechange = function () {
    if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      console.log(xhr.responseText)
    }
  }
  xhr.send();
  ```

  

- [`XMLHttpRequest.readyState`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/readyState) 只读

  返回 一个无符号短整型（`unsigned short`）数字，代表请求的状态码。

  **XMLHttpRequest.readyState** 属性返回一个 XMLHttpRequest 代理当前所处的状态。一个 XHR 代理总是处于下列状态中的一个：

  | 值   | 状态               | 描述                                                |
  | ---- | ------------------ | --------------------------------------------------- |
  | `0`  | `UNSENT`           | 代理被创建，但尚未调用 open() 方法。                |
  | `1`  | `OPENED`           | `open()` 方法已经被调用。                           |
  | `2`  | `HEADERS_RECEIVED` | `send()` 方法已经被调用，并且头部和状态已经可获得。 |
  | `3`  | `LOADING`          | 下载中； `responseText` 属性已经包含部分数据。      |
  | `4`  | `DONE`             | 下载操作已完成。                                    |

  - UNSENT

    XMLHttpRequest 代理已被创建， 但尚未调用 open() 方法。

  - OPENED

    open() 方法已经被触发。在这个状态中，可以通过 [setRequestHeader()](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/setRequestHeader) 方法来设置请求的头部， 可以调用 [send()](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/send) 方法来发起请求。

  - HEADERS_RECEIVED

    send() 方法已经被调用，响应头也已经被接收。

  - LOADING

    响应体部分正在被接收。如果 `responseType` 属性是“text”或空字符串， `responseText` 将会在载入的过程中拥有部分响应数据。

  - DONE

    请求操作已经完成。这意味着数据传输已经彻底完成或失败。

  

- [`XMLHttpRequest.response`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/response) 只读

  返回一个 [`ArrayBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/API/ArrayBuffer)、[`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)、[`Document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document)，或 [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMString)，具体是哪种类型取决于 [`XMLHttpRequest.responseType`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/responseType) 的值。其中包含整个响应实体（response entity body）。

- [`XMLHttpRequest.responseText`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/responseText) 只读

  返回一个 [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMString)，该 [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMString) 包含对请求的响应，如果请求未成功或尚未发送，则返回 `null`。

- [`XMLHttpRequest.responseType`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/responseType)

  一个用于定义响应类型的枚举值（enumerated value）。

  - `""`

    `responseType` 为空字符串时，采用默认类型 [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMString)，与设置为 `text` 相同。

  - `arraybuffer`

    [`response`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/response) 是一个包含二进制数据的 JavaScript [`ArrayBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)。

  - `blob`

    `response` 是一个包含二进制数据的 [`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob) 对象 。

  - `document`

    `response` 是一个 [HTML](https://developer.mozilla.org/zh-CN/docs/Glossary/HTML) [`Document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document) 或 [XML](https://developer.mozilla.org/zh-CN/docs/Glossary/XML) [`XMLDocument`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLDocument)，这取决于接收到的数据的 MIME 类型。请参阅 [XMLHttpRequest 中的 HTML](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/HTML_in_XMLHttpRequest) 以了解使用 XHR 获取 HTML 内容的更多信息。

  - `json`

    `response` 是一个 JavaScript 对象。这个对象是通过将接收到的数据类型视为 [JSON](https://developer.mozilla.org/zh-CN/docs/Glossary/JSON) 解析得到的。

  - `text`

    `response` 是一个以 [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMString) 对象表示的文本。

  - `ms-stream` 

    `response` 是下载流的一部分；此响应类型仅允许下载请求，并且仅受 Internet Explorer 支持。

  

- [`XMLHttpRequest.status`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/status) 只读

  返回一个无符号短整型（`unsigned short`）数字，代表请求的响应状态。

  ##### **状态码分类:**

  ![image-20201030200249490](G:/node%E8%A7%86%E9%A2%91/day14/%E8%AF%BE%E4%BB%B6%E7%AC%94%E8%AE%B0/assets/image-20201030200249490.png)

  ##### **常见状态码**:

  ![image-20201030200342337](G:/node%E8%A7%86%E9%A2%91/day14/%E8%AF%BE%E4%BB%B6%E7%AC%94%E8%AE%B0/assets/image-20201030200342337.png)

- [`XMLHttpRequest.statusText`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/statusText) 只读

  返回一个 [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMString)，其中包含 HTTP 服务器返回的响应状态。与 [`XMLHTTPRequest.status`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHTTPRequest/status) 不同的是，它包含完整的响应状态文本（例如，"`200 OK`"）。**注意：**根据 HTTP/2 规范（[8.1.2.4](https://http2.github.io/http2-spec/#rfc.section.8.1.2.4) [Response Pseudo-Header Fields](https://http2.github.io/http2-spec/#HttpResponse)，响应伪标头字段），HTTP/2 没有定义任何用于携带 HTTP/1.1 状态行中包含的版本（version）或者原因短语（reason phrase）的方法。

- [`XMLHttpRequest.timeout`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/timeout)

  一个无符号长整型（`unsigned long`）数字，表示该请求的最大请求时间（毫秒），若超出该时间，请求会自动终止。

  ```js
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/server', true);
  
  xhr.timeout = 2000; // 超时时间，单位是毫秒
  
  xhr.onload = function () {
    // 请求完成。在此进行处理。
  };
  
  xhr.ontimeout = function (e) {
    // XMLHttpRequest 超时。在此做某事。
  };
  
  xhr.send(null);
  ```

  

- [`XMLHttpRequest.withCredentials`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/withCredentials)

  一个[`布尔值`](https://developer.mozilla.org/zh-CN/docs/Web/API/Boolean)，用来指定跨域 `Access-Control` 请求是否应当带有授权信息，如 cookie 或授权 header 头。

   属性是一个[`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Boolean)类型，它指示了是否该使用类似cookies,authorization headers(头部授权)或者TLS客户端证书这一类资格证书来创建一个跨站点访问控制（cross-site `Access-Control`）请求。在同一个站点下使用`withCredentials属性是无效的。`

  `此外，这个指示`也会被用做`响应中`cookies 被忽视的标示。默认值是false。

  如果在发送来自其他域的XMLHttpRequest请求之前，未设置`withCredentials` 为true，那么就不能为它自己的域设置cookie值。而通过设置`withCredentials` 为true获得的第三方cookies，将会依旧享受同源策略，因此不能被通过[document.cookie](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie)或者从头部相应请求的脚本等访问。

#### 方法

- [`XMLHttpRequest.abort()`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/abort)

  如果请求已被发出，则立刻中止请求。

- [`XMLHttpRequest.getAllResponseHeaders()`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/getAllResponseHeaders)

  以字符串的形式返回所有用 [CRLF](https://developer.mozilla.org/zh-CN/docs/Glossary/CRLF) 分隔的响应头，如果没有收到响应，则返回 `null`。

- [`XMLHttpRequest.getResponseHeader()`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/getResponseHeader)

  返回包含指定响应头的字符串，如果响应尚未收到或响应中不存在该报头，则返回 `null`。

- [`XMLHttpRequest.open()`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/open)

  初始化一个请求。该方法只能在 JavaScript 代码中使用，若要在 native code 中初始化请求，请使用 [`openRequest()`](https://developer.mozilla.org/zh-CN/docs/Mozilla/Tech/XPCOM/Reference/Interface/nsIXMLHttpRequest)。

  ```js
  xhrReq.open(method, url);
  xhrReq.open(method, url, async);
  xhrReq.open(method, url, async, user);
  xhrReq.open(method, url, async, user, password);
  ```

  ##### 参数

  - `method`

    要使用的HTTP方法，比如「GET」、「POST」、「PUT」、「DELETE」、等。对于非HTTP(S) URL被忽略。

  - `url`

    一个[`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMString)表示要向其发送请求的URL。

  - `async` 可选

    一个可选的布尔参数，表示是否异步执行操作，默认为`true`。如果值为`false`，`send()`方法直到收到答复前不会返回。如果`true`，已完成事务的通知可供事件监听器使用。如果`multipart`属性为`true`则这个必须为`true`，否则将引发异常。**注意：**主线程上的同步请求很容易破坏用户体验，应该避免；实际上，许多浏览器已完全弃用主线程上的同步XHR支持。在 [`Worker`](https://developer.mozilla.org/zh-CN/docs/Web/API/Worker)中允许同步请求

  - `user` 可选

    可选的用户名用于认证用途；默认为`null`。

  - `password` 可选

    可选的密码用于认证用途，默认为`null`。

- [`XMLHttpRequest.overrideMimeType()`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/overrideMimeType)

  覆写由服务器返回的 MIME 类型。

- [`XMLHttpRequest.send()`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/send)

  方法用于发送 HTTP 请求。如果是异步请求（默认为异步请求），则此方法会在请求发送后立即返回；如果是同步请求，则此方法直到响应到达后才会返回。XMLHttpRequest.send() 方法接受一个可选的参数，其作为请求主体；如果请求方法是 GET 或者 HEAD，则应将请求主体设置为 null。

  ##### 参数

  - `body` 可选

    在XHR请求中要发送的数据体. 可以是:可以为 [`Document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document), 在这种情况下，它在发送之前被序列化.为 `XMLHttpRequestBodyInit`, 从 [per the Fetch spec](https://fetch.spec.whatwg.org/#typedefdef-xmlhttprequestbodyinit) （规范中）可以是 [`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob), [`BufferSource`](https://developer.mozilla.org/zh-CN/docs/Web/API/BufferSource), [`FormData`](https://developer.mozilla.org/zh-CN/docs/Web/API/FormData), [`URLSearchParams`](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams), 或者 [`USVString`](https://developer.mozilla.org/zh-CN/docs/Web/API/USVString) 对象.`null`如果body没有指定值，则默认值为 `null` .

- [`XMLHttpRequest.setRequestHeader()`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/setRequestHeader)

  设置 HTTP 请求头的值。必须在 `open()` 之后、`send()` 之前调用 `setRequestHeader()` 方法。

#### 事件

- [`abort`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/abort_event)

  当 request 被停止时触发，例如当程序调用 [`XMLHttpRequest.abort()`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/abort) 时。 也可以使用 [`onabort`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequestEventTarget/onabort) 属性。

- [`error`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/error_event)

  当 request 遭遇错误时触发。 也可以使用 [`onerror`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequestEventTarget/onerror) 属性

- [`load`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/load_event)

  [`XMLHttpRequest`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)请求成功完成时触发。 也可以使用 [`onload`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequestEventTarget/onload) 属性.

- [`loadend`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/loadend_event)

  当请求结束时触发, 无论请求成功 ( [`load`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/load_event)) 还是失败 ([`abort`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/abort_event) 或 [`error`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/error_event))。 也可以使用 [`onloadend`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequestEventTarget/onloadend) 属性。

- [`loadstart`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/loadstart_event)

  接收到响应数据时触发。 也可以使用 [`onloadstart`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequestEventTarget/onloadstart) 属性。

- [`progress`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/progress_event)

  当请求接收到更多数据时，周期性地触发。 也可以使用 [`onprogress`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequestEventTarget/onprogress) 属性。

- [`timeout`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/timeout_event)

  在预设时间内没有接收到响应时触发。 也可以使用 [`ontimeout`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequestEventTarget/ontimeout) 属性。

### ajax封装

```js
 function ajax(options){
        options = options ||{};  //调用函数时如果options没有指定，就给它赋值{},一个空的Object
        options.type=(options.type || "GET").toUpperCase();/// 请求格式GET、POST，默认为GET
        options.dataType=options.dataType || "json";    //响应数据格式，默认json

        var params=formatParams(options.data);//options.data请求的数据

        var xhr;

        //考虑兼容性
        if(window.XMLHttpRequest){
            xhr=new XMLHttpRequest();
        }else if(window.ActiveObject){//兼容IE6以下版本
            xhr=new ActiveXobject('Microsoft.XMLHTTP');
        }

        //启动并发送一个请求
        if(options.type=="GET"){
            xhr.open("GET",options.url+"?"+params,true);
            xhr.send(null);
        }else if(options.type=="POST"){
            xhr.open("post",options.url,true);

            //设置表单提交时的内容类型
            //Content-type数据请求的格式
            xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            xhr.send(params);
        }

    //    设置有效时间
        setTimeout(function(){
            if(xhr.readySate!=4){
                xhr.abort();
            }
        },options.timeout)

    //    接收
    //     options.success成功之后的回调函数  options.error失败后的回调函数
    //xhr.responseText,xhr.responseXML  获得字符串形式的响应数据或者XML形式的响应数据
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4){
                var status=xhr.status;
                if(status>=200&& status<300 || status==304){
                  options.success&&options.success(xhr.responseText,xhr.responseXML);
                }else{
                    options.error&&options.error(status);
                }
            }
        }
    }

    //格式化请求参数
    function formatParams(data){
        var arr=[];
        for(var name in data){
            arr.push(encodeURIComponent(name)+"="+encodeURIComponent(data[name]));
        }
        arr.push(("v="+Math.random()).replace(".",""));
        return arr.join("&");

    }
```



## 同源策略(跨域)

1995年，同源政策由 Netscape 公司引入浏览器。目前，所有浏览器都实行这个政策。

最初，它的含义是指，A网页设置的 Cookie，B网页不能打开，除非这两个网页"同源"。所谓"同源"指的是"三个相同"。

> - 协议相同
> - 域名相同
> - 端口相同

举例来说，`http://www.example.com/dir/page.html`这个网址，协议是`http://`，域名是`www.example.com`，端口是`80`（默认端口可以省略）。它的同源情况如下。

> - `http://www.example.com/dir2/other.html`：同源
> - `http://example.com/dir/other.html`：不同源（域名不同）
> - `http://v2.www.example.com/dir/other.html`：不同源（域名不同）
> - `http://www.example.com:81/dir/other.html`：不同源（端口不同）

### 目的

同源政策的目的，是为了保证用户信息的安全，防止恶意的网站窃取数据。

设想这样一种情况：A网站是一家银行，用户登录以后，又去浏览其他网站。如果其他网站可以读取A网站的 Cookie，会发生什么？

很显然，如果 Cookie 包含隐私（比如存款总额），这些信息就会泄漏。更可怕的是，Cookie 往往用来保存用户的登录状态，如果用户没有退出登录，其他网站就可以冒充用户，为所欲为。因为浏览器同时还规定，提交表单不受同源政策的限制。

由此可见，"同源政策"是必需的，否则 Cookie 可以共享，互联网就毫无安全可言了。

### 限制范围

随着互联网的发展，"同源政策"越来越严格。目前，如果非同源，共有三种行为受到限制。

> （1） Cookie、LocalStorage 和 IndexDB 无法读取。
>
> （2） DOM 无法获得。
>
> （3） AJAX 请求不能发送。

虽然这些限制是必要的，但是有时很不方便，合理的用途也受到影响。下面，我将详细介绍，如何规避上面三种限制。

### 解决方案

#### JSONP（GET）

JSONP是服务器与客户端跨源通信的常用方法。最大特点就是简单适用，老式浏览器全部支持，服务器改造非常小。

它的基本思想是，网页通过添加一个``元素，向服务器请求JSON数据，这种做法不受同源政策限制；服务器收到请求后，将数据放在一个指定名字的回调函数里传回来。

首先，网页动态插入``元素，由它向跨源网址发出请求。

> ```javascript
> function addScriptTag(src) {
>   var script = document.createElement('script');
>   script.setAttribute("type","text/javascript");
>   script.src = src;
>   document.body.appendChild(script);
> }
> 
> window.onload = function () {
>   addScriptTag('http://example.com/ip?callback=foo');
> }
> 
> function foo(data) {
>   console.log('Your public IP address is: ' + data.ip);
> };
> ```



### 前端部分

```js
  <script>
    jsonpPakeage({
      url: "http://127.0.0.1:3003/jsonp",
      data: {
        a: 1,
        b: 2,
      },
      success: function (res) {
        console.log('回调函数执行')
        console.log(res)
      }
    })

    function jsonpPakeage({ url, data, success }) {
      //随机生成一个回调函数名称 fn+时间戳
      let callbackName = `fn${Date.now()}`
      //创建script标签
      let script = document.createElement('script')
      //解析data为 key=value&key=value queryString
      //'?a=1&b=2&callback=fn321341241254'
      let requestQuery = '?' + Object.entries(data).map(([key, value]) => `${key}=${value}`).
        join('&') + `&callback=${callbackName}`
      //设置src url 拼接 query参数  http://127.0.0.1:3002/jsonp?a=1&b=2&callback=fn321341241254
      console.log(url + requestQuery)
      script.src = url + requestQuery
      //script标签添加到head标签内
      document.querySelector('head').appendChild(script)
      //给window全局对象挂一个临时回调函数 fn1604583878744
      window[callbackName] = function (data) {
        data = isJSON(data) && data || data
        //二次传递参数数据给success
        success(data)
        //成功回调执行之后 删掉window上的对应临时函数
        delete window[callbackName]
         //数据拿到传递给success之后 window上的临时fn函数属性和 script标签就没用了
        document.querySelector('head').removeChild(script)

        
      }

    }

    function isJSON(json) {
      try {
        JSON.prase(str)
        return true
      } catch (err) {
        return false
      }
      return false
    }
  </script>
```

### 后端部分

```js
http.createServer((req, res) => {
    
  let pathname = url.parse(req.url).pathname
 
  // let {ext, base, name} = path.parse(pathname)
 
  if (pathname = '/jsonp') {
    // 第二个参数为true的时候把query设置成对象的格式
    let params = url.parse(req.url, true).query
    let data = JSON.stringify({ a: 1, b: 5 })

    // params对象格式
    console.log(params.callback)
    res.write(`window['${params.callback}']('${data}')`)
    res.end()
  }

}).listen(3003, function () {
  console.log('3003 启动 application/json')
}) 
```



上面代码通过动态添加``元素，向服务器`example.com`发出请求。注意，该请求的查询字符串有一个`callback`参数，用来指定回调函数的名字，这对于JSONP是必需的。

服务器收到这个请求以后，会将数据放在回调函数的参数位置返回。

> ```javascript
> foo({
>   "ip": "8.8.8.8"
> });
> ```

由于``元素请求的脚本，直接作为代码运行。这时，只要浏览器定义了`foo`函数，该函数就会立即调用。作为参数的JSON数据被视为JavaScript对象，而不是字符串，因此避免了使用`JSON.parse`的步骤。

**JSONP行为**

1、拼接一个script 标签，`，从而触发对指定地址的GET 请求（所以上面设置的type为PUT 等无效）；`
2、服务器端对该GET 请求进行处理，并返回字符串"callback(data)"；
3、前端加载完该script 资源后，执行callback(data)；
4、完成了请求。



#### CORS跨域

CORS需要浏览器和服务器同时支持。目前，所有浏览器都支持该功能，IE浏览器不能低于IE10。

整个CORS通信过程，都是浏览器自动完成，不需要用户参与。对于开发者来说，CORS通信与同源的AJAX通信没有差别，代码完全一样。浏览器一旦发现AJAX请求跨源，就会自动添加一些附加的头信息，有时还会多出一次附加的请求，但用户不会有感觉。

因此，实现CORS通信的关键是服务器。只要服务器实现了CORS接口，就可以跨源通信。

##### 两种请求

浏览器将CORS请求分成两类：简单请求（simple request）和非简单请求（not-so-simple request）。

只要同时满足以下两大条件，就属于简单请求。

> （1) 请求方法是以下三种方法之一：
>
> - HEAD
> - GET
> - POST
>
> （2）HTTP的头信息不超出以下几种字段：
>
> - Accept
> - Accept-Language
> - Content-Language
> - Last-Event-ID
> - Content-Type：只限于三个值`application/x-www-form-urlencoded`、`multipart/form-data`、`text/plain`

这是为了兼容表单（form），因为历史上表单一直可以发出跨域请求。AJAX 的跨域设计就是，只要表单可以发，AJAX 就可以直接发。

凡是不同时满足上面两个条件，就属于非简单请求。

浏览器对这两种请求的处理，是不一样的。

##### 简单请求

 **基本流程**

对于简单请求，浏览器直接发出CORS请求。具体来说，就是在头信息之中，增加一个`Origin`字段。

下面是一个例子，浏览器发现这次跨源AJAX请求是简单请求，就自动在头信息之中，添加一个`Origin`字段。

> ```http
> GET /cors HTTP/1.1
> Origin: http://api.bob.com
> Host: api.alice.com
> Accept-Language: en-US
> Connection: keep-alive
> User-Agent: Mozilla/5.0...
> ```

上面的头信息中，`Origin`字段用来说明，本次请求来自哪个源（协议 + 域名 + 端口）。服务器根据这个值，决定是否同意这次请求。

如果`Origin`指定的源，不在许可范围内，服务器会返回一个正常的HTTP回应。浏览器发现，这个回应的头信息没有包含`Access-Control-Allow-Origin`字段（详见下文），就知道出错了，从而抛出一个错误，被`XMLHttpRequest`的`onerror`回调函数捕获。注意，这种错误无法通过状态码识别，因为HTTP回应的状态码有可能是200。

如果`Origin`指定的域名在许可范围内，服务器返回的响应，会多出几个头信息字段。

> ```http
> Access-Control-Allow-Origin: http://api.bob.com
> Access-Control-Allow-Credentials: true
> Access-Control-Expose-Headers: FooBar
> Content-Type: text/html; charset=utf-8
> ```

上面的头信息之中，有三个与CORS请求相关的字段，都以`Access-Control-`开头。

**（1）Access-Control-Allow-Origin**

该字段是必须的。它的值要么是请求时`Origin`字段的值，要么是一个`*`，表示接受任意域名的请求。

**（2）Access-Control-Allow-Credentials**

该字段可选。它的值是一个布尔值，表示是否允许发送Cookie。默认情况下，Cookie不包括在CORS请求之中。设为`true`，即表示服务器明确许可，Cookie可以包含在请求中，一起发给服务器。这个值也只能设为`true`，如果服务器不要浏览器发送Cookie，删除该字段即可。

**（3）Access-Control-Expose-Headers**

该字段可选。CORS请求时，`XMLHttpRequest`对象的`getResponseHeader()`方法只能拿到6个基本字段：`Cache-Control`、`Content-Language`、`Content-Type`、`Expires`、`Last-Modified`、`Pragma`。如果想拿到其他字段，就必须在`Access-Control-Expose-Headers`里面指定。上面的例子指定，`getResponseHeader('FooBar')`可以返回`FooBar`字段的值。

 **withCredentials 属性**

上面说到，CORS请求默认不发送Cookie和HTTP认证信息。如果要把Cookie发到服务器，一方面要服务器同意，指定`Access-Control-Allow-Credentials`字段。

> ```http
> Access-Control-Allow-Credentials: true
> ```

另一方面，开发者必须在AJAX请求中打开`withCredentials`属性。

> ```javascript
> var xhr = new XMLHttpRequest();
> xhr.withCredentials = true;
> ```

否则，即使服务器同意发送Cookie，浏览器也不会发送。或者，服务器要求设置Cookie，浏览器也不会处理。

但是，如果省略`withCredentials`设置，有的浏览器还是会一起发送Cookie。这时，可以显式关闭`withCredentials`。

> ```javascript
> xhr.withCredentials = false;
> ```

需要注意的是，如果要发送Cookie，`Access-Control-Allow-Origin`就不能设为星号，必须指定明确的、与请求网页一致的域名。同时，Cookie依然遵循同源政策，只有用服务器域名设置的Cookie才会上传，其他域名的Cookie并不会上传，且（跨源）原网页代码中的`document.cookie`也无法读取服务器域名下的Cookie。

#### 非简单请求

##### **预检请求**

非简单请求是那种对服务器有特殊要求的请求，比如请求方法是`PUT`或`DELETE`，或者`Content-Type`字段的类型是`application/json`。

非简单请求的CORS请求，会在正式通信之前，增加一次HTTP查询请求，称为"预检"请求（preflight）。

浏览器先询问服务器，当前网页所在的域名是否在服务器的许可名单之中，以及可以使用哪些HTTP动词和头信息字段。只有得到肯定答复，浏览器才会发出正式的`XMLHttpRequest`请求，否则就报错。

下面是一段浏览器的JavaScript脚本。

> ```javascript
> var url = 'http://api.alice.com/cors';
> var xhr = new XMLHttpRequest();
> xhr.open('PUT', url, true);
> xhr.setRequestHeader('X-Custom-Header', 'value');
> xhr.send();
> ```

上面代码中，HTTP请求的方法是`PUT`，并且发送一个自定义头信息`X-Custom-Header`。

浏览器发现，这是一个非简单请求，就自动发出一个"预检"请求，要求服务器确认可以这样请求。下面是这个"预检"请求的HTTP头信息。

> ```http
> OPTIONS /cors HTTP/1.1
> Origin: http://api.bob.com
> Access-Control-Request-Method: PUT
> Access-Control-Request-Headers: X-Custom-Header
> Host: api.alice.com
> Accept-Language: en-US
> Connection: keep-alive
> User-Agent: Mozilla/5.0...
> ```

"预检"请求用的请求方法是`OPTIONS`，表示这个请求是用来询问的。头信息里面，关键字段是`Origin`，表示请求来自哪个源。

除了`Origin`字段，"预检"请求的头信息包括两个特殊字段。

**（1）Access-Control-Request-Method**

该字段是必须的，用来列出浏览器的CORS请求会用到哪些HTTP方法，上例是`PUT`。

**（2）Access-Control-Request-Headers**

该字段是一个逗号分隔的字符串，指定浏览器CORS请求会额外发送的头信息字段，上例是`X-Custom-Header`。

 **预检请求的回应**

服务器收到"预检"请求以后，检查了`Origin`、`Access-Control-Request-Method`和`Access-Control-Request-Headers`字段以后，确认允许跨源请求，就可以做出回应。

> ```http
> HTTP/1.1 200 OK
> Date: Mon, 01 Dec 2008 01:15:39 GMT
> Server: Apache/2.0.61 (Unix)
> Access-Control-Allow-Origin: http://api.bob.com
> Access-Control-Allow-Methods: GET, POST, PUT
> Access-Control-Allow-Headers: X-Custom-Header
> Content-Type: text/html; charset=utf-8
> Content-Encoding: gzip
> Content-Length: 0
> Keep-Alive: timeout=2, max=100
> Connection: Keep-Alive
> Content-Type: text/plain
> ```

上面的HTTP回应中，关键的是`Access-Control-Allow-Origin`字段，表示`http://api.bob.com`可以请求数据。该字段也可以设为星号，表示同意任意跨源请求。

> ```http
> Access-Control-Allow-Origin: *
> ```

如果服务器否定了"预检"请求，会返回一个正常的HTTP回应，但是没有任何CORS相关的头信息字段。这时，浏览器就会认定，服务器不同意预检请求，因此触发一个错误，被`XMLHttpRequest`对象的`onerror`回调函数捕获。控制台会打印出如下的报错信息。

> ```bash
> XMLHttpRequest cannot load http://api.alice.com.
> Origin http://api.bob.com is not allowed by Access-Control-Allow-Origin.
> ```

服务器回应的其他CORS相关字段如下。

> ```http
> Access-Control-Allow-Methods: GET, POST, PUT
> Access-Control-Allow-Headers: X-Custom-Header
> Access-Control-Allow-Credentials: true
> Access-Control-Max-Age: 1728000
> ```





**（1）Access-Control-Allow-Methods**

该字段必需，它的值是逗号分隔的一个字符串，表明服务器支持的所有跨域请求的方法。注意，返回的是所有支持的方法，而不单是浏览器请求的那个方法。这是为了避免多次"预检"请求。

**（2）Access-Control-Allow-Headers**

如果浏览器请求包括`Access-Control-Request-Headers`字段，则`Access-Control-Allow-Headers`字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段，不限于浏览器在"预检"中请求的字段。

**（3）Access-Control-Allow-Credentials**

该字段与简单请求时的含义相同。

**（4）Access-Control-Max-Age**

该字段可选，用来指定本次预检请求的有效期，单位为秒。上面结果中，有效期是20天（1728000秒），即允许缓存该条回应1728000秒（即20天），在此期间，不用发出另一条预检请求。

**Node 原生http实现**

```js
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.setheader("Access-Control-Allow-Origin", "*");
  //允许的header类型
  res.setHeader('Access-Control-Allow-Headers', 'x-requested-with,Authorization,token, content-type');
  //跨域允许的请求方式
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH");
  //可选，用来指定本次预检请求的有效期，单位为秒。在此期间，不用发出另一条预检请求。
  res.header('Access-Control-Max-Age', 1728000);//预请求缓存20天
```



**浏览器的正常请求和回应**

一旦服务器通过了"预检"请求，以后每次浏览器正常的CORS请求，就都跟简单请求一样，会有一个`Origin`头信息字段。服务器的回应，也都会有一个`Access-Control-Allow-Origin`头信息字段。

下面是"预检"请求之后，浏览器的正常CORS请求。

> ```http
> PUT /cors HTTP/1.1
> Origin: http://api.bob.com
> Host: api.alice.com
> X-Custom-Header: value
> Accept-Language: en-US
> Connection: keep-alive
> User-Agent: Mozilla/5.0...
> ```

上面头信息的`Origin`字段是浏览器自动添加的。

下面是服务器正常的回应。

> ```http
> Access-Control-Allow-Origin: http://api.bob.com
> Content-Type: text/html; charset=utf-8
> ```

上面头信息中，`Access-Control-Allow-Origin`字段是每次回应都必定包含的。

### w3c规定不容许设置的 请求头字段有

```js
`Accept-Charset`
`Accept-Encoding`
`Access-Control-Request-Headers`
`Access-Control-Request-Method`
`Connection`
`Content-Length`
`Cookie`
`Cookie2`
`Date`
`DNT`
`Expect`
`Host`
`Keep-Alive`
`Origin`
`Referer`
`TE`
`Trailer`
`Transfer-Encoding`
`Upgrade`
`Via`

```

## Cookie验证

### cookie是什么

> Cookie 是一个请求首部，其中含有先前由服务器通过 Set-Cookie 首部投放并存储到客户端的 HTTP cookies。

这是MDN上的定义

### cookie解决了什么问题

1. HTTP是无连接的，当请求结束连接就会中断所以会产生身份识别的问题。
2. 当浏览器访问服务器时，服务器会向浏览器发送一个cookie,可以理解为标识符，下次浏览器再向服务器发送请求时在上行报文中携带这个标识符（cookie）
3. 服务器就能够根据标识符做出识别，当服务器在下行报文中设置cookie的持续时间
4. 那么浏览器在一定时间内访问该服务器都会携带这个cookie
5. 所以kookie就是一个浏览器跟服务器通讯的信物，这个基础是建立在HTTP无连接
6. cookie/session的出现就是为了解决http协议无状态的弊端，为了让客户端和服务端建立长久联系而出现的。

### cookie属性

- `Name`：键值对的key

- `Value`：键值对的value

- `Domain`：可以访问该`cookie`的域名。如果设置为`.google.com`，则所有以`google.com`结尾的域名都可以访问该`cookie`。第一个字符必须为“.”。

- `Path`：指定可访问`cookie`的目录。例如：`userId=320; path=/shop`;就表示当前`cookie`仅能在shop目录下使用。

- `Expires / Max-Age`：指定过期时间；其中`GMT_String`是以`GMT`格式表示的时间字符串，超过这个时间，`cookie`将失效

- `HttpOnly`：这是微软对`cookie`做的扩张，如果在`Cookie`中设置了`HttpOnly`属性，那么通过程序讲无法读取到`cookie`信息，能够防止XSS攻击

- `Secure`：该Cookie是否仅被使用安全协议传输。安全协议。安全协议有HTTPS，SSL等，在网络上传输数据之前先将数据加密。默认为false。

- SameSite

  ：用来防止 CSRF 攻击和用户追踪。

注意：如果`cookie`不设置过期时间，当浏览器关闭的时候`cookie`就会消失

### 获取cookie

```js
var http = require('http');
http.createServer(function (req, res) {
    // 获得客户端的Cookie
    var Cookies = {};
    req.headers.cookie && req.headers.cookie.split(';').forEach(function( Cookie ) {
        var parts = Cookie.split('=');
        Cookies[ parts[ 0 ].trim() ] = ( parts[ 1 ] || '' ).trim();
    });
    console.log(Cookies)
    res.end('Hello World\n');
}).listen(8000);

```

### 设置cookie

单个设置：

```js
var http = require("http");
http.createServer(function (req, res) {
    res.writeHead(200, {
        "Set-Cookie": "myCookie=test",
        "Content-Type": "text/plain",
    });
    res.end("Hello World\n");
}).listen(8888);

```

多个设置：

```js
var http = require("http");
http.createServer(function (req, res) {
    res.writeHead(200, {
        'Set-Cookie': ["aaa=bbb","ccc=ddd","eee=fff"],
        'Content-Type': 'text/plain'
    });
    res.end("Hello World\n");
}).listen(8888);

```

设置时效：

```js
var http = require("http");
http.createServer(function (req, res) {
    // GMT时间可以通过new Date()来获取
    res.writeHead(200, {
        "Set-Cookie":"myCookie=test; Expires=Tue Jun 16 2020 21:43:13 GMT+0800 ;HttpOnly ",
        "Content-Type": "text/html",
    });
    res.end("Hello World\n");
}).listen(8888);

```

### cookie加密

一般`cookie`放的都是一些比较隐私的信息，通常都不让别人轻易看懂，这里我们需要借助一个库来帮我们完成`cookie`的加密

使用`cookie-parser`加密

```js
const express = require("express");
const cookieParser = require("cookie-parser");

var app = express();
app.use(cookieParser('secret'));

app.get("/",function(req,res){
    res.cookie("name","....",{httpOnly: true,maxAge: 10000,signed: true});
    console.log(JSON.parse(JSON.stringify(req.signedCookies)))
	res.send("主页");
});

app.listen(8080);
```

### cookie-parse(express中间件)

> 使用express框架时 可以选用的第三方 cookie操作库

安装cookie-parser第三方cookie操作模块

```undefined
npm install cookie-parser -S
```

引入

```javascript
const cookieParser = require('cookie-parser');
app.use(cookieParser('123456')); //使用cookie中间件，传入签名123456进行加密
```

设置cookie,需要设置signed签名

```javascript
res.cookies('key','value',option)
```

其中option要求是要json格式：有以下选项

- **domain**: 域名。设置子域名（二级域名）是否可以访问cookie。 例：domain:'.主域名'  name=value：键值对，可以设置要保存的 Key/Value，注意这里的 name 不能和其他属性项的名字一样
- **expires**： 过期时间（秒），在设置的某个时间点后该 Cookie 就会失效，如 expires=Wednesday, 09-Nov-99 23:12:40 GMT
- **maxAge**： 最大失效时间（毫秒），设置在多少后失效
- **secure**： 当 secure 值为 true 时， cookie 在 HTTP 中是无效，在 HTTPS 中才有效
- **path**： 表示 cookie 影响到的路由，如 path=/。如果路径不能匹配时，浏览器则不发送这个 Cookie
- **httpOnly**：默认为false,建议设置为true, 客户端将无法通过document.cookie读取到 COOKIE 信息，可防止 XSS 攻击产生
- **signed**： 表示是否签名（加密） cookie, 设为 true 会对这个 cookie 签名，这样就需要用res.signedCookies 访问它,前提需要设置上面中间件app.use传参  。未签名则用 res.cookies 访问
- **SameSite** : 属性用来限制第三方 Cookie，从而减少安全风险, 防止 CSRF 攻击和用户追踪, 被篡改的签名 cookie 会被服务器拒绝，并且 cookie值会重置为它的原始值

```javascript
  res.cookie('cart', { items: [1,2,3] }, { maxAge: 10000*4,signed:true,httpOnly:true });
  res.cookie('username', "kyogre", { maxAge: 10000*2,signed:true});
  res.cookie('age', "13",{ maxAge: 10000*3,signed:true }); 
```

获取cookie

```javascript
    console.log(req.signedCookies);
    console.log(req.signedCookies.cart);
    console.log(req.signedCookies.username);
    console.log(req.signedCookies.age);
```

删除cookie

```javascript
res.cookie('username', '大白', { maxAge:0 });
```

### ajax 与 Cookie

CORS请求默认不发送Cookie和HTTP认证信息。如果要把Cookie发到服务器，一方面要服务器同意，指定`Access-Control-Allow-Credentials`字段。

 **响应报头指示的请求的响应是否可以暴露于该页面。当true值返回时它可以被暴露。**

 凭证是 Cookie ，授权标头或 TLS 客户端证书。

 当作为对预检请求的响应的一部分使用时，它指示是否可以使用凭证进行实际请求。请注意，简单的GET请求不是预检的，所以如果请求使用凭证的资源，如果此资源不与资源一起返回，浏览器将忽略该响应，并且不会返回到 Web 内容。

> ```js
> Access-Control-Allow-Credentials: true
> 
> //注意设置跨域的时候   请求的资源（Origin）
> //第二个参数不能为*通配符， 必须指定响应的路径资源 而且只能包含origin(http://127.0.0.1:5502)   如果后年加/就表请求路劲了，就是pathname
> res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5502")
> ```

另一方面，**开发者必须在AJAX请求中打开`withCredentials`属性。**

> ```javascript
> var xhr = new XMLHttpRequest();
> 
> xhr.withCredentials = true;
> ```

否则，即使服务器同意发送Cookie，浏览器也不会发送。或者，服务器要求设置Cookie，浏览器也不会处理。

但是，如果省略`withCredentials`设置，有的浏览器还是会一起发送Cookie。这时，可以显式关闭`withCredentials`。

> ```javascript
> xhr.withCredentials = false;
> ```

*需要注意的是，如果要发送Cookie，`Access-Control-Allow-Origin`就不能设为星号，必须指定明确的、与请求网页一致的域名。*同时，Cookie依然遵循同源政策，只有用服务器域名设置的Cookie才会上传，其他域名的Cookie并不会上传，且（跨源）原网页代码中的`document.cookie`也无法读取服务器域名下的Cookie。

## Ajax自定义设置请求头

```js
//ajxa封装的参数   
requestHeader: {
          "se-headers": "withCrehentials",
          "set-withCredentials": "withCredentials"
        } //形参

// 设置自定义求情头  ajax
    if(xhr.withCredentials) {
      Object.entries(requestHeader).map(([key, value]) => {
        xhr.setRequestHeader(key, value)
      })
    }
//服务端
 res.setHeader('Access-Control-Allow-Headers', ', se-headers, set-withCredentials')

```



## Ajax库

### jquery $.ajax

文档地址: https://jquery.cuishifeng.cn/jQuery.Ajax.html

### axios

地址: https://github.com/axios/axios

#### 安装axios

```undefined
npm install axios --save
bower install axios --save
```

#### 引用

###### 直接script标签引用

```xml
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```



#### 发送一个最简单的请求

这里我们发送一个带参数的get请求，params参数放在get方法的第二个参数中，如果没有参数get方法里可以只写路径。如果请求失败捕获一下异常。



```jsx
axios
  .get('http://rap2api.taobao.org/app/mock/23080/resources/search',{
      params: {
         id: 5
      }
   })
  .then(res => {
    console.log('数据是:', res);
  })
  .catch((e) => {
    console.log('获取数据失败');
  });
```

当然，我们也可以发送一个POST请求，post方法的第二个参数为请求参数对象。



```jsx
this.$axios.post('http://rap2api.taobao.org/app/mock/121145/post',{
  name: '小月'
})
.then(function(res){
  console.log(res);
})
.catch(function(err){
  console.log(err);
});
```

#### 一次合并发送多个请求

分别写两个请求函数，利用axios的all方法接收一个由每个请求函数组成的数组，可以一次性发送多个请求，如果全部请求成功，在`axios.spread`方法接收一个回调函数，该函数的参数就是每个请求返回的结果。



```jsx
function getUserAccount(){
  return axios.get('/user/12345');
}
function getUserPermissions(){
  return axios.get('/user/12345/permissions');
}
this.$axios.all([getUserAccount(),getUserPermissions()])
  .then(axios.spread(function(res1,res2){
    //当这两个请求都完成的时候会触发这个函数，两个参数分别代表返回的结果
}))
```

#### axios的API

以上通过axios直接调用发放来发起对应的请求其实是axios为了方便起见给不同的请求提供的别名方法。我们完全可以通过调用axios的API，传递一个配置对象来发起请求。

发送post请求，参数写在data属性中



```jsx
axios({
  url: 'http://rap2api.taobao.org/app/mock/121145/post',
  method: 'post',
  data: {
    name: '小月'
  }
}).then(res => {
  console.log('请求结果：', res);
});
```

发送get请求，默认就是get请求，直接第一个参数写路径，第二个参数写配置对象，参数通过params属性设置。



```jsx
axios('http://rap2api.taobao.org/app/mock/121145/get', {
  params: {
    name: '小月'
  }
}).then(res => {
  console.log('请求结果：', res);
});
```

axios为所有请求方式都提供了别名：

- axios.request(config)
- axios.get(url, [config])
- axios.delete(url, [config])
- axios.head(url, [config])
- axios.options(url, [config])
- axios.post(url, [data], [config])
- axios.put(url, [data], [config])
- axios.patch(url, [data], [config])

#### axios配置默认值

1、可以通过axios.defaults设置全局默认值，在所有请求中都生效。



```rust
axios.defaults.headers.common["token"] = ""
axios.defaults.headers.post["Content-type"] = "application/json"
axios.defaults.baseURL = 'https://service.xxx.com; //设置统一路径前缀
```

2、也可以自定义实例的默认值，以及修改实例的配置



```csharp
// 创建时自定义默认配置，超时设置为全局默认值0秒
let ax = axios.create({
  baseURL: 'http://rap2api.taobao.org',
  params: { name: '小月' }
});
// 修改配置后，超时设置为4秒
ax.defaults.timeout = 4000; 
```

3、也可以像前面那样，在每个请求中设置相关的配置。



```csharp
axios('/app/mock/121145/get', {
  params: {
    name: 'xiaoxiao'
  },
  baseURL: 'http://rap2api.taobao.org'
})
```

> 以上配置方法优先级从1-3依次增高，更多配置选项查看文档。



```jsx
{
    method：'请求方法',
    baseURL：'如果路径不是绝对路径，就会在路径前自动添加此路径',
    transformRequest: [(data, header)=>{}], //在发送请求之前修改数据，适用于post、put、patch
    transformResponse:  [(data)=>{
        return JSON.parse(data).data;
    }], //在收到的数据传到then之前修改数据，注意这里data是个字符串类型。
    header: {'X-Requested-With': 'XMLHttpRequest'}, //请求头
    params: {}, //请求参数
    paramsSerializer: (params)=>{
        return qs.stringify(params); //name=xiaohong&id=1
    } //可选函数，可以把参数拼接成字符串
    data: {}, // post类方法的请求体参数
    timeout: 0, //请求延时事件，如果超时请求终止
    withCredentials: false, //是否时跨站点请求
    onUploadProgress: (progressEvent)=>{
        //可以通过progressEvent拿到上传的进度
    },
    onDownloadProgress: ()=>{},//和onUploadProgress一样，获取下载的进度
    responseType: json,  // 返回的数据格式
    maxContentLength: 2000, //相应内容的最大尺寸
    validateStatus: (validateStatus)=>{
        return validateStatus >= 200; //限制相应状态码，如果不满足就拒绝
    },
    cancelToken: new cancelToken(function(cancel){}) // 指定一个取消请求标识，下面会用到
}
```

#### 拦截器

可以分别设置请求拦截和响应拦截，在发出请求和响应到达then之前进行判断处理。



```tsx
axios.interceptors.response.use(
  res => {
    if (res) {
      return res;
    }
  },
  err => {
    return Promise.reject(error);
  }
);
```

以上以相应拦截器为例，请求拦截器同样，只是把response换成request。第一个参数是成功回调，第二个是错误回调。
 也可以移除拦截器，就像移除js定时器一样的操作：



```jsx
var myInterceptor = axios.interceptors.request.use(function () {/*...*/});
axios.interceptors.request.eject(myInterceptor);
```

#### 取消请求

1、取消请求的话需要先通过创建一个CancelToken.source工厂函数创建一个标识source
 2、通过配置项制定标识，这样才知道取消的是哪个请求
 3、调用取消方法



```csharp
var CancelToken = axios.CancelToken;
var source = CancelToken.source(); //1
axios.post('/user/12345', {
  name: 'new name'
}, {
  cancelToken: source.token //2
})
source.cancel('Operation canceled by the user.'); //3
```

还有一种写法是直接把cancelToken的构造函数传递给配置项，该构造函数接受一个函数作为参数，在这个函数中指定标识符。



```jsx
var CancelToken = axios.CancelToken;
var cancel;
axios.get('/app/mock/121145/get', {
  baseURL: 'http://rap2api.taobao.org',
  cancelToken: new CancelToken(function executor(c) {
    cancel = c;
  })
});
cancel();
```

#### 跨域配置

------

如果我们要跨域请求数据，在配置文件里设置代理，vue-cli3项目，需要在根目录自己创建一个vue.config.js，在里面写配置。



```java
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://www.xxx.com', //目标路径，别忘了加http和端口号
        changeOrigin: true, //是否跨域
        ws: true,
        pathRewrite: {
          '^/api': '' //重写路径
        }
      }
    }
  }
};
```

调用接口：



```bash
axios.post('/api/test', {name: 'xiao'}); 
```

如果没有重写路径，访问的就是`https://www.xxx.com/api/test`，如果像上面代码那样重写路径访问的就是`https://www.xxx.com/test`。

###### 原理：

> 因为客户端请求服务端的数据是存在跨域问题的，而服务器和服务器之间可以相互请求数据，是没有跨域的概念（如果服务器没有设置禁止跨域的权限问题），也就是说，我们可以配置一个代理的服务器可以请求另一个服务器中的数据，然后把请求出来的数据返回到我们的代理服务器中，代理服务器再返回数据给我们的客户端，这样我们就可以实现跨域访问数据啦。












类：http.Server#
新增于: v0.1.17
继承： <net.Server>

事件：'checkContinue'#
新增于: v0.3.0
request <http.IncomingMessage>
response <http.ServerResponse>
每次收到带有 HTTP Expect: 100-continue 的请求时触发。 如果未监听此事件，则服务器将根据需要自动响应 100 Continue。

如果客户端应该继续发送请求正文，则处理此事件涉及调用 response.writeContinue()，或者如果客户端不应该继续发送请求正文，则生成适当的 HTTP 响应（例如 400 Bad Request）。

处理和处理此事件时，不会触发 'request' 事件。


事件：'checkExpectation'#
新增于: v5.5.0
request <http.IncomingMessage>
response <http.ServerResponse>
每次收到带有 HTTP Expect 标头的请求时触发，其中值不是 100-continue。 如果未监听此事件，则服务器将根据需要自动响应 417 Expectation Failed。

处理和处理此事件时，不会触发 'request' 事件。


事件：'clientError'#
版本历史
exception <Error>
socket <stream.Duplex>
如果客户端连接触发 'error' 事件，则会在此处转发。 此事件的监听器负责关闭/销毁底层套接字。 例如，可能希望使用自定义 HTTP 响应更优雅地关闭套接字，而不是突然切断连接。 监听器结束前的套接字 必须关闭或销毁。

除非用户指定 <net.Socket> 以外的套接字类型，否则此事件保证传入 <net.Socket> 类（<stream.Duplex> 的子类）的实例。

默认行为是尝试使用 HTTP '400 Bad Request' 关闭套接字，或在发生 HPE_HEADER_OVERFLOW 错误时使用 HTTP '431 Request Header Fields Too Large'。 如果套接字不可写或当前附加的 http.ServerResponse 的标头已发送，则立即销毁。

socket 是错误源自的 net.Socket 对象。

const http = require('node:http');

const server = http.createServer((req, res) => {
  res.end();
});
server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});
server.listen(8000); 拷贝
当 'clientError' 事件发生时，没有 request 或 response 对象，因此发送的任何 HTTP 响应，包括响应头和负载，都必须直接写入 socket 对象。 必须注意确保响应是格式正确的 HTTP 响应消息。

err 是 Error 的实例，有两个额外的列：

bytesParsed: Node.js 可能正确解析的请求数据包的字节数；
rawPacket: 当前请求的原始数据包。
在某些情况下，客户端已经收到响应和/或套接字已经被销毁，例如 ECONNRESET 错误。 在尝试向套接字发送数据之前，最好检查它是否仍然可写。

server.on('clientError', (err, socket) => {
  if (err.code === 'ECONNRESET' || !socket.writable) {
    return;
  }

  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
}); 拷贝

事件：'close'#
新增于: v0.1.4
服务器关闭时触发。


事件：'connect'#
新增于: v0.7.0
request <http.IncomingMessage> HTTP 请求的参数，如它在 'request' 事件中
socket <stream.Duplex> 服务器和客户端之间的网络套接字
head <Buffer> 隧道流的第一个数据包（可能为空）
每次客户端请求 HTTP CONNECT 方法时触发。 如果未监听此事件，则请求 CONNECT 方法的客户端将关闭其连接。

除非用户指定 <net.Socket> 以外的套接字类型，否则此事件保证传入 <net.Socket> 类（<stream.Duplex> 的子类）的实例。

触发此事件后，请求的套接字将没有 'data' 事件监听器，这意味着需要绑定它才能处理发送到该套接字上的服务器的数据。


事件：'connection'#
新增于: v0.1.0
socket <stream.Duplex>
当建立新的 TCP 流时会触发此事件。 socket 通常是 net.Socket 类型的对象。 通常用户不会想访问这个事件。 特别是，由于协议解析器附加到套接字的方式，套接字将不会触发 'readable' 事件。 socket 也可以在 request.socket 上访问。

此事件也可以由用户显式触发，以将连接注入 HTTP 服务器。 在这种情况下，任何 Duplex 流都可以通过。

如果此处调用 socket.setTimeout()，则当套接字已服务请求时（如果 server.keepAliveTimeout 非零）超时将替换为 server.keepAliveTimeout。

除非用户指定 <net.Socket> 以外的套接字类型，否则此事件保证传入 <net.Socket> 类（<stream.Duplex> 的子类）的实例。


事件：'dropRequest'#
新增于: v18.7.0, v16.17.0
request <http.IncomingMessage> HTTP 请求的参数，如它在 'request' 事件中
socket <stream.Duplex> 服务器和客户端之间的网络套接字
当套接字上的请求数达到 server.maxRequestsPerSocket 的阈值时，服务器会丢弃新的请求并触发 'dropRequest' 事件，然后将 503 发送给客户端。


事件：'request'#
新增于: v0.1.0
request <http.IncomingMessage>
response <http.ServerResponse>
每次有请求时触发。 每个连接可能有多个请求（在 HTTP Keep-Alive 连接的情况下）。


事件：'upgrade'#
版本历史
request <http.IncomingMessage> HTTP 请求的参数，如它在 'request' 事件中
socket <stream.Duplex> 服务器和客户端之间的网络套接字
head <Buffer> 升级流的第一个数据包（可能为空）
每次客户端请求 HTTP 升级时触发。 监听此事件是可选的，客户端不能坚持协议更改。

触发此事件后，请求的套接字将没有 'data' 事件监听器，这意味着需要绑定它才能处理发送到该套接字上的服务器的数据。

除非用户指定 <net.Socket> 以外的套接字类型，否则此事件保证传入 <net.Socket> 类（<stream.Duplex> 的子类）的实例。


server.close([callback])#
版本历史
callback <Function>
停止服务器接受新连接并关闭连接到该服务器的所有未发送请求或等待响应的连接。 参见 net.Server.close()。


server.closeAllConnections()#
新增于: v18.2.0
关闭所有连接到此服务器的连接。


server.closeIdleConnections()#
新增于: v18.2.0
关闭连接到此服务器的所有未发送请求或等待响应的连接。


server.headersTimeout#
版本历史
<number> 默认值： The minimum between server.requestTimeout or 60000.
限制解析器等待接收完整 HTTP 标头的时间。

如果超时到期，则服务器以状态 408 响应而不将请求转发给请求监听器，然后关闭连接。

必须将其设置为非零值（例如 120 秒）以防止潜在的拒绝服务攻击，以防在部署服务器之前没有反向代理的情况下。


server.listen()#
启动 HTTP 服务器监听连接。 此方法与 net.Server 中的 server.listen() 相同。


server.listening#
新增于: v5.7.0
<boolean> 指示服务器是否正在监听连接。

server.maxHeadersCount#
新增于: v0.7.0
<number> 默认值： 2000
限制最大传入标头计数。 如果设置为 0，则不会应用任何限制。


server.requestTimeout#
版本历史
<number> 默认值： 300000
设置从客户端接收整个请求的超时值（以毫秒为单位）。

如果超时到期，则服务器以状态 408 响应而不将请求转发给请求监听器，然后关闭连接。

必须将其设置为非零值（例如 120 秒）以防止潜在的拒绝服务攻击，以防在部署服务器之前没有反向代理的情况下。


server.setTimeout([msecs][, callback])#
版本历史
msecs <number> 默认值： 0（无超时）
callback <Function>
返回： <http.Server>
设置套接字的超时值，并在服务器对象上触发 'timeout' 事件，如果发生超时，则将套接字作为参数传入。

如果 Server 对象上有 'timeout' 事件监听器，则将使用超时套接字作为参数调用它。

默认情况下，服务器不会超时套接字。 但是，如果将回调分配给服务器的 'timeout' 事件，则必须显式处理超时。


server.maxRequestsPerSocket#
新增于: v16.10.0
<number> 每个套接字的请求数。 默认值： 0（无限制）
关闭保持活动的连接之前，套接字可以处理的最大请求数。

0 值将禁用限制。

当达到限制时，则它会将 Connection 标头值设置为 close，但不会实际地关闭连接，达到限制后发送的后续请求将获得 503 Service Unavailable 作为响应。


server.timeout#
版本历史
<number> 以毫秒为单位的超时时间。 默认值： 0（无超时）
假定套接字超时之前不活动的毫秒数。

值 0 将禁用传入连接的超时行为。

套接字超时逻辑是在连接上设置的，因此更改此值只会影响到服务器的新连接，而不会影响任何现有连接。


server.keepAliveTimeout#
新增于: v8.0.0
<number> 以毫秒为单位的超时时间。 默认值： 5000（5 秒）。
在完成写入最后一个响应之后，在套接字将被销毁之前，服务器需要等待额外传入数据的不活动毫秒数。 如果服务器在 keep-alive 超时触发之前收到新数据，则将重置常规的不活动超时，即 server.timeout。

值 0 将禁用传入连接上的保持活动超时行为。 值 0 使 http 服务器的行为类似于 8.0.0 之前的 Node.js 版本，后者没有保持活动超时。

套接字超时逻辑是在连接上设置的，因此更改此值只会影响到服务器的新连接，而不会影响任何现有连接。