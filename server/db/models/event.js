const Sequelize = require('sequelize')
const db = require('../db')

const Event = db.define('event', {
  location: {
    type: Sequelize.STRING
  },
  date: {
    type: Sequelize.DATE
  }
})

module.exports = Event
