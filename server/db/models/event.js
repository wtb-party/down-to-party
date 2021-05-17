const Sequelize = require('sequelize')
const db = require('../db')

const Event = db.define('event', {
  location: {
    type: Sequelize.STRING
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  public: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Event
