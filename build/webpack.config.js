const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
var WebpackCleanupPlugin = require("webpack-cleanup-plugin");

const defaults = require("./defaults");

module.exports = {
  entry: ["./src/index-dev.js"],
  module: {
    rules: defaults.rules
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },
  mode: "development",
  output: {
    path: __dirname + "/src/public",
    publicPath: "/",
    filename: "bundle.js"
  },
  plugins: [
    new WebpackCleanupPlugin(),
    new webpack.DefinePlugin({
      process: {
        env: {
          NODE_ENV: JSON.stringify("development"), // use 'development' unless process.env.NODE_ENV is defined
          SYSTEM_HOOKS: JSON.stringify(defaults.withSystemHooks)
        }
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/public/index.html",
      files: {
        js: ["bundle.js"]
      }
    })
  ],
  devServer: {
    contentBase: "./src/public",
    hot: true
  }
};
