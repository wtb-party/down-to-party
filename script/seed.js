'use strict'

const db = require('../server/db')
const {User, Event, Skill} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  const skills = await Promise.all([
    Skill.create({title: 'Chef'}),
    Skill.create({title: 'Bartender'})
  ])

  const events = await Promise.all([Event.create({location: 'Chicago'})])
  await events[0].setHost(users[0])
  await events[0].addWorker(users[0], {through: {skillId: skills[0].id}})
  await users[1].addJob(events[0], {through: {skillId: skills[1].id}})

  await users[0].addSkill(skills[1])
  await skills[0].addUser(users[0])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${skills.length} skills`)
  console.log(`seeded ${events.length} events`)
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
