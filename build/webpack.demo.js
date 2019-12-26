"use strict";
const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const config = require("./config");

const isProd = process.env.NODE_ENV === "production";

const webpackConfig = {
  mode: process.env.NODE_ENV,
  entry: isProd
    ? {
        docs: "./examples/main.js"
      }
    : "./examples/main.js",
  output: {
    path: path.resolve(process.cwd(), "./examples/weui/"),
    filename: "[name].[hash:7].js",
    chunkFilename: isProd ? "[name].[hash:7].js" : "[name].js"
  },
  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: config.alias,
    modules: ["node_modules"]
  },
  devServer: {
    host: "0.0.0.0",
    port: 8086,
    publicPath: "/",
    hot: true
  },
  performance: {
    hints: false
  },
  stats: {
    children: false
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.(vue|jsx?)$/,
        exclude: /node_modules/,
        loader: "eslint-loader"
      },
      {
        test: /\.(jsx?|babel|es6)$/,
        include: process.cwd(),
        // 没有exclude node_modules目录会报错：Uncaught TypeError: Cannot convert undefined or null to object at hasOwnProperty (<anonymous>)
        exclude: config.jsexclude,
        loader: "babel-loader"
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          compilerOptions: {
            preserveWhitespace: false
          }
        }
      },
      {
        test: /\.(less|css)$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
          "less-loader"
        ]
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: "vue-loader",
            options: {
              compilerOptions: {
                preserveWhitespace: false
              }
            }
          }
          // {
          //   loader: path.resolve(__dirname, "./md-loader/index.js")
          // }
        ]
      },
      {
        test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
        loader: "url-loader",
        // todo: 这种写法有待调整
        query: {
          limit: 10000,
          name: path.posix.join("static", "[name].[hash:7].[ext]")
        }
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: "public/index.html",
      // template: "./examples/index.tpl",
      filename: "index.html"
      // favicon: "./examples/favicon.ico"
    }),
    new ProgressBarPlugin(),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      "process.env.FAAS_ENV": JSON.stringify(process.env.FAAS_ENV)
    }),
    new webpack.LoaderOptionsPlugin({
      vue: {
        compilerOptions: {
          preserveWhitespace: false
        }
      }
    })
  ],
  optimization: {
    minimizer: []
  },
  devtool: "#eval-source-map"
};

if (isProd) {
  webpackConfig.externals = {
    vue: "Vue",
    "vue-router": "VueRouter",
    "highlight.js": "hljs"
  };
  webpackConfig.plugins.push(
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:7].css"
    })
  );
  webpackConfig.optimization.minimizer.push(
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
      sourceMap: false
    }),
    new OptimizeCSSAssetsPlugin({})
  );
  // https://webpack.js.org/configuration/optimization/#optimizationsplitchunks
  webpackConfig.optimization.splitChunks = {
    cacheGroups: {
      vendor: {
        test: /\/src\//,
        name: "weui",
        chunks: "all"
      }
    }
  };
  webpackConfig.devtool = false;
}

module.exports = webpackConfig;
