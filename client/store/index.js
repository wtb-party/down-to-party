import {configureStore} from '@reduxjs/toolkit'
import {createLogger} from 'redux-logger'
import contracts from './contracts'
import events from './events'
import eventTypes from './eventTypes'
import listings from './listings'
import providers from './providers'
import quotes from './quotes'
import services from './services'
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
    events,
    eventTypes,
    listings,
    services,
    quotes,
    contracts
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(createLogger({collapsed: true}))
})
