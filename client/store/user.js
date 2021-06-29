import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import status from './statusUtils'

const initialState = {
  user: {},
  status: 'idle',
  error: null
}

export const fetchMe = createAsyncThunk('users/fetchMe', async () => {
  const {data} = await axios.get('/auth/me')
  return data || initialState
})

export const updateUser = createAsyncThunk('users/updateUser', async user => {
  const {data} = await axios.put(`/api/users/${user.id}/profile`, user)
  return data
})

export const logout = createAsyncThunk('users/logout', async () => {
  await axios.post('/auth/logout')
  return {}
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchMe.pending]: state => {
      state.status = status.loading
    },
    [fetchMe.fulfilled]: (state, action) => {
      state.status = status.succeeded
      state.user = action.payload
    },
    [fetchMe.rejected]: (state, action) => {
      state.status = status.failed
      state.error = action.error.message
    },
    [updateUser.pending]: state => {
      state.status = status.loading
    },
    [updateUser.fulfilled]: (state, action) => {
      state.status = status.succeeded
      state.user = action.payload
    },
    [updateUser.rejected]: (state, action) => {
      state.status = status.failed
      state.error = action.error.message
    },
    [logout.pending]: state => {
      state.status = status.loading
    },
    [logout.fulfilled]: (state, action) => {
      state.status = status.succeeded
      state.user = action.payload
    }
  }
})

export default userSlice.reducer
