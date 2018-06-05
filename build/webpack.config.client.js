
const path = require('path');
//html
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
//合并
const merge = require('webpack-merge');
//css分离
const ExtractPlugin = require('extract-text-webpack-plugin');
//去除文件
//const CleanWebpackPlugin = require("clean-webpack-plugin");
//打开浏览器
//var OpenBrowserPlugin = require('open-browser-webpack-plugin');
//引进基础配置
const baseConfig = require('./webpack.config.base');
//获取那个环境
const isDev = process.env.NODE_ENV === 'development';

const defaultPluins=[
          //选择dev还是生产的源码
          new webpack.DefinePlugin({
            "process.env":{
                NODE_ENV:isDev?'"development"':'"production"'
            }
        }),
        //配置html
        new HTMLPlugin({
          template:path.join(__dirname,"./template.html")
        }),
]

const devServer = {
  port: 8000,
  //'0.0.0.0' 可以通过IP访问  手机访问可以通过同wifi下ip+端口号
  host: '0.0.0.0',
  overlay: {
    errors: true,
  },
  historyApiFallback: {//这个配置是解决了router 的mode浏览器重新刷新后没有映射
    index : '/public/index.html'//这个是html编译后形成的index.html默认会在跟目录下，跟ouput输出的publicPath有关
  },
  // //打开
 // open: true,
  //  //实时更新
  hot: true,

}

let config;
if (isDev) {
  //---
  config = merge(baseConfig, {
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
    plugins: defaultPluins.concat([
      new webpack.HotModuleReplacementPlugin(),
      //一些没有必要的展示
      new webpack.NoEmitOnErrorsPlugin(),
    ])
  })
} else {
  //生成环境的静态文件和业务代码单独 打包
  config = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, './../client/index.js'),
      //单独再引进一个js
      // app2:path.join(__dirname,'src/assets/js/index.js'),
      //vendor:['vue'],//vue是静态不变的
      //将./src/assets/js/index.js将自己的js打包到vendor中
      vendor: ['vue'],//vue是静态不变的 //这里的并不会把js打包到appde
    },
    output: {
      filename: '[name].[chunkhash:8].js'
    },
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
    plugins: defaultPluins.concat([
      //分离css
      new ExtractPlugin({
        filename: 'styles.[contentHash:8].css'
      }),
      // 'vendor' 就是把依赖库(比如react react-router, redux,vue)全部打包到 vendor.js中
      // 'vendor.js' 就是把自己写的相关js打包到bundle.js中
      // 一般依赖库放到前面，所以vendor放第一个
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
      }),
    ])
  })
}
module.exports = config;
