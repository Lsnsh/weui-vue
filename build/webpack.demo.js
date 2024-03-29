const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

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
    path: path.resolve(process.cwd(), "./examples/weui-vue/"),
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
          },
          {
            loader: path.resolve(__dirname, "./md-loader/index.js")
          }
        ]
      },
      {
        test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
        loader: "url-loader",
        query: {
          limit: 10000,
          name: path.posix.join("static", "[name].[hash:7].[ext]")
        }
      }
    ]
  },
  plugins: [
    new ProgressBarPlugin(),
    new CleanWebpackPlugin(),
    new OptimizeCSSAssetsPlugin({}),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: "./examples/index.tpl",
      filename: "index.html",
      favicon: "./examples/favicon.ico"
    }),
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
    }),
  ],
  optimization: {
  },
  devtool: "#eval-source-map"
};

if (isProd) {
  // webpackConfig.externals = {
  //   vue: "Vue",
  //   "vue-router": "VueRouter",
  //   "highlight.js": "hljs"
  // };
  webpackConfig.plugins.push(
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:7].css"
    })
  );
  // https://webpack.js.org/configuration/optimization/#optimizationsplitchunks
  webpackConfig.optimization.splitChunks = {
    cacheGroups: {
      vendor: {
        test: /\/src\//,
        name: "weui-vue",
        chunks: "all"
      }
    }
  };
  webpackConfig.devtool = false;
}

module.exports = webpackConfig;
