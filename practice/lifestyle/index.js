import Vue from 'vue'
// import { setInterval } from 'timers'
const app = new Vue({
  // template: '<div>{{text}}</div>',
  data: {
    text: '0'
  },
  beforeCreate () {
    console.log(this.$el, 'beforeCreate')
  },
  created () {
    console.log(this.$el, 'created可以最早时执行ajax')// this.$el undefined
  },
  // mount在服务端中不执行 只执行created
  beforeMount () {
    console.log(this.$el, 'beforeMount')// app.$mount('#root') 必须有挂载在dom中才执行 在这时template
  },
  mounted () {
    console.log(this.$el, 'mounted有Dom操作dom')// 在这时替换后的dom元素
  },
  // 前面这些通常只会调用一次

  beforeUpdate () {
    console.log(this.$el, 'beforeUpdate只要数据有更新就执行update 前面的函数不执行了')
  },

  updated () {
    console.log(this.$el, 'updated')
  },
  activated () {
    console.log(this.$el, 'activated')
  },
  deactivated () {
    console.log(this.$el, 'deactivated')
  },
  beforeDestroy () {
    console.log(this.$el, 'beforeDestroy组件销毁')// this.$el undefined
  },
  destroyed () {
    console.log(this.$el, 'destroyed')
  },
  render (h) { // 相当于template  //在beforedmounted 和mounted中间执行
    throw new TypeError('render errrd---')// 本组件报错才出现   子组件出错不会报错
    // console.log(this.el, 'render')
    // return h('div', {}, this.text)// 在开发中由vue.router去编译template
  },
  renderError (h, err) { // 只有在开发时才会调用 ，上线后不调用
    return h('div', {}, err.stack)
  }
  // errorCaptured (h, err) { // 捕获错误 如果在根组件中设置那么所有的组件只要其中的一个报错都会捕获到，除非禁止了冒泡，在任何环境都可以用
  //   return h('div', {}, err.stack)
  // }
})
app.$mount('#root')
// setInterval(() => {
//   app.text += 1
// }, 1000)
// setTimeout(() => {
//   app.$destroy()// 组件销毁
// }, 1000)
