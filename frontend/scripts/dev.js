const webpack = require('webpack')
const path = require('path')
const webpackMerge = require('webpack-merge')
const commonConfig = require('./base.js')

const HOST = '0.0.0.0'
const PORT = 2223

module.exports = function (env) {
  return webpackMerge(commonConfig(env), {
    devtool: 'source-map',
    entry: {
      index: [
        'babel-polyfill',
        'react-hot-loader/patch',
        path.join(__dirname, '../src/index.js')
      ]
    },
    plugins: [
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
      // contentBase: [path.join(__dirname, '../src'), path.join(__dirname, '../assets')],
      host: HOST,
      port: PORT,
      hot: true,
      historyApiFallback: true,
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:7001',
          pathRewrite: { '^/api': '' }
        }
      }
    }
  })
}
