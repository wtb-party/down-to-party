const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  auth0Id: {
    type: Sequelize.STRING
  },
  location: {
    type: Sequelize.STRING
  },
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  photoURL: {
    type: Sequelize.STRING
  }
})

module.exports = User
