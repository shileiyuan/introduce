module.exports = appInfo => {
  const config = {}

  config.keys = 'ysl' + appInfo.name

  config.sequelize = {
    dialect: 'mysql',
    database: 'panda',
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: 'mafan2011',
    define: {
      // http://docs.sequelizejs.com/manual/tutorial/models-definition.html#configuration
      timestamps: false,
      freezeTableName: true
    },
    pool: {
      max: 5,
      idle: 30000,
      acquire: 60000,
    },
  }

  config.security = {
    csrf: false
  }

  return config
}
