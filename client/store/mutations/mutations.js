export default {
  updateCount (state, {num, num2}) {
    // console.log(num2, num)

    state.count = num
  }
}
// 处理同步的逻辑代码
// 作用：官方推荐再mutations中修改data的数据，其实用户也可以再组件中修改 可以定义是否再组件修改
