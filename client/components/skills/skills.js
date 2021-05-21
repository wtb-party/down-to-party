import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {fetchAllSkills} from '../../store/skill'
import {Link} from 'react-router-dom'

export default function Skills() {
  const dispatch = useDispatch()
  const allSkills = useSelector(state => state.skills)

  useEffect(() => {
    dispatch(fetchAllSkills())
  }, [])

  return (
    <>
      {allSkills && allSkills.length ? (
        allSkills.map(skill => (
          <div key={skill.id}>
            <Link to={`/skills/${skill.id}`}>{skill.title}</Link>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </>
  )
}
