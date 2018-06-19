const Router = require('koa-router')

const path = require('path')
const axios = require('axios')

const fs = require('fs')
// MemoryFs 不会写入磁盘中，而是在内存中
const MemoryFs = require('memory-fs')

const webpack = require('webpack')

const VueServerRenderer = require('vue-server-renderer')

const serverConfig = require('./../../build/webpack.config.server')

const serverCompiler = webpack(serverConfig)

const mfs = new MemoryFs()

const serverRender = require('./server-render')

serverCompiler.outputFileSystem = mfs

// 每次都打包新的文件
let bundle

serverCompiler.watch({}, (err, stats) => {
  if (err) throw err
  stats = stats.toJson()
  stats.errors.forEach(err => console.log(err))
  stats.warnings.forEach(warn => console.warn(err))

  const bundlePath = path.join(
    serverConfig.output.path,
    'vue-ssr-server-bundle.json'
  )
  // 读取文件是获取的是字符串，要转换成json格式
  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
  // 每次重新服务端的打包
  console.log('new bundle genered')
})

// 处理服务端返回的内容
const handleSSR = async (ctx) => {
  if (!bundle) {
    ctx.body = '你等会，别着急-----'
    return
  }
  // 获取客户端的js等文件
  // 两个单独的server获取文件 通过请求获取
  // 'http://127.0.0.1:8000/vue-ssr-client-manifest.json'
  const clienMansfestResp = await axios.get(
    'http://127.0.0.1:8000/public/vue-ssr-client-manifest.json'
  )

  // 拿到客户端生成的内容
  const clientManifest = clienMansfestResp.data

  const template = fs.readFileSync(
    path.join(__dirname, '../server.template.ejs'),
    'utf-8'
  )

  const renderer = VueServerRenderer
    .createBundleRenderer(bundle, {
      inject: false,
      clientManifest

    })

  await serverRender(ctx, renderer, template)
}

const router = new Router()

router.get('*', handleSSR)
module.exports = router
