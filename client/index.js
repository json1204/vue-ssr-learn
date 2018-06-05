import Vue from 'vue'
import VueRouter from 'vue-router'

import './assets/styles/global.styl'

// 路由
import createRouter from './config/router.js'

// vuex
import Vuex from 'vuex'
import createStore from './store/store.js'

import App from './app.vue'

Vue.use(VueRouter)
Vue.use(Vuex)
const router = createRouter()
const store = createStore() // 每次都是一个新的跟data类型
// const root = document.createElement('div')
// document.body.appendChild(root)
// 全局导航守卫 每次只要路由变化了，都会三个都触发
router.beforeEach((to, from, next) => { // 验证是否需要登陆的
  console.log('beforeEach，跳转之前')
  next()
  // if (to.fullPath === '/app') {
  //   next('/login')// 必须的要不执行下一步
  //   // next({path: '/login',replace})// 必须的要不执行下一步
  // } else {
  //   next()
  // }
})
router.beforeResolve((to, from, next) => {
  console.log('beforeResolve')
  next()// 必须的要不执行下一步
})
router.afterEach((to, from) => { // 跳转完成
  console.log('afterEach，跳转完成')
  // next()// 必须的要不执行下一步
})
new Vue({
  router, // 加入路由模板
  store,
  render: (h) => h(App)
}).$mount('#root')
