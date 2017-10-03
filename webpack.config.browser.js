const path = require('path')
const R = require('ramda')

const base = require('./webpack.config.js')

const config = {
  target: 'web',
  output: {
    path: path.join(__dirname, './browser'),
    library: 'yarpex-bert',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    filename: 'yarpex-bert.js',
    sourceMapFilename: 'yarpex-bert.js.map',
  },
}

module.exports = R.merge(base, config)
