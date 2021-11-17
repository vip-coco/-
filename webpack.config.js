const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
  //打包入口
  entry: "./src/js/main.js",
  //打包出口
  output: {
    // 输出文件名
    filename: "js/index.js",
    // __dirname nodejs的变量，代表当前文件的目录绝对路径
    path: path.resolve(__dirname, "dist"),
  },
  // loader的配置
  module: {
    rules: [
      {
        // 匹配哪些文件
        test: /\.css$/,
        // 使用哪些loader进行处理
        use: [
          // use数组中loader执行顺序：从右到左，从下到上 依次执行
          // 创建style标签，将js中的样式资源插入进行，添加到head中生效
          //"style-loader",
          //MiniCssExtractPlugin.loader,
          // 将css文件变成mainjs模块加载js中，里面内容是样式字符串
          //"css-loader",
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../",
            },
          },
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                // postcss的插件
                plugins: [require("postcss-preset-env")],
              },
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          // 将less文件编译成css文件
          // 需要下载 less-loader和less
          "less-loader",
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.styl(us)?$/, //两种结尾方式styl或者stylus
        use: ["style-loader", "css-loader", "stylus-loader"],
      },
      // {
      //   // 默认处理不了html中img图片
      //   // 处理图片资源
      //   test: /\.(jpg|png|gif)$/,
      //   // 使用一个loader
      //   // 下载 url-loader file-loader
      //   loader: "url-loader",
      //   options: {
      //     // 图片大小小于8kb，就会被base64处理
      //     // 优点: 减少请求数量（减轻服务器压力）
      //     // 缺点：图片体积会更大（文件请求速度更慢）
      //     limit: 4 * 1024,
      //     // 问题：因为url-loader默认使用es6模块化解析，而html-loader引入图片是commonjs
      //     // 解析时会出问题：[object Module]
      //     // 解决：关闭url-loader的es6模块化，使用commonjs解析
      //     esModule: false,
      //     // 给图片进行重命名
      //     // [hash:10]取图片的hash的前10位
      //     // [ext]取文件原来扩展名
      //     name: "[hash:10].[ext]",
      //     outputPath: "imgs",
      //   },
      //   type: 'javascript/auto'
      // },
      {
        //webpack5
        test: /\.(jpg|png|gif)$/,
        type: "asset",
        // 现在，webpack 将按照默认条件，自动地在 resource 和 inline 之间进行选择：
        // 小于 8kb 的文件，将会视为 inline 模块类型，否则会被视为 resource 模块类型。
        parser: {
          //自定义设置大小
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
        // 处理html文件的img图片（负责引入img，从而能被url-loader进行处理）
        loader: "html-loader",
      },
      //   {
      //     // 处理其他资源
      //     exclude:
      //       /\.(node_modules|html|js|css|less|sass|scss|stylus|styl|jpg|png|gif)/,
      //     loader: "file-loader",
      //     options: {
      //       esModule: false,
      //       outputPath: "file",
      //     },
      //     type: "javascript/auto",
      //   },
      {
        //webpack5
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
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          // 预设：指示babel做怎么样的兼容性处理
          presets: [
            [
              '@babel/preset-env',
              {
                // 按需加载
                useBuiltIns: 'usage',
                // 指定core-js版本
                corejs: {
                  version: 3
                },
                // 指定兼容性做到哪个版本浏览器
                targets: {
                  chrome: '60',
                  firefox: '60',
                  ie: '9',
                  safari: '10',
                  edge: '17'
                }
              }
            ]
          ]
        }
      }
    ],
  },
  // plugins的配置
  plugins: [
    // 详细plugins的配置
    // html-webpack-plugin
    // 功能：默认会创建一个空的HTML，自动引入打包输出的所有资源（JS/CSS）
    // 需求：需要有结构的HTML文件
    new HtmlWebpackPlugin({
      // 复制 './src/index.html' 文件，并自动引入打包输出的所有资源（JS/CSS）
      template: "./src/index.html",
      minify: {
        // 移除空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true,
      },
    }),
    new MiniCssExtractPlugin({
      // 对输出的css文件进行重命名
      filename: "css/style.css",
    }),
    new CssMinimizerPlugin(),
    new ESLintPlugin({
      //只检查自己写的源代码
      extensions: ["js"],
      //context: resolve("src"),
      exclude: "/node_modules",
       // 自动修复eslint的错误
      fix: true
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
    port: 9000,
    //启动浏览器open
    open: true,
    // 开启HMR功能，热模块表示只跟新编译部分模块 
    hot: true
  },
  // 模式
  mode: "development", // 开发模式
  // mode: 'production' //生产环境，压缩js
    //source-map,eval-source-map提示具体部位错误
  devtool: 'eval-source-map',
};
