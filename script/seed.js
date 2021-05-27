'use strict'

const db = require('../server/db')
const {User, Provider, Event, Skill, EventType} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'}),
    User.create({email: 'user1@email.com', password: '123'}),
    User.create({email: 'user2@email.com', password: '123'}),
    User.create({email: 'user3@email.com', password: '123'}),
    User.create({email: 'user4@email.com', password: '123'}),
    User.create({email: 'user5@email.com', password: '123'}),
    User.create({email: 'user6@email.com', password: '123'}),
    User.create({email: 'user7@email.com', password: '123'}),
    User.create({email: 'user8@email.com', password: '123'})
  ])

  const providers = await Promise.all([
    Provider.create({isActive: true}),
    Provider.create({isActive: true}),
    Provider.create({isActive: true}),
    Provider.create(),
    Provider.create()
  ])

  const eventTypes = await Promise.all([
    EventType.create({name: 'Birthday Party'}),
    EventType.create({name: 'Cocktail Party'}),
    EventType.create({name: 'Business Outing'}),
    EventType.create({name: 'Housewarming Party'})
  ])

  const skills = await Promise.all([
    Skill.create({title: 'Bartender'}),
    Skill.create({title: 'Chef'}),
    Skill.create({title: 'Coordinator'}),
    Skill.create({title: 'Dancer'}),
    Skill.create({title: 'Decorator'}),
    Skill.create({title: 'DJ'}),
    Skill.create({title: 'Lighting Technician'}),
    Skill.create({title: 'Magician'}),
    Skill.create({title: 'MC'}),
    Skill.create({title: 'Server'})
  ])

  const events = await Promise.all([
    Event.create({location: 'Chicago'}),
    Event.create({location: 'Chicago'}),
    Event.create({location: 'Texas'}),
    Event.create({location: 'Chicago', public: true}),
    Event.create({location: 'Lake Forest', public: true}),
    Event.create({location: 'Mundelein', public: true}),
    Event.create({location: 'Naperville', public: true})
  ])

  await Promise.all([
    // events[0].addWorker(users[0], {through: {skillId: skills[0].id}}),
    // users[1].addJob(events[0], {through: {skillId: skills[5].id}}),
    events[0].addRole(skills[0]),
    events[0].addRole(skills[1]),
    events[3].addRole(skills[0]),
    events[3].addRole(skills[1]),
    events[3].addRole(skills[2]),
    events[3].addRole(skills[3]),
    events[4].addRole(skills[4]),
    events[4].addRole(skills[5]),
    events[5].addRole(skills[6]),
    events[6].addRole(skills[7]),
    events[0].setEventType(eventTypes[0]),
    events[1].setEventType(eventTypes[0]),
    events[0].setHost(users[0]),
    events[1].setHost(users[1]),
    events[2].setHost(users[0]),
    events[3].setHost(users[1]),
    events[4].setHost(users[0]),
    events[5].setHost(users[1]),
    events[6].setHost(users[0]),
    // users[0].addSkill(skills[1]),
    // users[1].addSkill(skills[5]),
    // skills[0].addUser(users[0]),

    users[0].setProvider(providers[0]),
    users[1].setProvider(providers[1]),
    users[2].setProvider(providers[2]),
    users[3].setProvider(providers[3]),
    users[4].setProvider(providers[4]),
    providers[0].setServices([skills[0], skills[1]]),
    providers[1].setServices([skills[5]]),
    providers[2].setServices([skills[2], skills[4], skills[6]]),
    providers[3].setServices([skills[1], skills[3], skills[5], skills[7]]),
    providers[4].setServices([]),
    events[3].addContractor(providers[0])
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${skills.length} skills`)
  console.log(`seeded ${events.length} events`)
  console.log(`seeded ${eventTypes.length} eventTypes`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
