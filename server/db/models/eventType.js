const Sequelize = require('sequelize')
const db = require('../db')

const EventType = db.define('eventType', {
  name: {
    type: Sequelize.STRING
  }
})

module.exports = EventType
