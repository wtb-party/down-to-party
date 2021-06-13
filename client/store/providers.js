import axios from 'axios'
import queryString from 'query-string'

const SET_PROVIDERS = 'SET_PROVIDERS'
const SET_PROVIDER = 'SET_PROVIDER'
const ADD_PROVIDER = 'ADD_PROVIDER'

const setProviders = fetchedProviders => ({
  type: SET_PROVIDERS,
  fetchedProviders
})

const setProvider = provider => ({
  type: SET_PROVIDER,
  provider
})

const addProvider = provider => ({
  type: ADD_PROVIDER,
  provider
})

export const fetchProviders = filterOptions => async dispatch => {
  const params = queryString.parse(filterOptions)
  try {
    const {data} = await axios.get('/api/providers', {params})
    dispatch(setProviders(data))
  } catch (err) {
    console.log(err)
  }
}

export const fetchProvider = providerId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/providers/${providerId}`)
    dispatch(setProvider(data))
  } catch (err) {
    console.log(err)
  }
}

export const createProvider = userId => async dispatch => {
  const {data} = await axios.post('/api/providers/new-stripe-provider', {
    userId
  })
  dispatch(addProvider(data))
}

export const updateProvider = (edits, providerId) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/providers/${providerId}`, edits)
    dispatch(setProvider(data))
  } catch (err) {
    console.error(err)
  }
}

export default function providers(state = [], action) {
  switch (action.type) {
    case SET_PROVIDERS:
      return action.fetchedProviders
    case SET_PROVIDER:
      return action.provider
    case ADD_PROVIDER:
      return [...state, action.provider]
    default:
      return state
  }
}
