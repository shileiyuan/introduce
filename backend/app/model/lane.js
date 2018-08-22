module.exports = app => {
  const { STRING, UUID, DataTypes } = app.Sequelize

  const Lane = app.model.define('lane', {
    id: {
      type: UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: STRING,
    color: STRING
  })
  return Lane
}
