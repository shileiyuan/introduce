
const context = require.context('./', false, /\.js$/)
const keys = context.keys().filter(path => path !== './index.js')

const store = {}

keys.forEach(path => {
  // context相当于require
  const model = context(path).default
  const name = path.match(/\.\/(\w+)\.js/)[1]
  store[_.camelCase(name)] = model
})

export default store
