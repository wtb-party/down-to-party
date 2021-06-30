import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import status from './statusUtils'

export const fetchContracts = createAsyncThunk(
  'contracts/fetchContracts',
  async () => {
    const {data} = await axios.get('/api/contracts')
    return data
  }
)

export const createContract = createAsyncThunk(
  'contracts/createContract',
  async contract => {
    const {data} = await axios.post('/api/contracts', contract)
    return data
  }
)

export const destroyContract = createAsyncThunk(
  'contracts/destroyContract',
  async params => {
    await axios.delete('/api/contracts', params)
    return params
  }
)

const contractsSlice = createSlice({
  name: 'contracts',
  initialState: {contracts: [], status: 'idle', error: null},
  reducers: {},
  extraReducers: {
    [fetchContracts.pending]: state => {
      state.status = status.loading
    },
    [fetchContracts.fulfilled]: (state, action) => {
      state.status = status.succeeded
      state.listings = action.payload
    },
    [fetchContracts.rejected]: (state, action) => {
      state.status = status.failed
      state.error = action.error.message
    },
    [createContract.pending]: state => {
      state.status = status.loading
    },
    [createContract.fulfilled]: (state, action) => {
      state.status = status.succeeded
      state.contracts.push(action.payload)
    },
    [createContract.rejected]: (state, action) => {
      state.status = status.failed
      state.error = action.error.message
    },
    [destroyContract.pending]: state => {
      state.status = status.loading
    },
    [destroyContract.fulfilled]: (state, action) => {
      const {eventId, quoteId, providerId} = action.payload
      state.status = status.succeeded
      state.contracts.filter(
        contract =>
          contract.eventId !== eventId &&
          contract.quoteId !== quoteId &&
          contract.providerId !== providerId
      )
    },
    [destroyContract.rejected]: (state, action) => {
      state.status = status.failed
      state.error = action.error.message
    }
  }
})

export default contractsSlice.reducer
