
const path = require('path');
//html
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
//合并
const merge = require('webpack-merge');
//css分离
//const ExtractPlugin = require('extract-text-webpack-plugin');
//去除文件
//const CleanWebpackPlugin = require("clean-webpack-plugin");
//打开浏览器
//var OpenBrowserPlugin = require('open-browser-webpack-plugin');
//引进基础配置
const baseConfig = require('./webpack.config.base');
// //获取那个环境
// const isDev = process.env.NODE_ENV === 'development';

const defaultPluins=[
          //选择dev还是生产的源码
          new webpack.DefinePlugin({
            "process.env":{
                NODE_ENV:'"development"'
            }
        }),
        //配置html
        new HTMLPlugin({
          template:path.join(__dirname,"./template.html")
        }),
]

const devServer = {
  port: 7000,
  //'0.0.0.0' 可以通过IP访问  手机访问可以通过同wifi下ip+端口号
  host: '0.0.0.0',
  overlay: {
    errors: true,
  },
  //  //实时更新
  hot: true,

}

let config;
config = merge(baseConfig, {
  entry:path.join(__dirname,'./../practice/index.js'),
  ////帮助调试开发
  //devtool = '#cheap-module-eval-source-map',
  devtool: '#cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.styl/,
        use: [
          'vue-style-loader',
          'css-loader',
          // {
          //   loader:'css-loader',
          //   //开启全局的module的css
          //   options:{
          //     module:true,
          //     //全部引进的css
          //     localIdentName:isDev?'[path]-[name]-[hash:base64:5]':'[hash:base64:5]',//css的class名字独立

          //   }
         // },

          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            }
          },
          'stylus-loader'
        ]
      }
    ]
  },
  devServer,
  resolve:{
    //import Vue from vue  指定导入的文件的位置 即是版本环境
    alias:{
      'vue':path.join(__dirname,'../node_modules/vue/dist/vue.esm.js')
    }
  },
  plugins: defaultPluins.concat([
    new webpack.HotModuleReplacementPlugin(),
    //一些没有必要的展示
    new webpack.NoEmitOnErrorsPlugin(),
  ])
})
module.exports = config;
