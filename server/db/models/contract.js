const Sequelize = require('sequelize')
const db = require('../db')

const Contract = db.define('contract', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  eventId: {
    type: Sequelize.UUID,
    allowNull: false
  },
  quoteId: {
    type: Sequelize.UUID,
    allowNull: false
  },
  providerId: {
    type: Sequelize.UUID,
    allowNull: false
  }
})

module.exports = Contract
