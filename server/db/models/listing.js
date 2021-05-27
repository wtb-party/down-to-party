const Sequelize = require('sequelize')
const db = require('../db')

const Listing = db.define('listing', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  positionsAvailable: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    allowNull: false
  }
})

module.exports = Listing
