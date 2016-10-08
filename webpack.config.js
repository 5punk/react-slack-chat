var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
  entry: [
    './src/ReactSlackChat.js',
    './src/ReactSlackChat.css'
  ],
  module: {
    preLoaders: [
      {
        test: /\.json$/,
        loader: 'json' // 'json-loader' is also a valid name to reference
      }
    ],
    loaders: [
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel', // 'babel-loader' is also a valid name to reference
      query: {
        presets: ['es2015']
      }
    },
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
    }
  ]
  },
  plugins: [
    new ExtractTextPlugin('react-slack-chat.css', {
      allChunks: true
    })
  ],
  output: {
    library: 'ReactSlackChat',
    libraryTarget: 'umd',
    filename: 'react-slack-chat.js',
    path: __dirname + '/dist'
  },
  externals: {
    'react': 'react',
    'react-dom': 'react-dom'
  }
}
