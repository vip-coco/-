const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { merge } = require("webpack-merge");
const webpackBaseConfig = require("./webpack.base.config.js");

const prodConfig = {
  mode: "production",
  //打包入口
  entry: "./src/js/main.js",
  //打包出口
  output: {
    // 输出文件名
    filename: "js/index.js",
    // __dirname nodejs的变量，代表当前文件的目录绝对路径
    path: path.resolve(__dirname, "../dist"),
  }, 
  module: {
    rules: [],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
  ],
  devtool: "eval-source-map",
};

module.exports = merge(webpackBaseConfig, prodConfig);
