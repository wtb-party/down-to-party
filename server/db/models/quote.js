const Sequelize = require('sequelize')
const db = require('../db')

const Quote = db.define('quote', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  listingId: {
    type: Sequelize.UUID,
    allowNull: false
  },
  providerId: {
    type: Sequelize.UUID,
    allowNull: false
  },
  serviceId: {
    type: Sequelize.UUID,
    allowNull: false
  },
  duration: {
    type: Sequelize.FLOAT
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
