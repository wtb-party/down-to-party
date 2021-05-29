import axios from 'axios'

const SET_EVENTS = 'SET_EVENTS'
const ADD_EVENT = 'ADD_EVENT'
const REMOVE_EVENT = 'REMOVE_EVENT'

const setEvents = events => ({
  type: SET_EVENTS,
  events
})

const addEvent = event => ({
  type: ADD_EVENT,
  event
})

const removeEvent = id => ({
  type: REMOVE_EVENT,
  id
})

export const fetchEvents = () => async dispatch => {
  const {data} = await axios.get('/api/events')
  dispatch(setEvents(data))
}

export const fetchWorkerEvents = userId => async dispatch => {
  const {data} = await axios.get(`/api/events/working/${userId}`)
  dispatch(setEvents(data))
}

export const createEvent = (event, history) => async dispatch => {
  const {data} = await axios.post('/api/events', event)
  dispatch(addEvent(data))
  history.push(`/events/${data.id}`)
}

export const destroyEvent = (id, history) => async dispatch => {
  await axios.delete(`/api/events/${id}`)
  dispatch(removeEvent(id))
  history.push('/home')
}

export default (state = [], action) => {
  switch (action.type) {
    case SET_EVENTS:
      return action.events
    case ADD_EVENT:
      return [...state, action.event]
    case REMOVE_EVENT:
      return state.filter(({id}) => id !== action.id)
    default:
      return state
  }
}
