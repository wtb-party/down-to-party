const Sequelize = require('sequelize')
const db = require('../db')

const Skill = db.define('skill', {
  title: {
    type: Sequelize.STRING
  }
})

module.exports = Skill
