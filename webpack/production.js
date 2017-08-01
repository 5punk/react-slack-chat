'use strict';

const path = require('path');
const webpack = require('webpack');

const baseConfig = require('./base');
const defaultSettings = require('./defaults');

// Add needed plugins here
const BowerWebpackPlugin = require('bower-webpack-plugin');

const config = Object.assign({}, baseConfig, {
  entry: [
    path.join(__dirname, '../src/ReactSlackChat')
  ],
  cache: false,
  devtool: 'sourcemap',
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new BowerWebpackPlugin({
      searchResolveModulesDirectories: false
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: defaultSettings.getDefaultModules(),
  output: {
    library: 'ReactSlackChat',
    libraryTarget: 'umd',
    filename: 'react-slack-chat.js',
    path: path.join(__dirname, '../dist/')
  },
  externals: {
    'react': 'react',
    'react-dom': 'react-dom'
  }
});

// Add needed loaders to the defaults here
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'babel',
  exclude: /(node_modules|bower_components)/,
  include: [].concat(
    config.additionalPaths,
    [ path.join(__dirname, '/../src') ]
  )
});

module.exports = config;
