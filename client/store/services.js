import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import status from './statusUtils'

export const fetchServices = createAsyncThunk(
  'services/fetchServices',
  async (eventListings = []) => {
    const queryString = eventListings.join('&')
    const {data} = eventListings.length
      ? await axios.get(`/api/services/?${queryString}`)
      : await axios.get('/api/services')
    return data
  }
)

const servicesSlice = createSlice({
  name: 'services',
  initialState: {services: [], status: 'idle', error: null},
  reducers: {},
  extraReducers: {
    [fetchServices.pending]: state => {
      state.status = status.succeeded
    },
    [fetchServices.fulfilled]: (state, action) => {
      state.status = status.succeeded
      state.services = action.payload
    },
    [fetchServices.rejected]: (state, action) => {
      state.status = status.failed
      state.error = action.error.message
    }
  }
})

export default servicesSlice.reducer
