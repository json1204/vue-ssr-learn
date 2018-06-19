const Koa = require('koa')

// 处理不经过的ifoa
const send = require('koa-send')

const path = require('path')
const pageRouter = require('./routers/dev-ssr')
const app = new Koa()

const isDev = process.env.NODE_ENV = 'development'

// 中间件
app.use(async (ctx, next) => {
  try {
    console.log(`request width path ${ctx.path}`)
    await next()
  } catch (err) {
    console.log(err)
    ctx.status = 500
    if (isDev) {
      ctx.body = err.message
    } else {
      ctx.bosy = 'please try again later'
    }
  }

})

app.use(async (ctx, next) => {
  if (ctx.path === '/favicon.ico') {
    await send(ctx, '/favicon.ico', { root: path.join(__dirname, '../') })
  } else {

    await next()
  }
})

app.use(pageRouter.routes()).use(pageRouter.allowedMethods())
const HOST = process.env.HOST || '0.0.0.0'
const POST = process.env.POST || 3333
app.listen(POST, HOST, () => {
  console.log(`server is listening on ${HOST}: ${POST}`)
})
