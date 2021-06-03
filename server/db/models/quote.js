const Sequelize = require('sequelize')
const db = require('../db')

const Quote = db.define('quote', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
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
    type: Sequelize.ENUM(
      'pending',
      'accepted',
      'rejected',
      'confirmed',
      'canceled'
    ),
    defaultValue: 'pending',
    allowNull: false
  }
})

module.exports = Quote
