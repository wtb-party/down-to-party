import axios from 'axios'

const SET_USERS = 'SET_USERS'

const setUsers = users => ({
  type: SET_USERS,
  users
})

export const fetchUsers = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/users')
    dispatch(setUsers(data))
  } catch (err) {
    console.error(err)
  }
}

export default (state = [], action) => {
  switch (action.type) {
    case SET_USERS:
      return action.users
    default:
      return state
  }
}
