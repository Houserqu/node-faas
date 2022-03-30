const Koa = require('koa');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');
const {VM, VMScript} = require('vm2')

const app = new Koa();
const router = new Router();

// vm sandbox 第三方库
const axios = require('axios')
const  _ = require('lodash')

app.use(bodyParser({
  enableTypes: ['json', 'form', 'text']
}));

// 校验代码合法性
router.post('/api/check', (ctx) => {
  const code = ctx.request.body
  
  try {
    new VMScript(code).compile() // 预编译代码
    ctx.body = { ret: 0 }
  } catch (error) {
    ctx.body = { ret: 1, msg: error.message }
  }
})

// 执行代码
router.post('/api/run', async (ctx, next) => {
  const code = ctx.request.body
  
  try {
    const vm = new VM({
      timeout: 10000, // 超时时间
      sandbox: {
        axios,
        _,
        _params: ctx.request.query // 参数
      }
    })

    const res = await vm.run(code)
    ctx.body = { ret: 0, data: res }
  } catch (error) {
    ctx.body = { ret: 1, msg: error.message }
  }
})

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(8030);