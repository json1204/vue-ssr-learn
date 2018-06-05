<template>
  <section class="real-app">
    <input
      type="text"
      name=""
      class="add-input"
      autofocus='autofocus'
      placeholder="接下来做什么"
      @keyup.enter="addTodo"
     >
     <item
     :todo="todo"
     v-for="todo in filteredTodos"
     :key='todo.id'
     @del="myDeletToDo"
     ></item>
     <tabs
      :filter="filter"
      :todos="todos"
      @toggle="mytoggle"
      @myclearAllCompleted="myclearAllCompleted"
      />
      <!-- <router-view></router-view>嵌套路由时使用 -->
  </section>
</template>
<script>
import './../../assets/styles/todo.styl'

// 引进组件
import Item from './item.vue'
import Tabs from './tabs.vue'
let id = 0
export default {
  beforeRouteEnter (to, from, next) { // 这里一般拿不到this
    // console.log(this) // 在这里拿到数据并塞到模板中
    console.log('beforeRouterEnter Todo')
    next(vm => {
      console.log('after enter this.id is', vm.id)
    })
  },
  beforeRouteUpdate (to, from, next) { // 只有在相同的路由的时候，列如列表的详情id不同
    console.log('beforeRouteUpdate todo')
    console.log(this.id)
    next()
  },
  beforeRouteLeave (to, from, next) { // 这进行弹框是否要离开
    console.log('beforeRouteLeave todo')
    if (global.confirm('are you ?')) {
      next()
    }
    // next()
  },
  props: ['id'],
  data () {
    return {
      todos: [],
      filter: 'all'

    }
  },
  // 组件
  components: {
    Item,
    Tabs
  },
  mounted () { // 这里如果处理不同id的刷新就不会刷新id
    // this.my();
    console.log('todo mounted')
    // console.log(this.id)
    // console.log(this.$route) // 每个组件都可以使用到的
  },
  computed: {
    filteredTodos () {
    // 过滤全部
      if (this.filter === 'all') {
        return this.todos
      }
      // 过滤completed为true的
      const completed = this.filter === 'completed'
      return this.todos.filter(todo => completed === todo.completed)
    }
  },
  methods: {
    myclearAllCompleted () {
      // 删除未完成的completed
      this.todos = this.todos.filter(todo => !todo.completed)
    },
    mytoggle (state) {
      this.filter = state
    },

    addTodo (e) {
      this.todos.unshift({
        id: id++,
        content: e.target.value.trim(),
        completed: false
      })
      // 清空input
      e.target.value = ''
    },
    myDeletToDo (id) { // id是在子组件中传过来的
      // 数组删除一条

      this.todos.splice(this.todos.findIndex(function (todo) { return todo.id === id }), 1)
      // this.todos.splice(this.todos.findIndex(todo=>todo.id===id));
    }
  }
}
</script>
<style lang="stylus" scoped>

</style>
