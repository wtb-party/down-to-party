const Sequelize = require('sequelize')
const db = require('../db')

const Skill = db.define(
  'skill',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: Sequelize.STRING
    }
  },
  {
    timestamps: false
  }
)

module.exports = Skill
