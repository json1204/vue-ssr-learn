
const path = require('path');
//html
const HTMLPlugin=require('html-webpack-plugin');
const webpack =require('webpack');
//获取那个环境
const isDev = process.env.NODE_ENV==='development';
//css分离
const ExtractPlugin=require('extract-text-webpack-plugin');
//去除文件
const CleanWebpackPlugin = require("clean-webpack-plugin");
//打开浏览器
//var OpenBrowserPlugin = require('open-browser-webpack-plugin');
console.log(isDev);
const config= {
    //是否是pc端
    target:'web',
    //入口
    entry: path.join(__dirname, 'src/index.js'),
    // 输出
    output: {
        //dev环境可以，正式环境会报错，
        filename: 'bundle.[hash:8].js',
        path: path.join(__dirname, "dist")
    },
    //webpack只处理js,vue 要通过loader转换
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test:/\.jsx/,
                loader:'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {//通过script变成全局的变量  只要是有.exec\.js就可以
                test: /\.exec\.js$/,
                use: [ 'script-loader' ]
              },
            {
                test: /\.(gif|jpg|png|jpeg|svg)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 1024,
                            name: 'images/[name][-aaa].[ext]'
                        }
                    }
                ]
            }
        ]

    },
    plugins:[
        //选择dev还是生产的源码
        new webpack.DefinePlugin({
            "process.env":{
                NODE_ENV:isDev?'"development"':'"production"'
            }
        }),
        //配置html
        new HTMLPlugin({
            title:'my-dome',
            filename:'myindex.html'
        }),
    ]
}

if(isDev){
    //dev中的css
    config.module.rules.push({
        test:/\.styl/,
        use:[
            'style-loader',
            'css-loader',
            {
                loader:'postcss-loader',
                options:{
                    sourceMap:true,
                }
            },
            'stylus-loader'
        ]
    })
    // //帮助调试开发
    config.devtool='#cheap-module-eval-source-map'
    config.devServer={
        port :8000,
        //'0.0.0.0' 可以通过IP访问  手机访问可以通过同wifi下ip+端口号
        host:'0.0.0.0',
        overlay:{
            errors:true,
        },
        // //打开
        open:true,
        //  //实时更新
       hot:true,
       
      
        //hot:true
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        //一些没有必要的展示
        new webpack.NoEmitOnErrorsPlugin()
    )

}else{
    //生成环境的静态文件和业务代码单独 打包
    config.entry={
        app:path.join(__dirname,'src/index.js'),
        //单独再引进一个js
        // app2:path.join(__dirname,'src/assets/js/index.js'),
        //vendor:['vue'],//vue是静态不变的
        //将./src/assets/js/index.js将自己的js打包到vendor中
        vendor:['vue'],//vue是静态不变的 //这里的并不会把js打包到appde
    }

  //输出的路径
   //config.output.path= path.resolve(__dirname, 'dist/assets');
    // 输出文件名称
   config.output.filename='js/[name].[chunkhash:8].js';
   
    //生成环境中的css单独打包
    config.module.rules.push(
        {
            test:/\.styl/,
            use:ExtractPlugin.extract({
                fallback:'style-loader',
                use:[
                    'css-loader',
                   {
                    loader:'postcss-loader',
                    options:{
                        sourceMap:true,
                    }
                   },
                   "stylus-loader"
                ]
            })
        },
    )
    config.plugins.push(
        //内容不变 存hash
        new webpack.HashedModuleIdsPlugin(),
        //分离css
        new ExtractPlugin({
            filename:'css/[name].styles.[contentHash:8].css'
        }),
              // 'vendor' 就是把依赖库(比如react react-router, redux,vue)全部打包到 vendor.js中
             // 'vendor.js' 就是把自己写的相关js打包到bundle.js中
            // 一般依赖库放到前面，所以vendor放第一个
        new webpack.optimize.CommonsChunkPlugin({
            name:'vendor'
        }),
        //将webpack代码单独打包在一个文件//解决中间加入
        new webpack.optimize.CommonsChunkPlugin({
            name:'runtime'
        }),
        //去除重复打包后的文件['public']
        new CleanWebpackPlugin(['dist'])
        // new CleanWebpackPlugin(  ['dist/css/*.css','dist/js/*.js','dist/.*.'],　 //匹配删除的文件
        // {
        //     root: __dirname,       　　　　　　　　　　//根目录
        //     verbose:  true,        　　　　　　　　　　//开启在控制台输出信息
        //     dry:      false        　　　　　　　　　　//启用删除文件
        // })
    )
}
module.exports =config;