const router = require('express').Router()
require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
module.exports = router

router.post('/', async (req, res) => {
  let {amount, id} = req.body
  console.log('stripe-routes.js 10 | amount and id', amount, id)
  try {
    /* const payment =  */ await stripe.paymentIntents.create({
      amount: amount,
      currency: 'USD',
      description: 'Your Company Description',
      payment_method: id,
      confirm: true
    })
    // console.log('stripe-routes.js 19 | payment', payment)
    res.json({
      message: 'Payment Successful',
      success: true
    })
  } catch (error) {
    console.log('stripe-routes.js 17 | error', error)
    res.json({
      error,
      message: 'Payment Failed',
      success: false
    })
  }
})
