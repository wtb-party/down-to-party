const passport = require('passport')
const router = require('express').Router()
const Auth0Strategy = require('passport-auth0')
const {User} = require('../db/models')
const querystring = require('querystring')
require('dotenv').config()

module.exports = router

if (!process.env.AUTH0_CLIENT_ID || !process.env.AUTH0_CLIENT_SECRET) {
  console.log('Auth0 client ID / secret not found. Skipping Auth0 OAuth.')
} else {
  const auth0Config = {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL: process.env.AUTH0_CALLBACK_URL
  }
  const strategy = new Auth0Strategy(auth0Config, function(
    accessToken,
    refreshToken,
    extraParams,
    profile,
    done
  ) {
    const auth0Id = profile.id
    const email = profile.emails[0].value
    const photoURL = profile.picture
    const firstName = profile.name.givenName
    const lastName = profile.name.familyName
    User.findOrCreate({
      where: {auth0Id},
      defaults: {email, photoURL, firstName, lastName}
    }).then(([user]) => done(null, user))
  })
  passport.use(strategy)

  router.get(
    '/',
    passport.authenticate('auth0', {
      scope: 'openid email profile'
    }),
    (req, res) => {
      res.redirect('/')
    }
  )

  router.get('/callback', (req, res, next) => {
    passport.authenticate('auth0', (err, user, info) => {
      if (err) {
        return next(err)
      }
      if (!user) {
        return res.redirect('/login')
      }
      req.logIn(user, err => {
        if (err) {
          return next(err)
        }
        const returnTo = req.session.returnTo
        delete req.session.returnTo
        res.redirect(returnTo || '/')
      })
    })(req, res, next)
  })

  router.get('/logout', (req, res) => {
    req.logOut()
    let returnTo = req.protocol + '://' + req.hostname
    const port = req.socket.localPort

    if (port !== undefined && port !== 80 && port !== 443) {
      returnTo =
        process.env.NODE_ENV === 'production'
          ? `${returnTo}/`
          : `${returnTo}:${port}/`
    }

    const logoutURL = new URL(`https://${process.env.AUTH0_DOMAIN}/v2/logout`)

    const searchString = querystring.stringify({
      client_id: process.env.AUTH0_CLIENT_ID,
      returnTo: returnTo
    })
    logoutURL.search = searchString

    res.redirect(logoutURL)
  })
}
