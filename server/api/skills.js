const router = require('express').Router()
const {Skill} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const skills = await Skill.findAll()
    res.json(skills)
  } catch (err) {
    next(err)
  }
})
