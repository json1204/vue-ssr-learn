import Vue from 'vue'

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
  props: {
    active: Boolean,
    // propOne: {
    //   required: true
    // }
    propOne: String
  },
  mounted () {
    // console.log('extend comp mounted')
    // console.log(this.$parent.$options.name)// 拿到父组件的name
    // console.log(this.$parent.name)

  }
}

// const CompVue = Vue.extend(compoent)

// // extend
// new CompVue({
//   el: '#root',
//   // props: {
//   //   propOne: '333'// 这样传组件内部拿不到值
//   // }
//   propsData: {
//     propOne: '333'// 这样传组件内部可以拿值
//   },
//   data: {// 这样会覆盖子组件里的data信息
//     text: '444'
//   },
//   mounted () {
//     console.log('instance mounted')// 先执行comp，在执行extend
//   }
// })

const parent = new Vue({// 修改parent
  name: 'parent'
})
// extends用来复用组件，覆盖一些组件需要的，和用一些默认值，扩展组件功能
const component2 = {
  parent: parent,
  extends: compoent, // extends里面的组件会被外面的覆盖data，porps //先执行extend前的
  data () {
    return {
      text: 1
    }
  },
  mounted () {
    this.$parent.text = '452$parent'// 改变父组件的值
    console.log(this.$parent.$options.name)/// 获取到的是谁在用这个组件
  }
}

new Vue({
  // parent: parent, // 放在new Vue中
  name: 'Root',
  el: '#root',
  components: {
    Comp: component2
  },
  mounted () {
    // this.$parent.text = '452$parent'// 改变父组件的值
    // console.log(this.$parent.$options.name)
  },
  data: {
    text: '12'
  },
  template: `
  <div>
    <span>{{ text }}</span>
    <comp></comp>

  </div>

  `
  // <comp></comp>谁使用了谁就是父组件，可以修改，一般不建议修改
})
