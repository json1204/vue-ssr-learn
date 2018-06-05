import Vue from 'vue'
const component = {
  props: ['value'], // 父组件传过来的
  template: `
    <div>
      <input type='text' @input="handleInput" :value='value'/>
    </div>

  `,
  methods: {
    handleInput (e) {
      // 事件处理将新的数据返回去父组件
      this.$emit('input', e.target.value)
    }
  }
}

new Vue({
  el: '#root',
  components: {
    CompOne: component
  },
  data () {
    return {
      value: '1234'
    }
  },
  template: `
  <div>
    <comp-one :value="value" @input ="value =arguments[0]" ></comp-one>
  </div>
  `

})
