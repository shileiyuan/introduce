const context = require.context('./', false, /\.js$/)
const keys = context.keys().filter(path => path !== './index.js')

const API = keys.reduce((acc, path) => {
  return {
    ...acc,
    ...context(path)
  }
}, {})

export default API
