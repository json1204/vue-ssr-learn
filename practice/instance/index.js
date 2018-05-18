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
})
