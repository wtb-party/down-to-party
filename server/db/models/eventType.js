const Sequelize = require('sequelize')
const db = require('../db')

const EventType = db.define('eventType', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING
  }
})

module.exports = EventType
