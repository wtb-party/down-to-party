import axios from 'axios'
import queryString from 'query-string'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import status from './statusUtils'

export const fetchProviders = createAsyncThunk(
  'providers/fetchProviders',
  async filterOptions => {
    const params = queryString.parse(filterOptions)
    const {data} = await axios.get('/api/providers', {params})
    return data
  }
)

export const fetchProvider = createAsyncThunk(
  'providers/fetchProvider',
  async id => {
    const {data} = await axios.get(`/api/providers/${id}`)
    return data
  }
)

export const createProvider = createAsyncThunk(
  'providers/createProvider',
  async userId => {
    const {data} = await axios.post('/api/providers/new-stripe-provider', {
      userId
    })

    console.log('DATA', data)
    return data
  }
)

export const updateProvider = createAsyncThunk(
  'providers/updateProvider',
  async updateObj => {
    const {skillIds, providerId} = updateObj
    const {data} = await axios.put(`/api/providers/${providerId}`, skillIds)
    return data
  }
)

const initialState = {
  providers: [],
  provider: {},
  url: '',
  status: 'idle',
  singleStatus: 'idle',
  error: null
}

const providersSlice = createSlice({
  name: 'providers',
  initialState,
  extraReducers: {
    [fetchProviders.pending]: state => {
      state.status = status.loading
    },
    [fetchProviders.fulfilled]: (state, action) => {
      state.status = status.succeeded
      state.providers = action.payload
    },
    [fetchProviders.rejected]: (state, action) => {
      state.status = status.failed
      state.error = action.error.message
    },
    [fetchProvider.pending]: state => {
      state.singlStatus = status.loading
    },
    [fetchProvider.fulfilled]: (state, action) => {
      state.singleStatus = status.succeeded
      state.provider = action.payload
    },
    [fetchProvider.rejected]: (state, action) => {
      state.singleStatus = status.failed
      state.error = action.error.message
    },
    [createProvider.pending]: state => {
      state.status = status.loading
    },
    [createProvider.fulfilled]: (state, action) => {
      state.status = status.succeeded
      state.url = action.payload.url
    },
    [createProvider.rejected]: (state, action) => {
      state.status = status.failed
      state.error = action.error.message
    },
    [updateProvider.pending]: state => {
      state.singleStatus = status.loading
    },
    [updateProvider.fulfilled]: (state, action) => {
      state.singleStatus = status.succeeded
      state.provider = action.payload
    },
    [updateProvider.rejected]: (state, action) => {
      state.singleStatus = status.failed
      state.error = action.error.message
    }
  }
})

export default providersSlice.reducer
