import axios from 'axios'

const SET_SERVICES = 'SET_SERVICES'

const setServices = services => ({
  type: SET_SERVICES,
  services
})

export const fetchServices = (eventListings = []) => async dispatch => {
  const queryString = eventListings.join('&')
  const {data} = eventListings.length
    ? await axios.get(`/api/services/?${queryString}`)
    : await axios.get('/api/services')
  dispatch(setServices(data))
}

export default (state = [], action) => {
  switch (action.type) {
    case SET_SERVICES:
      return action.services
    default:
      return state
  }
}
