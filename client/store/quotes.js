import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import status from './statusUtils'

export const fetchEventQuotes = createAsyncThunk(
  'quotes/fetchEventQuotes',
  async eventId => {
    const {data} = await axios.get(`/api/quotes/eventQuotes/?id=${eventId}`)
    return data
  }
)

export const fetchProviderQuotes = createAsyncThunk(
  'quotes/fetchProviderQuotes',
  async providerId => {
    const {data} = await axios.get(
      `/api/quotes/providerQuotes/?id=${providerId}`
    )
    return data
  }
)

export const updateQuoteStatus = createAsyncThunk(
  'quotes/updateQuoteStatus',
  async quoteObj => {
    const {quoteId, quoteStatus} = quoteObj
    const {data} = await axios.put(`/api/quotes/${quoteId}`, {
      status: quoteStatus
    })
    return data
  }
)

export const requestQuote = createAsyncThunk(
  'quotes/requestQuote',
  async quoteBody => {
    const {data} = await axios.post('/api/quotes/new', quoteBody)
    return data
  }
)

const quotesSlice = createSlice({
  name: 'quotes',
  initialState: {quotes: [], status: 'idle', error: null},
  reducers: {},
  extraReducers: {
    [fetchEventQuotes.pending]: state => {
      state.status = status.loading
    },
    [fetchEventQuotes.fulfilled]: (state, action) => {
      state.status = status.succeeded
      state.quotes = action.payload
    },
    [fetchEventQuotes.rejected]: (state, action) => {
      state.status = status.failed
      state.error = action.error.message
    },
    [fetchProviderQuotes.pending]: state => {
      state.status = status.loading
    },
    [fetchProviderQuotes.fulfilled]: (state, action) => {
      state.status = status.succeeded
      state.quotes = action.payload
    },
    [fetchProviderQuotes.rejected]: (state, action) => {
      state.status = status.failed
      state.error = action.error.message
    },
    [updateQuoteStatus.pending]: state => {
      state.status = status.loading
    },
    [updateQuoteStatus.fulfilled]: (state, action) => {
      state.status = status.succeeded
      state.quotes.map(quote => {
        if (quote.id === action.payload.id) {
          quote.status = action.payload.status
        }
        return quote
      })
    },
    [updateQuoteStatus.rejected]: (state, action) => {
      state.status = status.failed
      state.error = action.error.message
    },
    [requestQuote.pending]: state => {
      state.status = status.loading
    },
    [requestQuote.fulfilled]: (state, action) => {
      state.status = status.succeeded
      state.quotes.push(action.payload)
    },
    [requestQuote.rejected]: (state, action) => {
      state.status = status.failed
      state.error = action.error.message
    }
  }
})

export default quotesSlice.reducer
