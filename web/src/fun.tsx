const data = [{
  name: '发起请求',
  params: '{"path": "http://localhost:3001/api/config/pages"}',
  code: `
async function query(path) {
  const res = await axios.get(path)
  return res.data;
}

query(_params.path)
  `
}, {
  name: 'lodash',
  params: '',
  code: `
async function query(path) {
}

query(_params.path)
  `
}, {
  name: '自定义',
  params: '{}',
  code: `
// 声明您的函数
async function main() {

  // 通过 _params 对象可以获取参数

  return {} // 需要返回的结果
}

// 最后一行执行函数，自动返回函数执行结果
main()
  `
}]

export default data;