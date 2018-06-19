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

import getters from './getters/getters.js'

import actions from './actions/actions'
let isDev = process.env.NODE_ENV === 'development'
export default () => {
  const store = new Vuex.Store({
    strict: isDev,
    state: defaultState, // 定义
    mutations: mutations, // 操作
    getters,
    actions,
    plugins: [ // 定义插件 在router执行前
      // (store) => {
      //   console.log('mmmmmmm')
      // }
    ]

    // modules: {// store中的模板
    //   a: {
    //     namespaced: true,
    //     state: {
    //       text: 1
    //     },
    //     mutations: {
    //       updateTest (state, text) {
    //         console.log('a.state', state)
    //         state.text = text
    //       }
    //     },
    //     getters: {
    //       textPlus (state, getters, rootState) {
    //         // return state.text + 1
    //         // rootState全局的state
    //         // return state.text + rootState.count
    //         return state.text + rootState.b.text
    //       }
    //     },
    //     actions: {
    //       add ({state, commit, rootState}) { // ctx这个模板的对象store
    //         // commit('updateTest', rootState.count) // 当前作用域查找count 全局一开始是o然后2000改变
    //         commit('updateCount', {num: 56789}, {root: true}) // 全局的调用
    //       }
    //     }
    //   },
    //   b: {
    //     namespaced: true,
    //     state: {
    //       text: 2
    //     },
    //     actions: {
    //       testAction ({commit}) {
    //         commit('a/updateTest', 'test text ', {root: true})
    //       }
    //     }
    //   }
    // }
  })
  if (module.hot) {
    module.hot.accept([
      './state/state.js',
      './mutations/mutations.js',
      './getters/getters.js',
      './actions/actions'
    ], () => {
      const newState = require('./state/state.js').default
      const newMutations = require('./mutations/mutations.js').default
      const newGetters = require('./getters/getters.js').default
      const newActions = require('./actions/actions').default
      store.hotUpdate({
        state: newState,
        mutations: newMutations,
        getters: newGetters,
        actions: newActions
      })
    })
  }
  return store
}
