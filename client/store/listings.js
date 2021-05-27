import axios from 'axios'

const SET_LISTINGS = 'SET_LISTINGS'

const setListings = fetchedListings => ({type: SET_LISTINGS, fetchedListings})

export const fetchListings = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/listings')
    dispatch(setListings(data))
  } catch (err) {
    console.log(err)
  }
}

export default function listings(state = [], action) {
  switch (action.type) {
    case SET_LISTINGS:
      return action.fetchedListings
    default:
      return state
  }
}
