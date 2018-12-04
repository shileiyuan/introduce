const path = require('path')
const webpackMerge = require('webpack-merge')
const commonConfig = require('./base.js')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = function (env) {
  return webpackMerge(commonConfig(env), {
    entry: {
      index: path.join(__dirname, '../src/index.js')
    },
    output: {
      filename: '[name].[hash].js',
      path: path.join(__dirname, '../dist')
    },

    plugins: [
      new CleanWebpackPlugin(['dist'], {
        root: path.join(__dirname, '../')
      })
    ]
  })
}
