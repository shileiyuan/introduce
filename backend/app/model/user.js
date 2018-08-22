module.exports = app => {
  const { STRING, INTEGER, DATE, UUID, DataTypes } = app.Sequelize

  const User = app.model.define('user', {
    id: {
      type: UUID,
      field: 'iduser',
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    username: {
      type: STRING,
      field: 'name'
    },
    password: STRING(32),
    age: INTEGER,
    updateTime: {
      type: STRING,
      field: 'update_time'
    }
  })

  // User.findByLogin = async login => {
  //   return await this.findOne({
  //     where: {
  //       login
  //     }
  //   })
  // }

  // User.prototype.logSignin = async () => {
  //   return await this.update({ last_sign_in_at: new Date() })
  // }
  return User
}
