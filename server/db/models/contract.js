const Sequelize = require('sequelize')
const db = require('../db')

const Contract = db.define('contract', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  eventId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  quoteId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  providerId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Contract
