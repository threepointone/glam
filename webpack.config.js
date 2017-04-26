let path = require('path')
let cssnext = require('postcss-cssnext')

module.exports = {
  devtool: 'source-map',
  context: path.join(__dirname, './example'),
  entry: './index.js',
  output: {
    path: path.join(__dirname, './example'),
    filename: 'bundle.js'
  },
  node: {
    Buffer: false // workaround style-loader bug
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.css$/, use: [
        { loader: "style-loader" },
        { loader: "css-loader", options: { importLoaders: 1 } },
        { loader: "postcss-loader", options: { 
          plugins: () => [ cssnext({ features: { customProperties: false } }) ] } 
        }
      ] }
    ]  
  } 
}