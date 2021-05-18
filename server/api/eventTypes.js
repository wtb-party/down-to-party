const router = require('express').Router()
const {EventType} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const eventTypes = await EventType.findAll()
    res.json(eventTypes)
  } catch (err) {
    next(err)
  }
})
