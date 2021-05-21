import axios from 'axios'

const GET_ALL_SKILLS = 'GET_ALL_SKILLS'
const SET_SKILL = 'SET_SKILL'

const getAllSkills = skills => ({type: GET_ALL_SKILLS, skills})
const setSkill = skill => ({type: SET_SKILL, skill})

export const fetchAllSkills = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/skills')
    dispatch(getAllSkills(data))
  } catch (err) {
    console.log(err)
  }
}

export const fetchSkill = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/skills/${id}`)
    dispatch(setSkill(data))
  } catch (err) {
    console.log(err)
  }
}

export default function skillsReducer(state = [], action) {
  switch (action.type) {
    case GET_ALL_SKILLS:
      return action.skills
    case SET_SKILL:
      return action.skill
    default:
      return state
  }
}
