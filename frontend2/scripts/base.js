const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = function (env) {
  const extractLess = new ExtractTextPlugin({
    filename: '[name].less.[contenthash].css',
    disable: env === 'development'
  })
  return {
    mode: env,
    resolve: {
      extensions: ['.js', 'json', '.jsx', '*']
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          use: 'babel-loader',
          include: path.join(__dirname, '../src')
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.less$/,
          use: extractLess.extract({
            use: [
              { loader: 'css-loader' },
              {
                loader: 'less-loader',
                options: {
                  modifyVars: { '@icon-url': '"/assets/iconfont/antd-3.x/iconfont"' },
                  javascriptEnabled: true
                }
              }],
            fallback: 'style-loader'
          })
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [{
            loader: 'url-loader',
            options: {
              name: '[path][name].[ext]',
              limit: 10240
            }
          }]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                name: '[path][name].[ext]',
                limit: 10
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify(env)
        }
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        title: 'Luna',
        // template: path.join(__dirname, '../assets/templates/index.html')
        template: path.join(__dirname, '../src/index.html')
      }),
      extractLess,
      new webpack.ProvidePlugin({
        $: 'jquery',
        _: 'lodash',
        R: 'ramda',
        cls: 'classnames'
      })
    ]
  }
}
