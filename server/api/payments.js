const router = require('express').Router()
require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
module.exports = router

router.post('/', async (req, res) => {
  let {amount, id, stripeId} = req.body
  try {
    await stripe.paymentIntents.create({
      amount: amount,
      currency: 'USD',
      description: 'Huddle, Inc',
      payment_method: id,
      confirm: true,
      application_fee_amount: amount / 100 * 30,
      transfer_data: {
        destination: stripeId
      }
    })

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
