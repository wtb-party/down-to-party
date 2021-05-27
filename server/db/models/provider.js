const Sequelize = require('sequelize')
const db = require('../db')

const Provider = db.define('provider', {
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  }
})

module.exports = Provider
