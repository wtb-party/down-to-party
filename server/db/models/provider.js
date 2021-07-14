const Sequelize = require('sequelize')
const db = require('../db')

const Provider = db.define('provider', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  userId: {
    type: Sequelize.UUID,
    allowNull: false
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  stripeId: {
    type: Sequelize.STRING
  }
})

module.exports = Provider
