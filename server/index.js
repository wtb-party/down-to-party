const path = require('path')
const express = require('express')
const morgan = require('morgan')
const compression = require('compression')
const expressSession = require('express-session')
const passport = require('passport')
const SequelizeStore = require('connect-session-sequelize')(
  expressSession.Store
)
const db = require('./db')
const sessionStore = new SequelizeStore({db})
const PORT = process.env.PORT || 8080
const app = express()
const socketio = require('socket.io')
require('dotenv').config()
module.exports = app

// This is a global Mocha hook, used for resource cleanup.
// Otherwise, Mocha v4+ never quits after tests.
if (process.env.NODE_ENV === 'test') {
  after('close the session store', () => sessionStore.stopExpiringSessions())
}

if (process.env.NODE_ENV !== 'production') require('../secrets')

// passport registration
passport.serializeUser((user, done) => done(null, user))

passport.deserializeUser(async (user, done) => {
  try {
    const u = await db.models.user.findOne({where: {auth0Id: user.auth0Id}})
    done(null, u)
  } catch (err) {
    done(err)
  }
})

const createApp = () => {
  // logging middleware
  app.use(morgan('dev'))

  // body parsing middleware
  app.use(express.json())
  app.use(express.urlencoded({extended: true}))

  // compression middleware
  app.use(compression())

  // session middleware with passport
  const session = {
    secret: process.env.SESSION_SECRET || 'my best friend is huddle shuttle',
    store: sessionStore,
    cookie: {},
    resave: false,
    saveUninitialized: false
  }
  app.use(expressSession(session))
  if (app.get('env') === 'production') {
    // Serve secure cookies, requires HTTPS
    app.set('trust proxy', 1)
    session.cookie.secure = true
  }
  app.use(passport.initialize())
  app.use(passport.session())

  // auth and api routes
  app.use('/auth', require('./auth'))
  app.use('/api', require('./api'))

  // static file-serving middleware
  app.use(express.static(path.join(__dirname, '..', 'public')))

  app.use((req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated()
    next()
  })

  // any remaining requests with an extension (.js, .css, etc.) send 404
  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found')
      err.status = 404
      next(err)
    } else {
      next()
    }
  })

  // sends index.html
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'))
  })

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })
}

const startListening = () => {
  // start listening (and create a 'server' object representing our server)
  const server = app.listen(PORT, () =>
    console.log(`Mixing it up on port ${PORT}`)
  )

  // set up our socket control center
  const io = socketio(server)
  require('./socket')(io)
}

const syncDb = () => db.sync()

async function bootApp() {
  try {
    await sessionStore.sync()
    await syncDb()
    await createApp()
    await startListening()
  } catch (err) {
    console.error(err)
  }
}
// This evaluates as true when this file is run directly from the command line,
// i.e. when we say 'node server/index.js' (or 'nodemon server/index.js', or 'nodemon server', etc)
// It will evaluate false when this module is required by another module - for example,
// if we wanted to require our app in a test spec
if (require.main === module) {
  bootApp()
} else {
  createApp()
}
