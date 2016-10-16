var webpack = require('webpack');

module.exports = {
  entry: [
    './src/ReactSlackChat.js',
  ],
  plugins:[
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    })
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
      loader: 'style-loader!css-loader'
    }
  ]
  },
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
