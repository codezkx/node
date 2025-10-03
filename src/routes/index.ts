import path from "path";
import fs from "fs";
import { fileURLToPath, pathToFileURL } from 'url';

import type { Express } from "express"

// const routers = {
//   upload: {
//     url: '/file',
//   },
//   publicKey: {
//     url: '/publicKey',
//   },
//   login: {
//     url: '/login',
//   }
// }

// 注册子路由
async function registerRouters(app: Express) {
  // 当前文件的完整路径
  const __filename = fileURLToPath(import.meta.url);
  // 当前文件所在目录
  const __dirname = path.dirname(__filename);
  const files = fs.readdirSync(__dirname);

  for (const file of files) {
    if (file.endsWith('.router.ts')) {
      const filePath = path.join(__dirname, file);
      const fileUrl = pathToFileURL(filePath).href;
      const module  = await import(fileUrl);
      const router = module.default;
      app.use('/', router);
    }
  }
}

export default registerRouters;
