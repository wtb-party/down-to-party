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

async function seed() {
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
    {title: 'Server'}
  ])

  const skills = await Skill.findAll()

  await EventType.bulkCreate([
    {name: 'Birthday Party'},
    {name: 'Cocktail Party'},
    {name: 'Business Outing'},
    {name: 'Housewarming Party'}
  ])

  const eventTypes = await EventType.findAll()

  await User.bulkCreate([
    {
      email: 'cody@email.com',
      password: '123',
      location: 'Chicago, IL',
      firstName: 'Cody',
      lastName: 'Brody'
    },
    {
      email: 'murphy@email.com',
      password: '123',
      firstName: 'Murphy',
      lastName: 'Wurphy'
    },
    {
      email: 'deadmau5@email.com',
      password: '123',
      location: 'Toronto, ON',
      firstName: 'Joel',
      lastName: 'Zimmerman'
    },
    {
      email: 'diplo@email.com',
      password: '123',
      firstName: 'Major',
      lastName: 'Lazer'
    },
    {
      email: 'genefarris@email.com',
      password: '123',
      location: 'Chicago, IL',
      firstName: 'Gene',
      lastName: 'Farris'
    },
    {
      email: 'giada@email.com',
      password: '123',
      location: 'Los Angeles, CA',
      firstName: 'Giada',
      lastName: 'De Laurentiis'
    },
    {
      email: 'tyler@email.com',
      password: '123',
      location: 'San Francisco, CA',
      firstName: 'Tyler',
      lastName: 'Florence'
    },
    {
      email: 'amouranth@email.com',
      password: '123',
      location: 'Houston, TX',
      firstName: 'Kaitlyn',
      lastName: 'Siragusa'
    },
    // Planner only
    {
      email: 'fungi@email.com',
      password: '123',
      location: 'Mundelein, IL',
      firstName: 'Maitake',
      lastName: 'Mushroom'
    },
    {
      email: 'GigSaladSpy@email.com',
      password: '123',
      firstName: 'TotallyNot',
      lastName: 'ASpy'
    }
  ])

  const users = await User.findAll()

  await Provider.bulkCreate([
    {userId: users[0].id, isActive: true},
    {userId: users[1].id, isActive: true},
    {userId: users[2].id},
    {userId: users[3].id, isActive: true},
    {userId: users[4].id, isActive: true},
    {userId: users[5].id, isActive: true},
    {userId: users[6].id, isActive: true},
    {userId: users[7].id}
  ])

  const providers = await Provider.findAll()

  await Service.bulkCreate([
    // Cody
    {
      providerId: providers[0].id,
      skillId: skills[2].id
    },
    {
      providerId: providers[0].id,
      skillId: skills[4].id,
      rate1: 14.99,
      rate1Mode: 'hourly'
    },
    {
      providerId: providers[0].id,
      skillId: skills[8].id,
      rate1: 99.99
    },

    // Murphy
    {
      providerId: providers[1].id,
      skillId: skills[0].id
    },
    {
      providerId: providers[1].id,
      skillId: skills[7].id
    },
    {
      providerId: providers[1].id,
      skillId: skills[9].id
    },

    // deadmau5
    {
      providerId: providers[2].id,
      skillId: skills[5].id,
      rate1: 100000.0,
      rate1Mode: 'flat',
      rate2: 50000.0,
      rate2Mode: 'daily'
    },
    {
      providerId: providers[2].id,
      skillId: skills[6].id,
      rate1: 100000.0,
      rate1Mode: 'flat',
      rate2: 50000.0,
      rate2Mode: 'daily'
    },

    // Major Lazer
    {
      providerId: providers[3].id,
      skillId: skills[5].id,
      rate1: 80000.0,
      rate2: 20000.0,
      rate2Mode: 'deposit'
    },
    {
      providerId: providers[3].id,
      skillId: skills[6].id,
      rate1: 80000.0,
      rate2: 20000.0,
      rate2Mode: 'deposit'
    },
    {
      providerId: providers[3].id,
      skillId: skills[8].id,
      rate1: 10000.0
    },

    // Gene Farris
    {
      providerId: providers[4].id,
      skillId: skills[5].id,
      rate1: 500.0
    },

    // Giada
    {
      providerId: providers[5].id,
      skillId: skills[1].id,
      rate1: 1000.0
    },
    {
      providerId: providers[5].id,
      skillId: skills[2].id,
      rate1: 1000.0
    },
    {
      providerId: providers[5].id,
      skillId: skills[4].id,
      rate1: 1000.0
    },

    // Tyler
    {
      providerId: providers[6].id,
      skillId: skills[0].id,
      rate1: 750.0
    },
    {
      providerId: providers[6].id,
      skillId: skills[1].id,
      rate1: 200.0,
      rate1Mode: 'hourly'
    },

    // Amouranth
    {
      providerId: providers[7].id,
      skillId: skills[3].id,
      rate1: 50.0,
      rate1Mode: 'hourly',
      rate2Mode: 'tipped'
    }
  ])

  const services = await Service.findAll()

  await Event.bulkCreate([
    {userId: users[0].id, location: 'Chicago, IL', public: true},
    {userId: users[0].id, location: 'Chicago, IL', public: true},
    {userId: users[0].id, location: 'Chicago, IL', public: true},
    {userId: users[0].id, location: 'Mundelein, IL', public: true},
    {userId: users[0].id, location: 'Lake Forest, IL'},
    {userId: users[2].id, location: 'Las Vegas, NV', public: true},
    {userId: users[3].id, location: 'Miami, FL'},
    {userId: users[5].id, location: 'Los Angeles, CA', public: true},
    {userId: users[5].id, location: 'Boston, MA'},
    {userId: users[7].id, location: 'Houston, TX'},
    {userId: users[7].id, location: 'Houston, TX'},
    {userId: users[8].id, location: 'Chicago, IL'},
    {userId: users[9].id, location: 'Gary, IN', public: true},
    {userId: users[9].id, location: 'Gary, IN', public: true},
    {userId: users[9].id, location: 'Gary, IN', public: true}
  ])

  const events = await Event.findAll()

  await Promise.all([
    events[0].setEventType(eventTypes[1].id),
    events[1].setEventType(eventTypes[2].id),
    events[2].setEventType(eventTypes[3].id),
    events[3].setEventType(eventTypes[1].id),
    events[4].setEventType(eventTypes[0].id),
    events[5].setEventType(eventTypes[1].id),
    events[6].setEventType(eventTypes[0].id),
    events[7].setEventType(eventTypes[2].id),
    events[8].setEventType(eventTypes[2].id),
    events[9].setEventType(eventTypes[1].id),
    events[10].setEventType(eventTypes[0].id),
    events[11].setEventType(eventTypes[1].id),
    events[12].setEventType(eventTypes[2].id),
    events[13].setEventType(eventTypes[2].id),
    events[14].setEventType(eventTypes[2].id)
  ])

  await Listing.bulkCreate([
    {eventId: events[0].id, skillId: skills[0].id, positionsAvailable: 3},
    {eventId: events[0].id, skillId: skills[2].id},
    {eventId: events[0].id, skillId: skills[9].id, positionsAvailable: 3},
    {eventId: events[1].id, skillId: skills[0].id, positionsAvailable: 3},
    {eventId: events[2].id, skillId: skills[7].id},
    {eventId: events[3].id, skillId: skills[5].id},
    {eventId: events[3].id, skillId: skills[6].id},
    {eventId: events[5].id, skillId: skills[0].id, positionsAvailable: 5},
    {eventId: events[5].id, skillId: skills[3].id, positionsAvailable: 5},
    {eventId: events[5].id, skillId: skills[5].id, positionsAvailable: 5},
    {eventId: events[5].id, skillId: skills[6].id, positionsAvailable: 5},
    {eventId: events[5].id, skillId: skills[8].id, positionsAvailable: 5},
    {eventId: events[6].id, skillId: skills[3].id, positionsAvailable: 3},
    {eventId: events[6].id, skillId: skills[6].id, positionsAvailable: 3},
    {eventId: events[7].id, skillId: skills[1].id},
    {eventId: events[7].id, skillId: skills[9].id, positionsAvailable: 3},
    {eventId: events[8].id, skillId: skills[9].id},
    {eventId: events[9].id, skillId: skills[4].id},
    {eventId: events[11].id, skillId: skills[3].id},
    {eventId: events[11].id, skillId: skills[4].id},
    {eventId: events[12].id, skillId: skills[3].id, positionsAvailable: 5},
    {eventId: events[12].id, skillId: skills[5].id},
    {eventId: events[13].id, skillId: skills[0].id}
  ])

  const listings = await Listing.findAll()

  await Quote.bulkCreate([
    {
      listingId: listings[0].id,
      providerId: providers[1].id,
      serviceId: services[3].id
    }
  ])

  console.log('db synced!')

  // console.log(`seeded ${users.length} users`)
  // console.log(`seeded ${skills.length} skills`)
  // console.log(`seeded ${events.length} events`)
  // console.log(`seeded ${eventTypes.length} eventTypes`)
  // console.log(`seeded successfully`)
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
