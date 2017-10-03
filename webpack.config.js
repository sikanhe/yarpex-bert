const fs = require('fs')
const path = require('path')
const { merge, objOf } = require('ramda')

const externals = fs.readdirSync('node_modules')
  .filter(module => module !== '.bin')
  .reduce((modules, module) =>
      merge(modules, objOf(module, `commonjs ${module}`)), {})

module.exports = {
  context: path.join(__dirname, './lib'),
  entry: './index.js',
  devtool: 'source-map',
  target: 'node',
  externals,
  output: {
    path: __dirname,
    libraryTarget: 'commonjs2',
    filename: 'yarpex-bert.js',
    sourceMapFilename: 'yarpex-bert.js.map',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
    ],
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint',
        exclude: /node_modules/,
      },
    ],
  },
}
