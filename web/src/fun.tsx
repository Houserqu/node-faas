const data = [{
  name: 'axios',
  params: [{ key: 'path', value: 'http://localhost:3001/api/config/pages' }],
  code: `
async function query(path) {
  const res = await axios.get(path)
  return res.data;
}

query(_params.path)
  `
}, {
  name: 'lodash',
  params: [{ key: 'path', value: 'http://localhost:3001/api/config/pages' }],
  code: `
async function query(path) {
}

query(_params.path)
  `
}]

export default data;