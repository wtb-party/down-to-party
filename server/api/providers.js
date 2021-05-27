const router = require('express').Router()
const {Provider, User, Skill, Service} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const providers = await Provider.findAll({
      where: {
        isActive: true
      },
      attributes: [],
      include: [
        {
          model: User,
          attributes: ['id', 'email', 'location', 'photoURL']
        },
        {
          model: Service,
          attributes: ['id'],
          include: {
            model: Skill
          }
        }
      ]
    })
    res.status(200).json(providers)
  } catch (err) {
    next(err)
  }
})
