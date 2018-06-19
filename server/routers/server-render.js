const ejs = require('ejs')

module.exports = async (ctx, renderer, template) => {
  ctx.headers['context-Type'] = 'text/html'

  const context = { url: ctx.path } // context 有html的内容

  try {
    const appString = await renderer.renderToString(context) // context 这个等于server-entry.js的export的context

    const html = ejs.render(template, {
      appString,
      style: context.renderStyles(),
      scripts: context.renderScripts()
    })

    ctx.body = html // 返回客户端内容
  } catch (err) {
    console.log('render error ', err)
    throw err
  }
}
