const path = require("path");
console.log(path.resolve(__dirname + "./build"));
module.exports = {
  target: "web",
  mode: "development",
  entry: "/src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname + "/build"),
    clean: true,
  },
};
