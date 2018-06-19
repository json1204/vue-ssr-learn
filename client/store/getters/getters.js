export default {
  fullName (state) {
    return `${state.firstName}123 ${state.lastName}`
  }
}
// 作用： 方便统一的数据组装，单一组装再computed
// 相当于组件内的computed
