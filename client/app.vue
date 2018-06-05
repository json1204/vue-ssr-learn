<template>
    <div id="app">
        <div id="cover"></div>
        <Header/>
        <p>{{ count }}</p>
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
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
// import todo from './view/todo/todo.vue'
export default {
  components: {
    Header,
    Footer
    // todo
  },
  mounted () {
    // console.log(this.$route)// 每个组件都可以使用到的
    console.log(this.$store) // 每个组件都有个$store对象
    let i = 1
    setInterval(() => {
      this.$store.commit('updateCount', i++) // 去触发函数
    }, 1000)
  },
  computed: {
    count () { // 监听count
      return this.$store.state.count
    }
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


