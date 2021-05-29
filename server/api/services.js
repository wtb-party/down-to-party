const router = require('express').Router()
const {Op} = require('sequelize')
const {Skill, User, Service, Provider} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const query = req.query
    if (query) {
      const services = await Service.findAll({
        include: [
          {
            model: Skill,
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
            include: [{model: User}]
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
