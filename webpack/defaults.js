/**
 * Function that returns default values.
 * Used because Object.assign does a shallow instead of a deep copy.
 * Using [].push will add to the base array, so a require will alter
 * the base array output.
 */

const path = require('path');
const values = require('postcss-modules-values');

const srcPath = path.join(__dirname, '/../src');
const dfltPort = 3003;

/**
 * Get the default modules object for webpack
 * @returns {Object} Webpack Config
 */
function getDefaultModules () {
  return {
    noParse: /node_modules\/html2canvas\/dist\/html2canvas.js/,
    loaders: [
      {
        test: /\.css$/,
        loader: 'style!css-loader!postcss-loader'
      },
      {
        test: /\.sass/,
        loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded&indentedSyntax'
      },
      {
        test: /\.scss/,
        loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass!postcss-loader'
      },
      {
        test: /\.less/,
        loader: 'style-loader!css-loader!less-loader'
      },
      {
        test: /\.(png|jpg|gif|woff|woff2)$/,
        loader: 'url-loader?limit=8192'
      },
      { test: /\.json$/, loader: 'json' },
      {
        test: /\.(mp4|ogg)$/,
        loader: 'file-loader'
      },
      { test: /\.svg$/, loader: 'svg-inline' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' }
    ],
    postcss: [
      values
    ]
  };
}

module.exports = {
  srcPath,
  publicPath: '/build/',
  port: dfltPort,
  getDefaultModules
};
