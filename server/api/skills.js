const router = require('express').Router()
const {Skill, Event} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const skills = await Skill.findAll({
      include: {model: Event, as: 'providers'}
    })
    res.json(skills)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const skill = await Skill.findOne({
      where: {id: req.params.id},
      include: {model: Event, as: 'providers'}
    })
    res.json(skill)
  } catch (err) {
    next(err)
  }
})
