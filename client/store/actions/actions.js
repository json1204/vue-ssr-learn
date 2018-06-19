export default {
  updateCountAsync (store, data) {
    setTimeout(() => {
      // 去调用mutations的方法
      store.commit('updateCount', {
        num: data.num
      })
    }, data.time)
  }
}
// 作用：处理异步的逻辑代码 列如 ： 数据的请求 异步修改数据
