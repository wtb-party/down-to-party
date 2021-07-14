const Sequelize = require('sequelize')
const db = require('../db')

const Service = db.define(
  'service',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    providerId: {
      type: Sequelize.UUID,
      allowNull: false
    },
    skillId: {
      type: Sequelize.UUID,
      allowNull: false
    },
    rate1: {
      type: Sequelize.DECIMAL(8, 2),
      defaultValue: 0.0,
      allowNull: false
    },
    rate1Mode: {
      type: Sequelize.ENUM('flat', 'daily', 'hourly', 'tipped'),
      defaultValue: 'flat',
      allowNull: false
    },
    rate2: {
      type: Sequelize.DECIMAL(8, 2)
    },
    rate2Mode: {
      type: Sequelize.ENUM('flat', 'daily', 'hourly', 'tipped', 'deposit')
    }
  },
  {
    createdAt: false
  }
)

module.exports = Service
