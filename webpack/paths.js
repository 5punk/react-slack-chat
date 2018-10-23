const path = require('path');

module.exports = {
  root: path.resolve(__dirname, '../'),
  outputPath: path.resolve(__dirname, '../', 'dist'),
  entryPathDev: path.resolve(__dirname, '../', 'src/index.dev.jsx'),
  entryPathProd: path.resolve(__dirname, '../', 'src/index.jsx'),
  templatePath: path.resolve(__dirname, '../', 'src/public/template.html')
};
