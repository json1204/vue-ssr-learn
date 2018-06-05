import Vuex from 'vuex'
// import Vue from 'vue'
// 必须挂载 原生静态加载
// Vue.use(Vuex)
// 原生静态加载
// const store = new Vuex.Store({
//   state: {
//     count: 0
//   },
//   mutations: {
//     updateCount (state, num) {
//       state.count = num
//     }
//   }
// })
// export default store
// 服务端渲染

// 引进state
import defaultState from './state/state.js'
// mutations
import mutations from './mutations/mutations.js'
export default () => {
  return new Vuex.Store({
    state: defaultState, // 定义
    mutations: mutations // 操作

  })
}
