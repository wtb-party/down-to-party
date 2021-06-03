import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import skills from './skill'
import event from './event'
import eventType from './eventType'
import singleEvent from './single-event'
import listings from './listings'
import users from './users'
import providers from './providers'
import services from './services'
import quotes from './quotes'

const reducer = combineReducers({
  user,
  users,
  providers,
  skills,
  event,
  eventType,
  singleEvent,
  listings,
  services,
  quotes
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
