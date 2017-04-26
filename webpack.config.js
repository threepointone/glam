let path = require('path')

module.exports = {
  devtool: 'source-map',
  context: path.join(__dirname, './example'),
  entry: './index.js',
  output: {
    path: path.join(__dirname, './example'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.css$/, use: [
        { loader: "style-loader" },
        { loader: "css-loader", options: { importLoaders: 1 } },
        { loader: "postcss-loader", options: { 
          plugins: () => [ require('postcss-cssnext')({ features: { customProperties: false }}) ] } 
        }
      ] }
    ]  
  } 
}