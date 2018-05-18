<template>
    <div id="app">
        <div id="cover"></div>
        <Header/>
        <todo/>
        <Footer/>
    </div>

</template>
<script>
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
import todo from './view/todo/todo.vue'
export default {
  components: {
    Header,
    Footer,
    todo
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


