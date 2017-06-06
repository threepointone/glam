let path = require('path')
let cssnext = require('postcss-cssnext')
let webpack = require('webpack')

module.exports = {
  devtool: 'source-map',
  entry: './example/index.js',
  output: {
    publicPath: '/example/',
    path: path.join(__dirname, './example'),
    filename: 'bundle.js'
  },
  node: {
    Buffer: false // workaround style-loader bug
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.css$/,
        use: [

        // instead of -
        // { loader: "style-loader" },
        // { loader: "css-loader", options: { importLoaders: 1 } },

        // or -
        // { loader: "file-loader" },

        // we can use our own version -
          { loader: path.join(__dirname, './src/loader'),  // this would be '@threepointone/glam/loader'
            options: { modulePath: '"../src"' } }  // you don't need this

        ] }
    ]
  }
}
