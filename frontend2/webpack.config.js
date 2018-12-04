function buildConfig(env) {
  switch (env) {
    case 'dev':
      return require('./scripts/dev.js')('development')
    case 'prod':
      return require('./scripts/prod.js')('production')
    default: throw new Error(`there is no such file: ${env}.js`)
  }
}

module.exports = buildConfig
