import axios from 'axios'

const GET_ALL_SKILLS = 'GET_ALL_SKILLS'

const getAllSkills = skills => ({type: GET_ALL_SKILLS, skills})

export const fetchAllSkills = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/skills')
    dispatch(getAllSkills(data))
  } catch (e) {
    console.log(e)
  }
}

export default function skillsReducer(state = [], action) {
  switch (action.type) {
    case GET_ALL_SKILLS:
      return action.skills
    default:
      return state
  }
}
