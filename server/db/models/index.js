const User = require('./user')
const Event = require('./event')
const EventType = require('./eventType')
const Skill = require('./skill')
const Sequelize = require('sequelize')
const db = require('../db')

const EventStaff = db.define('event_staff', {
  skillId: {
    type: Sequelize.INTEGER
  }
})

// User & Event for "Hosting"
User.hasMany(Event)
Event.belongsTo(User, {as: 'Host', foreignKey: 'userId'})

// User & Event for finding jobs as user, and finding workers as an event
User.belongsToMany(Event, {as: 'jobs', through: EventStaff})
Event.belongsToMany(User, {as: 'workers', through: EventStaff})

// Event & Skill so we don't store a bunch of random services
Event.belongsToMany(Skill, {as: 'services', through: 'want_to_hire'})
Skill.belongsToMany(Event, {as: 'providers', through: 'want_to_hire'})

Event.belongsTo(EventType)
EventType.belongsToMany(Event, {through: 'event_type'})

// User and Skills
Skill.belongsToMany(User, {through: 'user_skills'})
User.belongsToMany(Skill, {through: 'user_skills'})

module.exports = {
  User,
  Event,
  Skill,
  EventStaff,
  EventType
}
