// import Todo from './../view/todo/todo.vue'
// import Login from './../view/login/login.vue'

export default[
  {
    path: '/',
    redirect: '/app'// 重定向
  },
  {
    path: '/app/:id', // app/xxx
    // path: '/app/:id', // app/xxx
    props: true, // 设置为true时，可以在组件本组件Todo通过props获取:后的值，而不用通过this.$route获取时通过props获取
    // props: {
    //   id: 'ddd'
    // },
    // props (route) => ({id:route.query.b}),
    // component: Todo,
    // 使用异步组件，解决一次性加载全部代码 要使用插件不然报语法错误
    // 不要再需要的地方再引进
    component: () => import('./../view/todo/todo.vue'),
    // components: {// 两个router-view的时候适合用在上左中布局
    //   default: Todo,
    //   a: Login
    // },
    name: 'app', // 可以直接使用那么做路由跳转{}用：绑定:to="{name : 'app'}"
    meta: {// 保存路由的一些信息,这些信息都可以在拿到路由的时候直接点meta使用
      title: 'this is a app',
      description: 'aaaaddd'
    },
    beforeEnter (to, from, next) {
      console.log('beforeEnter routes')
      next()
    }
    // children: [// 嵌套路由// 子路由 相当于 /app/test 注意要在父的页面中由router-view占位用来替换路由的页面，
    //   {
    //     path: 'test',
    //     component: Login
    //   }
    // ]
  },
  {
    path: '/login',
    // component: Login
    component: () => import('./../view/login/login.vue')
    // components: {
    //   default: Login,
    //   a: Todo
    // }
  }
]
