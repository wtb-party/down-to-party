import axios from 'axios'

const GET_EVENT = 'GET_EVENT'

const getEvent = event => ({type: GET_EVENT, event})

export const fetchSingleEvent = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/events/${id}`)
    dispatch(getEvent(data))
  } catch (e) {
    console.error(e)
  }
}

export default (state = {}, action) => {
  switch (action.type) {
    case GET_EVENT:
      return action.event
    default:
      return state
  }
}
