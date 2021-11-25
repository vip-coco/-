const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { merge } = require("webpack-merge");
const webpackBaseConfig = require("./webpack.base.config.js");

const prodConfig = {
  mode: "production",
  //打包入口
  entry: "./src/js/main.js",
  //entry:{index :"./src/js/index.js",text:"./src/js/print.js"},
  //打包出口
  output: {
    // 输出文件名
    //filename: "js/index.js",
    filename: 'js/[name].[contenthash:6].js',//hash解决缓存问题//contenthash: 根据文件的内容生成hash值
    // __dirname nodejs的变量，代表当前文件的目录绝对路径
    path: path.resolve(__dirname, "../dist"),
    clean:true,
    //publicPath:'http://localhost:8090'
  }, 
  stats: 'errors-only',//只在发生错误时输出
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
  externals: {
    // 拒绝jQuery被打包进来
    //jquery: 'jQuery'
  },
  /*
    1. 可以将node_modules中代码单独打包一个chunk最终输出
    2. 自动分析多入口chunk中，有没有公共的文件。如果有会打包成单独一个chunk
  */
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  devtool: "source-map",
};

module.exports = merge(webpackBaseConfig, prodConfig);
