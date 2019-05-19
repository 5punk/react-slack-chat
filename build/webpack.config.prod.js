const webpack = require("webpack");
var WebpackCleanupPlugin = require("webpack-cleanup-plugin");

const defaults = require("./defaults");

const withSystemHooks = process.env.SYSTEM_HOOKS === JSON.stringify(true);
const filename = withSystemHooks
  ? "react-slack-chat-with-default-hooks.js"
  : "react-slack-chat.js";

module.exports = {
  entry: "./src/index.js",
  module: {
    rules: defaults.rules
  },
  mode: "production",
  externals: ["react", "react-dom", "prop-types"],
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },
  optimization: {
    minimize: true
  },
  plugins: [
    new webpack.DefinePlugin({
      process: {
        env: {
          NODE_ENV: "production", // use 'development' unless process.env.NODE_ENV is defined
          SYSTEM_HOOKS: JSON.stringify(defaults.withSystemHooks)
        }
      }
    })
  ],
  output: {
    path: __dirname + "/../dist",
    publicPath: "/",
    libraryTarget: "umd",
    filename
  }
};
