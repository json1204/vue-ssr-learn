import Vue from 'vue'
import VueRouter from 'vue-router'
// vuex
import Vuex from 'vuex'
import App from './app.vue'

// 路由
import createRouter from './config/router.js'

import createStore from './store/store.js'

import './assets/styles/global.styl'

Vue.use(VueRouter)
Vue.use(Vuex)

export default () => {
  const router = createRouter()
  const store = createStore()
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  return { app, router, store }
}
