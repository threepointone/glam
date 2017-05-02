let path = require('path')

module.exports = {
  devtool: 'source-map',
  entry: './src/index.js',
  output: {    
    library: 'css',
    libraryTarget: 'umd',
    path: path.join(__dirname, './dist'),
    filename: 'glam.js'
  },
  
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }     
    ]  
  } 
}