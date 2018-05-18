<template>
  <div class="helper">
    <span class="left">{{unFinishedTodoLength}} items left</span>
    <span class="tabs">
      <span v-for="state in states"
      :key="state"
      :class="[state, filter ===state?'actived':'']"
      @click="toggleFilter(state)"
      >
        {{state}}
      </span>
    </span>
    <span class="clear" @click="clearAllcompleted">clear</span>
  </div>
</template>
<script>
export default {
  props: {
    filter: {
      type: String,
      required: true
    },
    // 接收父组件过来的参数，除了函数
    todos: {
      type: Array,
      required: true
    }
  },
  computed: {
    // 在computed中监听并计算最新的
    unFinishedTodoLength () {
      return this.todos.filter(todo => !todo.completed).length
      // return this.todos.filter(function(todo){
      //   debugger;
      //   return !todo.completed
      // }).length
    }
  },
  methods: {
    clearAllcompleted () {
      this.$emit('myclearAllCompleted')
    },
    toggleFilter (state) {
      this.$emit('toggle', state)
    }
  },
  data () {
    return {
      states: ['all', 'active', 'completed']
    }
  }
}
</script>
<style lang="stylus" scoped>
  .helper{
    font-weight 100
    display flex
    justify-content space-between
    padding 5px 0
    line-height 30px
    background-color #ffffff
    font-size 14px
    font-smoothing:antialiased;
}
.left,.clear,.tabs{
    padding 0px 10px
    box-sizing border-box
}
.left,.clear{
    width 150px
}
.left{
    text-align left 
}
.clear {
    text-align:right
    cursor pointer
}
.tabs{
    width 200px
    display flex
    justify-content space-around
    *{
        display inline-block
        padding 0px 10px
        cursor pointer
        border 1px solid rgba(175,47,47,0)
        &.actived{
            border-color rgba(175,47,47,0.4) 
            border-radius 5px
        }
    }
}
</style>

