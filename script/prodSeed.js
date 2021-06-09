'use strict'

const db = require('../server/db')
const {
  Skill,
  User,
  Provider,
  Service,
  Event,
  EventType,
  Listing,
  Quote
} = require('../server/db/models')

async function prodSeed() {
  await db.sync({force: true})

  await Skill.bulkCreate([
    {title: 'Bartender'},
    {title: 'Chef'},
    {title: 'Coordinator'},
    {title: 'Dancer'},
    {title: 'Decorator'},
    {title: 'DJ'},
    {title: 'Lighting Technician'},
    {title: 'Magician'},
    {title: 'MC'},
    {title: 'Server'},
    {title: 'Singer'},
    {title: 'Actor'},
    {title: 'Acrobat'},
    {title: 'Aerialist'},
    {title: 'Clown'},
    {title: 'Contortionist'},
    {title: 'Server'},
    {title: 'Body Painter'},
    {title: 'Face Painter'},
    {title: 'Hair Stylist'},
    {title: 'Makeup Artist'},
    {title: 'Spray Tan Artist'},
    {title: 'Masseuse'},
    {title: 'Caterer'}
  ])

  await EventType.bulkCreate([
    {name: 'Birthday Party'},
    {name: 'Cocktail Party'},
    {name: 'Business Outing'},
    {name: 'Housewarming Party'},
    {name: 'Dinner Party'},
    {name: 'Fundraiser'},
    {name: 'Holiday Party'},
    {name: 'House Party'},
    {name: 'Bachelor Party'},
    {name: 'Bachelorette Party'},
    {name: 'Graduation Party'}
  ])

  console.log('db synced')
}

async function runSeed() {
  console.log('seeding...')
  try {
    await prodSeed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

if (module === require.main) {
  runSeed()
}

module.exports = prodSeed
