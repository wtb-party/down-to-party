import axios from 'axios'

const SET_EVENTS = 'SET_EVENTS'
const ADD_EVENT = 'ADD_EVENT'

const setEvents = events => ({
  type: SET_EVENTS,
  events
})

const addEvent = event => ({
  type: ADD_EVENT,
  event
})

export const fetchEvents = () => async dispatch => {
  const {data} = await axios.get('/api/events')
  dispatch(setEvents(data))
}

export const createEvent = (event, history) => async dispatch => {
  const {data} = await axios.post('/api/events', event)
  dispatch(addEvent(data))
  history.push(`/events/${data.id}/users/${event.userId}`)
}

export default (state = [], action) => {
  switch (action.type) {
    case SET_EVENTS:
      return action.events
    case ADD_EVENT:
      return [...state, action.event]
    default:
      return state
  }
}
