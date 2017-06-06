let path = require('path')
let cssnext = require('postcss-cssnext')

module.exports = {
  target: 'node',
  entry: './node/index.js',
  output: {
    path: path.join(__dirname, './node'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.css$/,
        use: [
        // instead of -
        // { loader: "style-loader" },
        // { loader: "css-loader", options: { importLoaders: 1 } },
        // we use our own version -
          { loader: path.join(__dirname, './src/loader'),  // this would be '@threepointone/glam/loader'
            options: { modulePath: '"../src"' } },  // you don't need this
        // add postcss as 'usual'
          { loader: 'postcss-loader',
            options: {
              plugins: () => [ cssnext({ features: { customProperties: false } }) ] }
          }
        ] }
    ]
  }
}
