module.exports=(isDev)=>{
  return{
    preserveWhitepace:true,//去除template中的html中的空格
    extractCSS:!isDev, //在开发时不需要一次性加载所有css 统一打包  按需加载
    cssModules:{
      //在生成环境中保密性好
      localIdentName:isDev?'[path]-[name]-[hash:base64:5]':'[hash:base64:5]',//css的class名字独立
      camelCase:true
    },
    // loaders:{
    //   'docs':docsLoader
    // }
    //hotReload:false,//css热重载  vue会重新刷新//根据环境变量生成
  } 
}