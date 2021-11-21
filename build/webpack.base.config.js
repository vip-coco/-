/**
 * 公共配置
 */
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const commonCssLoader = [
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
];

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [...commonCssLoader],
      },
      {
        test: /\.less$/,
        use: [...commonCssLoader, "less-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [...commonCssLoader, "sass-loader"],
      },
      {
        test: /\.styl(us)?$/, //两种结尾方式styl或者stylus
        use: [...commonCssLoader, "stylus-loader"],
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
          filename: "imgs/[contenthash:10].[name][ext]",
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
            maxSize: 8 * 1024,
          },
        },
        generator: {
          filename: "file/[contenthash:10].[name][ext]",
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          /* 
                开启多进程打包。 
                进程启动大概为600ms，进程通信也有开销。
                只有工作消耗时间比较长，才需要多进程打包
              */
          // {
          //   loader: "thread-loader",
          //   options: {
          //     workers: 2, // 进程2个
          //   },
          // },
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    useBuiltIns: "usage",
                    corejs: {
                      version: 3,
                    },
                    targets: {
                      chrome: "60",
                      firefox: "60",
                      ie: "9",
                      safari: "10",
                      edge: "17",
                    },
                  },
                ],
              ],
              // 开启babel缓存
              // 第二次构建时，会读取之前的缓存
              cacheDirectory: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CssMinimizerPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/style.[contenthash:6].css",
    }),
    new ESLintPlugin({
      extensions: ["js"],
      exclude: "/node_modules",
      fix: true,
    }),
  ],
};
