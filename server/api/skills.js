const router = require('express').Router()
const {Skill, Event, Listing} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const skills = await Skill.findAll({
      include: {
        model: Listing,
        attributes: ['id', 'positionsAvailable']
      }
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
      include: {model: Event}
    })
    res.json(skill)
  } catch (err) {
    next(err)
  }
})
