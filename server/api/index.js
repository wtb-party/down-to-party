const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/providers', require('./providers'))
router.use('/skills', require('./skills'))
router.use('/events', require('./events'))
router.use('/listings', require('./listings'))
router.use('/eventTypes', require('./eventTypes'))
router.use('/services', require('./services'))
router.use('/quotes', require('./quotes'))
router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
