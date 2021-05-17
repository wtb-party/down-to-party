const User = require('./user')
const Event = require('./event')
const Skill = require('./skill')
const Sequelize = require('sequelize')
const db = require('../db')

const EventStaff = db.define('event_staff', {
  skillId: {
    type: Sequelize.INTEGER
  }
})

User.hasMany(Event)
Event.belongsTo(User, {as: 'Host', foreignKey: 'userId'})

User.belongsToMany(Event, {as: 'Jobs', through: EventStaff})
Event.belongsToMany(User, {as: 'Workers', through: EventStaff})

Skill.belongsToMany(User, {through: 'user_skills'})
User.belongsToMany(Skill, {through: 'user_skills'})

module.exports = {
  User,
  Event,
  Skill
}
