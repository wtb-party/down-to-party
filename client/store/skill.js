import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import status from './statusUtils'

export const fetchSkills = createAsyncThunk('skills/fetchSkills', async () => {
  const {data} = await axios.get('/api/skills')
  return data
})

const skillsSlice = createSlice({
  name: 'skills',
  initialState: {skills: [], status: 'idle', error: null},
  reducers: {},
  extraReducers: {
    [fetchSkills.pending]: state => {
      state.status = status.loading
    },
    [fetchSkills.fulfilled]: (state, action) => {
      state.status = status.succeeded
      state.skills = action.payload
    },
    [fetchSkills.rejected]: (state, action) => {
      state.status = status.failed
      state.error = action.error.message
    }
  }
})

export default skillsSlice.reducer
