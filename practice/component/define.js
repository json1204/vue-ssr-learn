import Vue from 'vue'

// 定义组件
// const data = {// 这样全局会导致多次运用时会vue分不开，没有唯一性
//   text: 0
// }
const compoent = {
  template: `
  <div>
    <input type=text v-model.number="text"/>
    <div v-show="active">props show</div>
    <div @click="handleChange">{{propOne}}</div>
  </div>
  `,
  data () {
    // return data
    return {
      text: 0
    }
  },
  methods: {
    handleChange () {
      // this.onChange()
      this.$emit('change')
    }

  },
  props: {// 定义组件一些类型
    active: {
      // type: Boolean,
      // required: true,e
      // default: true// 默认值
      validator (value) {
        return typeof value === 'boolean'
      }
      // default () { // 是对象时候
      //   return {

      //   }
      // }
    },
    propOne: String
    // onChange: Function
  }
}
// 1.把组件挂载在vue上
// Vue.component('CompOne', compoent)
new Vue({
  components: {
    CompOne: compoent
  },
  el: '#root',
  data: {
    prop1: 'text1'
  },
  mounted () {
    console.log(this.$refs.comp1)
  },
  methods: {
    handleChange () {
      this.prop1 += 1
    }
  },
  template: `
    <div>
      <comp-one ref="comp1" :active="false" :prop-one='prop1' @change='handleChange'></comp-one>
      <comp-one :active="false"  propOne='text2'></comp-one>
    </div>
  `

})
