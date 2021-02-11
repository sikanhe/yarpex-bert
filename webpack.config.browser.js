const path = require('path')
const webpack = require('webpack')

const config = {
  entry: './lib/index.js',
  target: 'web',
  mode: 'production',
  output: {
    path: path.join(__dirname, './browser'),
    library: 'yarpexBert',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    filename: 'yarpex-bert.js',
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
  ],
}

module.exports = config
