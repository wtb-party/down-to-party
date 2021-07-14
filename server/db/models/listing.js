const Sequelize = require('sequelize')
const db = require('../db')

const Listing = db.define('listing', {
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
  skillId: {
    type: Sequelize.UUID,
    allowNull: false
  },
  positionsAvailable: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    allowNull: false
  }
})

module.exports = Listing
