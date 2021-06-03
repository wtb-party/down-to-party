import axios from 'axios'

const SET_QUOTES = 'SET_QUOTES'
const ADD_QUOTE = 'ADD_QUOTE'
const UPDATE_QUOTE_STATUS = 'UPDATE_QUOTE_STATUS'

const setQuotes = quotes => ({
  type: SET_QUOTES,
  quotes
})

const addQuote = quote => ({
  type: ADD_QUOTE,
  quote
})

const updateQuote = quote => ({
  type: UPDATE_QUOTE_STATUS,
  quote
})

export const fetchEventQuotes = eventId => async dispatch => {
  const {data} = await axios.get(`/api/quotes/eventQuotes/?id=${eventId}`)
  dispatch(setQuotes(data))
}

export const fetchProviderQuotes = providerId => async dispatch => {
  const {data} = await axios.get(`/api/quotes/providerQuotes/?id=${providerId}`)
  dispatch(setQuotes(data))
}

export const updateQuoteStatus = (quoteId, status) => async dispatch => {
  const {data} = await axios.put(`/api/quotes/${quoteId}`, {status})
  dispatch(updateQuote(data))
}

export const requestQuote = quoteBody => async dispatch => {
  const {data} = await axios.post('/api/quotes/new', quoteBody)
  dispatch(addQuote(data))
}

export default (state = [], action) => {
  switch (action.type) {
    case SET_QUOTES:
      return action.quotes
    case ADD_QUOTE:
      return [...state, action.quote]
    case UPDATE_QUOTE_STATUS:
      return [
        ...state.map(quote => {
          if (quote.id === action.quote.id) {
            quote.status = action.quote.status
          }
          return quote
        })
      ]
    default:
      return state
  }
}
