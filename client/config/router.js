import Router from 'vue-router'

import routes from './routes.js'

export default () => {
  return new Router({
    routes,
    mode: 'history', // 除去路由上的#
    // base: '/base/',// 在路由上都加上
    linkActiveClass: 'active-link',
    linkExactActiveClass: 'exact-active-link',
    scrollBehavior (to, from, savePosition) { // 路由跳转时是否记录滚动的位置
      if (savePosition) {
        return savePosition
      } else {
        return {x: 0, y: 0}
      }
    },
    // parseQuery (query) { // 把路由上的？后面的参数转换的方法
    //   console.log(query)
    // },
    // stringifyQuery (obj) {
    //   console.log(obj)
    // },
    fallback: true// 浏览器是否支持前端路由
  })
}
