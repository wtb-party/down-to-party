const Sequelize = require('sequelize')
const db = require('../db')

const Contract = db.define('contract', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  }
})

module.exports = Contract
