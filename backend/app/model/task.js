const Lane = require('./lane')
const User = require('./user')

module.exports = app => {
  const { STRING, UUID, DataTypes, INTEGER } = app.Sequelize

  const Task = app.model.define('task', {
    id: {
      type: UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: STRING,
    content: STRING,
    laneId: {
      type: UUID,
      field: 'lane_id',
      references: {
        // This is a reference to another model
        model: Lane,
        // This is the column name of the referenced model
        key: 'id',
      }
    },
    userId: {
      type: UUID,
      field: 'user_id',
      references: {
        model: User,
        key: 'id',
      }
    },
    order: INTEGER
  })
  return Task
}
