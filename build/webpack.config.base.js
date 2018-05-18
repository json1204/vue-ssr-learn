const path = require('path')

//处理vue
const createVueLoaderOptions=require('./vue-loader.config');

const isDev = process.env.NODE_ENV === 'development'

const config = {
  target: 'web',
  entry: path.join(__dirname, './../client/index.js'),
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, '../dist')
  },
  module: {
    rules: [
      //统一规范代码检测 在使用loader前处理
      {
        test: /\.(vue|js|jsx)$/,
        loader:"eslint-loader",
        exclude:/node_modules/,
        enforce:"pre"//预处理
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options:createVueLoaderOptions(isDev)
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude:/node_moudules/
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: 'resources/[path][name].[hash:8].[ext]'//静态资源将文件按路径放
            }
          }
        ]
      }
    ]
  }
}



module.exports = config
