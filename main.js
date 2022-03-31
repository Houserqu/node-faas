const Koa = require('koa');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');
const {VM, VMScript} = require('vm2')
const sequelize = require('sequelize');

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
  const { code, params } = ctx.request.body

  try {
    let startTime = new Date()
    const vm = new VM({
      timeout: 10000, // 超时时间
      sandbox: {
        axios,
        _,
        sequelize,
        _params: params ? JSON.parse(params) : {} // 参数
      }
    })
    const result = await vm.run(code)

    let endTime = new Date()

    ctx.body = { ret: 0, data: {
      result,
      runTime: `${endTime.getTime() - startTime.getTime()}ms`
    } }
  } catch (error) {
    ctx.body = { ret: 1, msg: error.message }
  }
})

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(8030);