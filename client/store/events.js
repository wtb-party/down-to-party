import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import status from './statusUtils'

export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
  const {data} = await axios.get('/api/events')
  return data
})

export const fetchEvent = createAsyncThunk('events/fetchEvent', async id => {
  const {data} = await axios.get(`/api/events/${id}`)
  return data
})

export const createEvent = createAsyncThunk(
  'events/createEvent',
  async eventObj => {
    const {event, history} = eventObj
    const {data} = await axios.post('/api/events', event)
    history.push(`/events/${data.id}`)
    return data
  }
)

export const destroyEvent = createAsyncThunk(
  'events/destroyEvent',
  async idObj => {
    const {id, history} = idObj
    history.push('/home')
    const {data} = await axios.delete(`/api/events/${id}`)
    return data
  }
)

const initialState = {
  events: [],
  event: {},
  status: 'idle',
  singleStatus: 'idle',
  error: null
}

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchEvent.pending]: state => {
      state.singleStatus = status.loading
    },
    [fetchEvent.fulfilled]: (state, action) => {
      state.singleStatus = status.succeeded
      state.event = action.payload
    },
    [fetchEvent.rejected]: (state, action) => {
      state.singleStatus = status.failed
      state.error = action.error.message
    },
    [fetchEvents.pending]: state => {
      state.status = status.loading
    },
    [fetchEvents.fulfilled]: (state, action) => {
      state.status = status.succeeded
      state.events = action.payload
    },
    [fetchEvents.rejected]: (state, action) => {
      state.status = status.failed
      state.error = action.error.message
    },
    [createEvent.pending]: state => {
      state.status = status.loading
    },
    [createEvent.fulfilled]: (state, action) => {
      state.status = status.succeeded
      state.events.push(action.payload)
    },
    [createEvent.rejected]: (state, action) => {
      state.status = status.failed
      state.error = action.error.message
    },
    [destroyEvent.pending]: state => {
      state.status = status.loading
    },
    [destroyEvent.fulfilled]: (state, action) => {
      state.status = status.succeeded
      state.events.filter(({id}) => id !== action.id)
    },
    [destroyEvent.rejected]: (state, action) => {
      state.status = status.failed
      state.error = action.error.message
    }
  }
})

export default eventsSlice.reducer
