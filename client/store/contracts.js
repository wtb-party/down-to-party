import axios from 'axios'

const SET_CONTRACTS = 'SET_CONTRACTS'
const ADD_CONTRACT = 'ADD_CONTRACT'
const REMOVE_CONTRACT = 'REMOVE_CONTRACT'

const setContracts = contracts => ({
  type: SET_CONTRACTS,
  contracts
})

const addContract = newContract => ({
  type: ADD_CONTRACT,
  newContract
})

const removeContract = params => ({
  type: REMOVE_CONTRACT,
  params
})

export const fetchContracts = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/contracts')
    dispatch(setContracts(data))
  } catch (err) {
    console.error(err)
  }
}

export const createContract = newContract => async dispatch => {
  try {
    const {data} = await axios.post('/api/contracts', newContract)
    dispatch(addContract(data))
  } catch (err) {
    console.error(err)
  }
}

export const deleteContract = params => async dispatch => {
  try {
    await axios.delete('/api/contracts', params)
    dispatch(removeContract(params))
  } catch (err) {
    console.error(err)
  }
}

export default (state = [], action) => {
  switch (action.type) {
    case SET_CONTRACTS:
      return action.contracts
    case ADD_CONTRACT:
      return [...state, action.newContract]
    case REMOVE_CONTRACT:
      return state.filter(
        contract =>
          contract.eventId !== action.params.eventId &&
          contract.quoteId !== action.params.quoteId &&
          contract.providerId !== action.params.providerId
      )
    default:
      return state
  }
}
