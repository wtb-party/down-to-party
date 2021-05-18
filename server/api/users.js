const router = require('express').Router()
const {User, Skill, Event} = require('../db/models')
module.exports = router

router.get('/:id/profile', async (req, res, next) => {
  try {
    const profile = await User.findByPk(req.params.id, {
      include: {model: Skill}
    })
    res.status(200).json(profile)
  } catch (e) {
    next(e)
  }
})

router.put('/:id/profile', async (req, res, next) => {
  try {
    delete req.body.userId
    const user = await User.findByPk(req.params.id)
    if (user) {
      if (req.body.skillSelection > 0) {
        const {id} = await Skill.findOne({where: {id: req.body.skillSelection}})
        user.addSkill(id)
      }
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
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email'],
      include: [{model: Skill}, {model: Event}]
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})
