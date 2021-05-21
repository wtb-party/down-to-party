const router = require('express').Router()
const {Event, Skill, User, EventType} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const events = await Event.findAll({
      where: {public: false},
      include: [
        {model: EventType},
        {model: Skill, as: 'services'},
        {model: User, as: 'workers'}
      ]
    })
    res.json(events)
  } catch (err) {
    next(err)
  }
})

router.get('/working/:userId', async (req, res, next) => {
  try {
    const events = await Event.findAll({
      include: [
        {
          model: User,
          as: 'workers',
          where: {id: req.params.userId}
        },
        {model: EventType}
      ]
    })
    res.json(events)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const event = await Event.findOne({
      where: {id: req.params.id},
      include: [
        {model: EventType},
        {model: Skill, as: 'services'},
        {model: User, as: 'workers'}
      ]
    })
    res.json(event)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {location, eventType, service, userId} = req.body
    const type = await EventType.findOne({where: {name: eventType}})
    const skill = await Skill.findOne({where: {title: service}})
    const newEvent = await Event.create({location})

    if (newEvent) {
      await newEvent.setHost(userId)
      await newEvent.setEventType(type)
      await newEvent.addService(skill)
      res.status(201).json(newEvent)
    }
  } catch (err) {
    console.error(err)
  }
})
