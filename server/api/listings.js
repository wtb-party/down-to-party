const router = require('express').Router()
const {Op} = require('sequelize')
const {Listing, Event, Skill} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const listings = await Listing.findAll({
      where: {
        positionsAvailable: {[Op.gt]: 0}
      },
      attributes: ['id', 'positionsAvailable'],
      include: [
        {
          model: Skill,
          as: 'role'
        },
        {
          model: Event,
          where: {public: true},
          attributes: ['id', 'location', 'date', 'eventTypeId']
        }
      ]
    })
    res.status(200).json(listings)
  } catch (err) {
    next(err)
  }
})
