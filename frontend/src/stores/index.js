
const context = require.context('./', false, /\.js$/)
const keys = context.keys().filter(path => path !== './index.js')

const Stores = {}
const stores = {}

keys.forEach(path => {
  // context相当于require
  const Store = context(path).default
  const name = path.match(/\.\/(\w+)\.js/)[1]

  Stores[`${name}Store`] = Store
  stores[`${_.camelCase(name)}Store`] = new Store()
})

const obj = {
  stores,
  Stores
}
export default obj
