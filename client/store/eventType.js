import axios from 'axios'

const GET_ALL_EVENT_TYPES = 'GET_ALL_EVENT_TYPES'

const getAllEventTypes = eventType => ({type: GET_ALL_EVENT_TYPES, eventType})

export const fetchAllEventTypes = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/eventTypes')
    dispatch(getAllEventTypes(data))
  } catch (e) {
    console.log(e)
  }
}

export default function skillsReducer(state = [], action) {
  switch (action.type) {
    case GET_ALL_EVENT_TYPES:
      return action.eventType
    default:
      return state
  }
}
