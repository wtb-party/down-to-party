const Sequelize = require('sequelize')
const db = require('../db')

const Quote = db.define('quote', {
  listingId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  providerId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  serviceId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('pending', 'accepted', 'rejected'),
    defaultValue: 'pending',
    allowNull: false
  }
})

module.exports = Quote
