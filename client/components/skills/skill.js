import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {fetchSkill} from '../../store/skill'

export default function Skill(props) {
  const dispatch = useDispatch()
  const skill = useSelector(state => state.skills)

  useEffect(() => {
    dispatch(fetchSkill(props.match.params.id))
  }, [])

  return (
    <>
      {skill && skill.id ? (
        <>
          <div>Events that need {skill.title}s</div>
          {skill.providers.map(provider => (
            <div key={provider.id}>{provider.location}</div>
          ))}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  )
}
