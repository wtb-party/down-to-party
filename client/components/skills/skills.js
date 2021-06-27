import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {fetchSkills} from '../../store/skill'
import {Link} from 'react-router-dom'
import Card from 'react-bootstrap/Card'

export default function Skills() {
  const dispatch = useDispatch()
  const allSkills = useSelector(state => state.skills.skills)

  useEffect(() => {
    dispatch(fetchSkills())
  }, [])

  return (
    <>
      {allSkills && allSkills.length ? (
        allSkills.map(skill => (
          <Card key={skill.id}>
            <Card.Body>
              <Link to={`/skills/${skill.id}`}>{skill.title}</Link>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </>
  )
}
