const router = require('express').Router()
const {Op} = require('sequelize')
const {Provider, User, Skill, Service} = require('../db/models')
require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
module.exports = router

router.post('/new-stripe-provider', async (req, res, next) => {
  try {
    const account = await stripe.accounts.create({
      country: 'US',
      type: 'express',
      capabilities: {
        card_payments: {
          requested: true
        },
        transfers: {
          requested: true
        }
      }
    })

    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      success_url: 'http://localhost:8080/',
      failure_url: 'http://localhost:8080?failure',
      type: 'account_onboarding'
    })

    const {userId} = req.body
    await Provider.create({
      userId,
      isActive: true,
      stripeId: account.id
    })

    accountLink.url ? res.json({url: accountLink.url}) : res.sendStatus(500)
  } catch (err) {
    console.error(err)
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

router.put('/:providerId', async (req, res, next) => {
  try {
    const provider = await Provider.findByPk(req.params.providerId)
    if (provider) {
      req.body.forEach(async edit => {
        await provider.addService(edit)
      })
      res.status(201).json(provider)
    } else {
      res.status(500)
    }
  } catch (err) {
    next(err)
  }
})
