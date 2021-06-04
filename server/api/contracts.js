const router = require('express').Router()
const {Op} = require('sequelize')
const {Contract} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const newContract = await Contract.create(req.body)
    newContract ? res.status(201).json(newContract) : res.status(500)
  } catch (err) {
    next(err)
  }
})

router.delete('/', async (req, res, next) => {
  try {
    const contract = await Contract.findOne({
      [Op.and]: [
        {eventId: req.body.eventId},
        {quoteId: req.body.quoteId},
        {providerId: req.body.providerId}
      ]
    })
    if (contract) {
      await contract.destroy()
      res.status(201).send('deleted contract')
    } else {
      res.sendStatus(500)
    }
  } catch (err) {
    next(err)
  }
})
