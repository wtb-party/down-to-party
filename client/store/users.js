import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import status from './statusUtils'

const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const {data} = await axios.get('/api/users')
  return data
})

const usersSlice = createSlice({
  name: 'users',
  initialState: {users: [], status: 'idle', error: null},
  reducers: {},
  extraReducers: {
    [fetchUsers.pending]: state => {
      state.status = status.loading
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.status = status.succeeded
      state.users = action.payload
    },
    [fetchUsers.rejected]: (state, action) => {
      state.status = status.failed
      state.error = action.error.message
    }
  }
})

export default usersSlice.reducer
