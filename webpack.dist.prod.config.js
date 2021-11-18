const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

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
  module: {
    rules: [
      { 
        test: /\.css$/, 
        use: [ 
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
      { 
        test: /\.(jpg|png|gif)$/,
        type: "asset", 
        parser: { 
          dataUrlCondition: {
            maxSize: 8 * 1024,
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
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: { 
          presets: [
            [
              '@babel/preset-env',
              { 
                useBuiltIns: 'usage', 
                corejs: {
                  version: 3
                }, 
                targets: {
                  chrome: '60',
                  firefox: '60',
                  ie: '9',
                  safari: '10',
                  edge: '17'
                }
              }
            ]
          ], 
          cacheDirectory:true
        }
      }
    ],
  }, 
  plugins: [
    new CleanWebpackPlugin(), 
    new HtmlWebpackPlugin({ 
      template: "./src/index.html",
      minify: { 
        collapseWhitespace: true, 
        removeComments: true,
      },
    }),
    new MiniCssExtractPlugin({ 
      filename: "css/style.css",
    }),
    new CssMinimizerPlugin(),
    new ESLintPlugin({ 
      extensions: ["js"], 
      exclude: "/node_modules", 
      fix: true
    }),
  ],
  devServer: { 
    static: {
      directory: path.join(__dirname, "public"),
    }, 
    compress: true, 
    port: 9000, 
    open: true, 
    hot: true
  }, 
  mode: "development", 
  devtool: 'eval-source-map',
};
