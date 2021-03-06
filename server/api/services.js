const router = require('express').Router()
const {Op} = require('sequelize')
const {Skill, User, Service, Provider} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const query = req.query
    if (query && Object.keys(query).length !== 0) {
      const services = await Service.findAll({
        include: [
          {
            model: Skill,
            as: 'type',
            where: {
              title: {
                [Op.in]: Array.isArray(query.title)
                  ? query.title
                  : [query.title]
              }
            }
          },
          {
            model: Provider,
            where: {isActive: true},
            include: [{model: User, as: 'profile'}]
          }
        ]
      })
      res.status(200).json(services)
    } else {
      const services = await Service.findAll({})
      res.status(200).json(services)
    }
  } catch (err) {
    next(err)
  }
})
