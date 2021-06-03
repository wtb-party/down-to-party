const router = require('express').Router()
const {Op} = require('sequelize')
const {Provider, User, Skill, Service} = require('../db/models')
module.exports = router

router.post('/new', async (req, res, next) => {
  try {
    const {userId} = req.body
    const provider = await Provider.create({
      userId,
      isActive: true
    })
    provider ? res.status(201).json(provider) : res.sendStatus(500)
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  const searchBySkill = req.query.skill && {id: req.query.skill}
  const searchByLocation = req.query.location && {
    location: {[Op.iLike]: `%${req.query.location}%`}
  }

  try {
    const providers = await Provider.findAll({
      where: {
        isActive: true
      },
      attributes: ['id'],
      include: [
        {
          model: User,
          as: 'profile',
          where: searchByLocation,
          attributes: ['id', 'location', 'firstName', 'lastName', 'photoURL']
        },
        {
          model: Service,
          attributes: ['id'],
          required: true,
          include: {
            model: Skill,
            as: 'type',
            where: searchBySkill
          }
        }
      ]
    })
    res.status(200).json(providers)
  } catch (err) {
    next(err)
  }
})

router.get('/:providerId', async (req, res, next) => {
  try {
    const provider = await Provider.findOne({
      where: {
        id: req.params.providerId,
        isActive: true
      },
      attributes: ['id'],
      include: [
        {
          model: User,
          as: 'profile',
          attributes: [
            'id',
            'email',
            'location',
            'firstName',
            'lastName',
            'photoURL'
          ]
        },
        {
          model: Service,
          attributes: ['id', 'rate1', 'rate1Mode', 'rate2', 'rate2Mode'],
          include: {
            model: Skill,
            as: 'type'
          }
        }
      ]
    })
    if (provider) {
      res.status(200).json(provider)
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})
