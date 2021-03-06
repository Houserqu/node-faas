const data = [{
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
}, {
  name: '发起请求',
  params: `
{
  "path": "http://localhost:8030/api/ping"
}
  `,
  code: `
async function query(path) {
  const res = await axios.get(path)
  return res.data;
}

query(_params.path)
  `
}, {
  name: 'lodash',
  params: `
{
  "count": 10
}
  `,
  code: `
async function genUsers(count) {
  const users = []
  for(let i = 0; i < count; i++) {
      users.push({
          name: 'tom' + i,
          age: _.random(1, 100)
      })
  }

  // 根据年龄排序
  return _.sortBy(users, 'age')
}

genUsers(_params.count)
  `
}, {
  name: 'mysql',
  params: '{}',
  code: `
const { Sequelize } = sequelize;

const mysql = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'example'
  });

async function main() {
  const res = await mysql.query('select * from example')
  return res // 需要返回的结果
}

// 最后一行执行函数，自动返回函数执行结果
main()
  `
}]

export default data;