import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import skills from './skill'
import event from './event'
import eventType from './eventType'
import singleEvent from './single-event'
import users from './users'

const reducer = combineReducers({
  user,
  users,
  skills,
  event,
  eventType,
  singleEvent
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
