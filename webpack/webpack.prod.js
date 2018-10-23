const CleanWebpackPlugin = require('clean-webpack-plugin');
const commonPaths = require('./paths');

module.exports = {
  mode: 'production',
  entry: commonPaths.entryPathProd,
  output: {
    path: commonPaths.outputPath,
    library: 'ReactSlackChat',
    libraryTarget: 'umd',
    filename: 'react-slack-chat.js',
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              camelCase: true,
              localIdentName: '[local]___[hash:base64:5]',
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  externals: {
    'react': 'react',
    'prop-types': 'prop-types',
    'react-dom': 'react-dom'
  },
  plugins: [
    new CleanWebpackPlugin([commonPaths.outputPath.split('/').pop()], {
      root: commonPaths.root,
    })
  ],
  devtool: 'source-map',
};
