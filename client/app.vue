<template>
    <div id="app">
        <div id="cover"></div>
        <Header/>
        <!-- <p>{{ counter }}</p> -->
        <p>{{fullName}} {{counter}}</p>
        <!-- <p>textA:{{ textA }}--{{ textPlus }}textC:{{textC}}</p> -->
        <!-- <p>{{counter}}</p> -->
        <!-- <router-link to="/app/123">app</router-link> -->
         <router-link to="/app/123">app123</router-link>
          <router-link to="/app/456">app456</router-link>
         <!-- <router-link :to="{name : 'app'}">name app</router-link> -->
         <router-link to="/login">login</router-link>
        <!-- <todo/> 不然路由一直是第一个-->
        <transition name="fade">
          <router-view />
         </transition>
        <Footer/>
         <!-- <router-view name="a"/> -->
    </div>

</template>
<script>
import {
  mapState,
  mapGetters,
  mapActions,
  mapMutations
} from 'vuex'
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
// import todo from './view/todo/todo.vue'
export default {
  components: {
    Header,
    Footer
    // todo
  },
  methods: {
    // 使用mapActions
    // 1.
    // ...mapActions(['updateCountAsync', 'a/add', 'b/testAction']),
    ...mapActions(['updateCountAsync']),
    // mapMutations
    // 1.
    // ...mapMutations(['updateCount', 'a/updateTest'])
    ...mapMutations(['updateCount'])
  },
  mounted () {
    // console.log(this['a/textPlus'])
    // 调用store模板里的mutations
    // this.updateTest('123')
    // this['a/updateTest']('0123') // namespaced为true
    // this['a/add']()
    // this['b/testAction']()
    // this.$store.state.count = 3 组件中修改data数据不推荐
    // debugger
    // console.log(this.$route)// 每个组件都可以使用到的
    // console.log(this.$store) // 每个组件都有个$store对象

    // 1.使用mapActions
    // 第一中的调用方法
    this.updateCountAsync({
      num: 5,
      time: 2000
    })

    // 2.触发actions
    // this.$store.dispatch('updateCountAsync', {
    //   num: 5,
    //   time: 2000
    // })

    // let i = 1
    // setInterval(() => {
    //   // 2. mutations的使用 commit
    //   this.$store.commit('updateCount', {
    //     num: i++,
    //     num2: 2
    //   }) // 去触发函数
    // }, 1000)

    // let i = 1
    // setInterval(() => {
    //   // 1.第一中的触发方法.mutations的使用 commit
    //   this.updateCount({
    //     num: i++,
    //     num2: 2
    //   }) // 去触发函数
    // }, 1000)
  },
  computed: {
    // 调用store模板里的mutations
    // textA () {
    //   return this.$store.state.a.text
    // },

    // State的使用
    // 1.数组声明
    //  ...mapState(['count']),
    // 2.对象声明
    //  ...mapState({
    //   counter: 'count'
    // }),
    // 3.函数的使用
    ...mapState({
      counter: (state) => state.count
      // textA: state => state.a.text,
      // textC: state => state.c.text
    }),

    // getters的使用
    // ...mapGetters(['fullName', 'a/textPlus'])
    ...mapGetters({
      'fullName': 'fullName'
      // textPlus: 'a/textPlus'
    })
    // count () { // 监听count
    //   return this.$store.state.count
    // },
    // fullName () {
    //   return this.$store.getters.funllName
    // }
  }
}
</script>

<style lang="stylus" scoped>
#app
    position :absolute
    left 0
    right 0
    bottom 0
    top 0
#cover
    position absolute
    left 0
    right 0
    bottom 0
    top 0
    background-color #999999
    opacity .7
    z-index -1
</style>


