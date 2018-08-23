module.exports = appInfo => {
  return {
    keys: 'ysl' + appInfo.name,
    sequelize: {
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
    },
    security: {
      csrf: false
    },
    middleware: [
      // 'auth'
    ],
    jwt: {
      cert: 'introduce_cert',
      options: {
        expiresIn: '1h'
      },
      header: 'x-auth-token'
    },
  }
}
