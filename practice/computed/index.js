import Vue from 'vue'
new Vue({
  el: '#root',
  template: `
    <div>
      <p>Name:{{ name }} </p>
      <p>Name methods:{{ getName() }} </p>
      <p>number:{{ number}} </p>
      <p>FullName:{{ fullName}} </p>
      <p><input type="text" v-model="number" /></p>
      <p>firstName<input type="text" v-model="firstName" /></p>
      <p>LastName<input type="text" v-model="LastName" /></p>
      <p>setComputedName<input type="text" v-model="name" /></p>
      <p>Obj.a<input type="text" v-model="obj.a" /></p>
    </div>

  `,
  data: {
    firstName: 'Dong',
    LastName: 'Me',
    number: 0,
    fullName: '',
    obj: {
      a: '123'
    }
  },
  methods: {
    getName () {
      console.log('methods getName')
      return `${this.firstName} ${this.LastName}`
    }
  },
  mounted () {
    this.obj = {
      a: '345'
    }
  },
  computed: {// 计算要有return
    // name () { // 1种写法 是缓存的 监听的属性可以不在data上写但要在模板上引用 返回的时返回在模板引用的地方
    //   console.log('computed Name')// 只要其中需要的数据一有变化就会触发
    //   return `${this.firstName} ${this.LastName}`
    // }
    name: {
      get () { // eslint-disable-line
        console.log('get computed')
        return `${this.firstName} ${this.LastName}`
      },
      set (name) {// eslint-disable-line
        console.log('set computed')
        const names = name.split(' ')
        this.firstName = names[0]
        this.LastName = names[1]
        // return `${this.firstName} ${this.LastName}`
      }
    }
  },
  watch: {// watch 操作的场景：是数据有了变化后要去做一些变化如请求后台
    // firstName (newName, oldName) { // 最先绑定是不执行
    //   console.log('newName:' + newName + ',oldName:' + oldName)
    //   this.fullName = newName + ' ' + this.LastName
    // }
    firstName: { // 最先绑定是不执行
      handler (newName, oldName) {
        console.log('newName:' + newName + ',oldName:' + oldName)
        this.fullName = newName + ' ' + this.LastName
      },
      immediate: true // 立即执行
      // deep: true
    },
    // obj: { // 最先绑定是不执行   obj: { //只监听obj,给他赋值才由作用
    //   handler (newName, oldName) {
    //     console.log('newName:' + newName + ',oldName:' + oldName)
    //     // this.fullName = newName + ' ' + this.LastName
    //   },
    //   immediate: true // 立即执行
    //   // deep: true// 循环节点监听
    // },
    'obj.a': { // 最先绑定是不执行   obj: { //只监听obj,给他赋值才由作用
      handler (newName, oldName) {
        console.log('newName:' + newName + ',oldName:' + oldName)
        // this.fullName = newName + ' ' + this.LastName
        // this.obj.a += 1// 不要在watch和computed中修改监听的值 不然会导致循环卡死报错 只能够给付新值
      },
      immediate: true // 立即执行
      // deep: true// 循环节点监听
    }
  }
})
