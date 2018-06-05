import Vue from 'vue'

const app = new Vue({
  // el: '#root',
  template: '<div>{{text}}</div>',
  data: {
    text: '0'
  }
})

app.$mount('#root')

app.text = 'me0阿'
setInterval(() => {
  app.text += 1
  // app.$options.data.text += 1
  // app.$data.text += 1
}, 1000)
// console.log(app.$data)
// console.log(app.$props)
// console.log(app.$el)
// console.log(app.$options)
// app.$options.render = (h) => { // 重新渲染时才起作用
//   return h('div', {}, 'new render0')
// }
console.log(app.$root === app)
