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
  </section>
</template>
<script>
import './../../assets/styles/todo.styl'

// 引进组件
import Item from './item.vue'
import Tabs from './tabs.vue'
let id = 0
export default {
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
  mounted () {
    // this.my();
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


