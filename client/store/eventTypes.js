import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import status from './statusUtils'

export const fetchEventTypes = createAsyncThunk(
  'eventTypes/fetchEventTypes',
  async () => {
    const {data} = await axios.get('/api/eventTypes')
    return data
  }
)

const eventTypesSlice = createSlice({
  name: 'eventTypes',
  initialState: {eventTypes: [], status: 'idle', error: null},
  reducers: {},
  extraReducers: {
    [fetchEventTypes.pending]: state => {
      state.status = status.loading
    },
    [fetchEventTypes.fulfilled]: (state, action) => {
      state.status = status.succeeded
      state.eventTypes = action.payload
    },
    [fetchEventTypes.rejected]: (state, action) => {
      state.status = status.failed
      state.error = action.error.message
    }
  }
})

export default eventTypesSlice.reducer
