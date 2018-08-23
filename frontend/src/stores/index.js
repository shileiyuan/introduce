
const context = require.context('./', false, /\.js$/)
const keys = context.keys().filter(path => path !== './index.js')

const stores = {}

keys.forEach(path => {
  // context相当于require
  const store = context(path).default
  const name = path.match(/\.\/(\w+)\.js/)[1]

  stores[`${_.camelCase(name)}Store`] = store
})

export default stores
