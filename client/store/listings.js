import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import status from './statusUtils'

export const fetchListing = createAsyncThunk(
  'listing/fetchListing',
  async listingId => {
    const {data} = await axios.get(`/api/listings/${listingId}`)
    return data
  }
)

export const fetchListings = createAsyncThunk(
  'listings/fetchListings',
  async () => {
    const {data} = await axios.get(`/api/listings`)
    return data
  }
)

const initialState = {
  listings: [],
  listing: {},
  status: 'idle',
  singleStatus: 'idle',
  error: null
}

const listingsSlice = createSlice({
  name: 'listings',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchListings.pending]: state => {
      state.status = status.loading
    },
    [fetchListings.fulfilled]: (state, action) => {
      state.status = status.succeeded
      state.listings = state.listings.concat(action.payload)
    },
    [fetchListings.rejected]: (state, action) => {
      state.status = status.failed
      state.error = action.error.message
    },
    [fetchListing.pending]: state => {
      state.singleStatus = status.loading
    },
    [fetchListing.fulfilled]: (state, action) => {
      state.singleStatus = status.succeeded
      state.listing = action.payload
    },
    [fetchListing.rejected]: (state, action) => {
      state.singleStatus = status.failed
      state.error = action.error.message
    }
  }
})

export default listingsSlice.reducer
