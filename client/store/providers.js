import axios from 'axios'

const SET_PROVIDERS = 'SET_PROVIDERS'

const setProviders = fetchedProviders => ({
  type: SET_PROVIDERS,
  fetchedProviders
})

export const fetchProviders = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/providers')
    dispatch(setProviders(data))
  } catch (err) {
    console.log(err)
  }
}

export default function providers(state = [], action) {
  switch (action.type) {
    case SET_PROVIDERS:
      return action.fetchedProviders
    default:
      return state
  }
}
