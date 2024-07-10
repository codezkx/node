const fs = require('fs');
const path = require('path');

const routers = {
  upload: {
    url: "/file",
  },
  test: {
    url: "/test",
  }
}
// 注册子路由
function registerRouters(app) {
  const files = fs.readdirSync(__dirname);
  files.forEach(file => {
    if (file.endsWith('.router.js')) {
      const basename = path.basename(file, '.router.js');
      app.use(routers[basename].url, require(`./${file}`));
    }
  })
}

module.exports = registerRouters;
