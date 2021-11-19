const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");  
const { merge } = require("webpack-merge");
const webpackBaseConfig = require("./webpack.base.config.js");

const prodConfig = {
  mode: "development",
  //打包入口
  entry: "./src/js/main.js",
  //打包出口
  output: {
    // 输出文件名
    filename: "js/index.js",
    path: path.resolve(__dirname, "../dist"),
  },
  module: {
    rules: [],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      minify: {
        // 移除空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true,
      },
    }), 
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    compress: true,
    port: 8000,
    open: true,
    // 开启HMR功能，热模块表示只跟新编译部分模块
    //hot: true,
    //watchFiles: ["./src/index.html"],
  }, 
  devtool: "eval-source-map",
};

module.exports = merge(webpackBaseConfig, prodConfig);
