const router = require('express').Router()
const {
  Event,
  Skill,
  EventType,
  Contract,
  Provider,
  Service,
  Listing
} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const events = await Event.findAll({
      where: {public: false},
      include: [{model: EventType}, {model: Skill, as: 'roles'}]
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
        {model: Listing, include: [{model: Skill, as: 'role'}]},
        {
          model: Contract,
          include: [{model: Provider, include: [{model: Service}]}]
        }
      ]
    })
    res.json(event)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const event = await Event.findByPk(req.params.id)
    if (event) {
      await event.destroy()
      res.status(200).send('Successfully deleted Event')
    }
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
      await newEvent.addRole(skill)
      res.status(201).json(newEvent)
    }
  } catch (err) {
    console.error(err)
  }
})
