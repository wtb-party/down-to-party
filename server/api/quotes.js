const router = require('express').Router()
const {
  Quote,
  Listing,
  Event,
  Service,
  Provider,
  Skill,
  User,
  EventType
} = require('../db/models')
module.exports = router

router.post('/new', async (req, res, next) => {
  try {
    const newQuote = await Quote.create(req.body)
    newQuote ? res.status(201).json(newQuote) : res.status(500)
  } catch (err) {
    next(err)
  }
})

router.get('/eventQuotes', async (req, res, next) => {
  const id = req.query.id
  try {
    const quotes = await Quote.findAll({
      where: {'$listing.event.id$': id},
      include: [
        {
          model: Listing,
          include: [{model: Event}]
        },
        {
          model: Provider,
          include: [{model: User, as: 'profile'}]
        },
        {
          model: Service,
          include: [{model: Skill, as: 'type'}]
        }
      ]
    })
    quotes ? res.status(200).json(quotes) : res.status(500)
  } catch (err) {
    next(err)
  }
})

router.get('/providerQuotes', async (req, res, next) => {
  const id = req.query.id
  try {
    const quotes = await Quote.findAll({
      where: {providerId: id},
      include: [
        {
          model: Listing,
          include: [
            {
              model: Event,
              include: [
                {
                  model: EventType
                },
                {
                  model: User,
                  as: 'Host'
                }
              ]
            }
          ]
        },
        {model: Service, include: [{model: Skill, as: 'type'}]}
      ]
    })
    quotes ? res.status(201).json(quotes) : res.status(500)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const quote = await Quote.findByPk(req.params.id)
    if (quote) {
      await quote.update(req.body)
    }
    quote ? res.status(201).json(quote) : res.status(500)
  } catch (err) {
    next(err)
  }
})
