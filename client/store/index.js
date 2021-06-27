import {configureStore} from '@reduxjs/toolkit'
import {createLogger} from 'redux-logger'
import contracts from './contracts'
import event from './event'
import eventTypes from './eventTypes'
import listings from './listings'
import providers from './providers'
import quotes from './quotes'
import services from './services'
import singleEvent from './single-event'
import skills from './skill'
import user from './user'
import users from './users'

export * from './user'
export default configureStore({
  reducer: {
    user,
    users,
    providers,
    skills,
    event,
    eventTypes,
    singleEvent,
    listings,
    services,
    quotes,
    contracts
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(createLogger({collapsed: true}))
})
