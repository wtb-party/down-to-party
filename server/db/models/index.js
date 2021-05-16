const User = require('./user')
const Event = require('./event')
const Skill = require('./skill')
const Sequelize = require('sequelize')
const db = require('../db')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

const UserSkills = db.define('userSkills', {
  skillId: {
    type: Sequelize.INTEGER
  },
  userId: {
    type: Sequelize.INTEGER
  }
})

User.hasMany(Event)
Event.belongsTo(User)

Skill.belongsToMany(User, {through: UserSkills})
User.belongsToMany(Skill, {through: UserSkills})

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Event,
  Skill
}
