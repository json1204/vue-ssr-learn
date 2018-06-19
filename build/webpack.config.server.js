
const path = require('path');

const webpack = require('webpack');
//合并
const merge = require('webpack-merge');
// css分离
const ExtractPlugin = require('extract-text-webpack-plugin');
//引进基础配置
const baseConfig = require('./webpack.config.base');

// vue服务端渲染
const VueServerPlugin = require('vue-server-renderer/server-plugin')

let config;
config = merge(baseConfig, {
  target: 'node', // 指定运行环境
  entry: path.join(__dirname, './../client/server-entry.js'),
  ////帮助调试开发
  //devtool = '#cheap-module-eval-source-map',
  devtool: '#source-map',
  output: {
    libraryTarget: 'commonjs2',
    filename: 'server-entry.js',
    path: path.join(__dirname, '../server-build')
  },
  // 除去不需要打包的文件 避免内存浪费
  externals: Object.keys(require('./../package.json').dependencies),
  module: {
    rules: [
      {
        test: /\.styl/,
        use: ExtractPlugin.extract({
          fallback: 'vue-style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
              }
            },
            "stylus-loader"
          ]
        })
      },
    ]
  },
  plugins: [
    //分离css
    new ExtractPlugin({
      filename: 'styles.[contentHash:8].css'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    }),
    // 这个作用是不要输出javasprcit文件，而是json文件
    new VueServerPlugin()
  ]
})
module.exports = config;
