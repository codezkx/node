# node

node 基础学习

Node.js有很多强大的内置API,掌握它们是学习Node.js的基石。我推荐学习的基本API文档如下:

全局对象:这些是在Node.js全局范围内可用的对象,包括__filename、__dirname、setTimeout等。文档地址:https://nodejs.org/dist/latest-v12.x/docs/api/globals.html

文件系统:可以用于读写文件、创建目录、删除文件等。文档地址:https://nodejs.org/dist/latest-v12.x/docs/api/fs.html

路径模块:用于处理文件路径和目录路径。文档地址:https://nodejs.org/dist/latest-v12.x/docs/api/path.html

网络模块:用于创建Web服务器和客户端、TCP服务器等。文档地址:https://nodejs.org/dist/latest-v12.x/docs/api/net.html

进度条:用于显示进度和动画。文档地址:https://nodejs.org/dist/latest-v12.x/docs/api/process.html#process_a_simple_progress_bar

事件:Node.js有一个事件驱动架构,掌握事件模块很重要。文档地址:https://nodejs.org/dist/latest-v12.x/docs/api/events.html

流:流是Node.js处理流数据的抽象接口,文档地址:https://nodejs.org/dist/latest-v12.x/docs/api/stream.html

HTTP:用于创建Web服务器和客户端。文档地址:https://nodejs.org/dist/latest-v12.x/docs/api/http.html

缓冲区:用于操作二进制数据。文档地址:https://nodejs.org/dist/latest-v12.x/docs/api/buffer.html

子进程:用于生成子进程,执行外部程序。文档地址:https://nodejs.org/dist/latest-v12.x/docs/api/child_process.html


## 项目目录

├─ src/
│  ├─ app.ts                  # 🟡 应用入口
│  ├─ config/                 # ⚙️ 配置相关（数据库、全局配置等）
│  │  ├─ index.ts
│  │  └─ mysql.ts
│  ├─ routes/                 # 🧭 路由层
│  │  ├─ index.ts
│  │  └─ user.route.ts
│  ├─ controllers/           # 🧠 控制器层（接收请求，调用服务）
│  │  ├─ index.ts
│  │  └─ user.controller.ts
│  ├─ services/              # 🛠️ 服务层（业务逻辑）
│  │  ├─ index.ts
│  │  └─ user.service.ts
│  ├─ models/                # 🗄️ 数据模型（数据库操作）
│  │  ├─ index.ts
│  │  └─ user.model.ts
│  ├─ middlewares/           # 🧩 中间件（权限、日志、错误处理）
│  │  ├─ auth.middleware.ts
│  │  └─ error.middleware.ts
│  ├─ utils/                 # 📌 公共工具函数
│  │  ├─ logger.ts
│  │  └─ helper.ts
│  ├─ types/                 # 📝 TypeScript 类型定义
│  │  └─ express.d.ts
│  ├─ views/                 # 🧰 模板引擎文件（例如 EJS、Pug）
│  │  └─ index.ejs
│  └─ websocket/             # 🌐 WebSocket 模块（如果用）
│     └─ index.ts




## **常见 Git 提交类型（推荐使用「约定式提交 Conventional Commits」）**

| 类型               | 说明                                                 |
| ------------------ | ---------------------------------------------------- |
| **feat**     | ✨ 新功能（feature）                                 |
| **fix**      | 🐛 修复 bug                                          |
| **docs**     | 📝 仅修改文档，比如 README                           |
| **style**    | 💅 代码格式修改（不影响功能，比如空格、缩进、分号）  |
| **refactor** | 🧠 代码重构（既不是新功能，也不是 bug 修复）         |
| **perf**     | ⚡ 性能优化                                          |
| **test**     | ✅ 添加或修改测试                                    |
| **build**    | 🏗️ 构建流程、依赖相关修改（npm、webpack、vite 等） |
| **ci**       | 🤖 CI 配置修改（GitHub Actions、Jenkins 等）         |
| **chore**    | 🔧 其他不修改 src 或测试的杂项，比如改脚本           |
| **revert**   | ⏪ 回滚上一次提                                      |
