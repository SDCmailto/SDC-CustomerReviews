const path = require('path');

module.exports = {
  entry: './src/index.jsx',
  mode: 'development',
  output: {
    filename: 'customerreviews.js',
    path: path.join(__dirname, 'public')
  },
  module: {
    rules: [{
      loader: 'babel-loader',
      test: /\.(js|jsx)$/,
      exclude: /node_modules/
    }]
  },
  devServer: {
    contentBase: path.join(__dirname, 'public')
  }
}