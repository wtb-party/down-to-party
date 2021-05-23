const router = require('express').Router()
const {User, Skill, Event, EventType} = require('../db/models')
module.exports = router

router.get('/:id/profile', async (req, res, next) => {
  try {
    const profile = await User.findByPk(req.params.id, {
      include: [{model: Skill}, {model: Event, include: {model: EventType}}]
    })
    res.status(200).json(profile)
  } catch (e) {
    next(e)
  }
})

router.put('/:id/profile', async (req, res, next) => {
  try {
    delete req.body.userId
    const user = await User.findByPk(req.params.id, {
      include: [{model: Event, include: {model: EventType}}]
    })
    if (user) {
      await user.setSkills(req.body.skillIds)
      const updatedUser = await user.update(req.body, {
        fields: Object.keys(req.body)
      })
      res.status(200).json(updatedUser)
    } else {
      res.status(500)
    }
  } catch (error) {
    next(error)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email'],
      include: [{model: Skill}, {model: Event}]
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})
