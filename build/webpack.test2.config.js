const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = (env) =>{
  console.log(env)
  return {
    //打包入口
    entry: "./src/js/main.js",
    //打包出口
    output: {
      // 输出文件名
      filename: "js/index.js",
      path: path.resolve(__dirname, "./dist"),
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.less$/,
          use: ["style-loader", "css-loader", "less-loader"],
        },
        {
          test: /\.(jpg|png|gif)$/,
          type: "asset",
          parser: {
            dataUrlCondition: {
              maxSize: 4 * 1024,
            },
          },
          generator: {
            filename: "imgs/[hash:10].[name][ext]",
          },
        },
        {
          test: /\.html$/,
          loader: "html-loader",
        },
        {
          exclude:
            /\.(node_modules|html|js|css|less|sass|scss|stylus|styl|jpg|png|gif)/,
          type: "asset",
          parser: {
            dataUrlCondition: {
              maxSize: 4 * 1024,
            },
          },
          generator: {
            filename: "file/[hash:10].[name][ext]",
          },
        },
      ],
    },
    // plugins的配置
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: "./src/index.html",
      }),
      new ESLintPlugin({
        extensions: ["js"],
        exclude: "/node_modules",
        fix: true,
      }),
    ],
    devServer: {
      // 项目构建后路径
      static: {
        directory: path.join(__dirname, "public"),
      },
      // 启动gzip压缩
      compress: true,
      // 端口号
      port: 3000,

      //watchFiles: [ './src/index.html'],
      //启动浏览器open
      //open: true,
      // 开启HMR功能，热模块表示只跟新编译部分模块
      //hot: true
    },
    performance: {
      hints: false,//关闭提示
    },
    // 模式
    mode: env.production?'production':'development',//development,production
    devtool: "eval-source-map",
  };
};
