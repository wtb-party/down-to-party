const router = require('express').Router()
const {User, Skill} = require('../db/models')
module.exports = router

router.put('/:id/profile', async (req, res, next) => {
  try {
    delete req.body.userId
    const user = await User.findByPk(req.params.id)
    if (user) {
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
      include: {model: Skill}
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})
