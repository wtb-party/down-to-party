const User = require('./user')
const Provider = require('./provider')
const Contract = require('./contract')
const Event = require('./event')
const EventType = require('./eventType')
const Listing = require('./listing')
const Skill = require('./skill')
const Service = require('./service')
const Quote = require('./quote')
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

// Event & Skill so we don't store a bunch of random services
Event.belongsToMany(Skill, {through: Listing})
Skill.belongsToMany(Event, {through: Listing})
Event.hasMany(Listing)
Listing.belongsTo(Event)
Skill.hasMany(Listing)
Listing.belongsTo(Skill, {as: 'role', foreignKey: 'skillId'})

Event.belongsTo(EventType)
EventType.belongsToMany(Event, {through: 'event_type'})

Quote.hasOne(Contract)
Contract.belongsTo(Quote)

// User and Skills
User.belongsToMany(Skill, {through: 'user_skills'})
Skill.belongsToMany(User, {through: 'user_skills'})

// api/v2
User.hasOne(Provider)
Provider.belongsTo(User, {as: 'profile', foreignKey: 'userId'})

Provider.belongsToMany(Event, {as: 'jobs', through: Contract})
Event.belongsToMany(Provider, {as: 'contractors', through: Contract})
Provider.hasMany(Contract)
Contract.belongsTo(Provider)
Event.hasMany(Contract)
Contract.belongsTo(Event)

Provider.belongsToMany(Skill, {as: 'services', through: Service})
Skill.belongsToMany(Provider, {as: 'providers', through: Service})
Provider.hasMany(Service)
Service.belongsTo(Provider)
Skill.hasMany(Service)
Service.belongsTo(Skill, {as: 'type', foreignKey: 'skillId'})

Listing.belongsToMany(Provider, {as: 'applicants', through: Quote})
Provider.belongsToMany(Listing, {as: 'requests', through: Quote})
Listing.hasMany(Quote)
Quote.belongsTo(Listing)
Provider.hasMany(Quote)
Quote.belongsTo(Provider)
Service.hasMany(Quote)
Quote.belongsTo(Service)

module.exports = {
  User,
  Provider,
  Contract,
  Event,
  Listing,
  Skill,
  Service,
  EventStaff,
  EventType,
  Quote
}
