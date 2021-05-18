import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'

export default function SkillsList({skills}) {
  const currentUserSkills = useSelector(state => state.user.skills)
  const [userSkillIds, setUserSkillIds] = useState([])

  useEffect(() => {
    if (currentUserSkills) {
      let ids = []
      currentUserSkills.reduce((acc, userSkill) => ids.push(userSkill.id), [])
      setUserSkillIds(ids)
    }
  }, [])

  const [hoverIdx, setHoverIdx] = useState(null)
  const handleOnMouseEnter = key => setHoverIdx(key)
  const handleOnMouseLeave = () => setHoverIdx(null)

  const addToUserSkills = skillId =>
    console.log('addToUserSkills invoked', skillId)

  const removeFromUserSkills = skillId =>
    console.log('removeFromUserSkills invoked', skillId)

  return (
    <ListGroup>
      {skills ? (
        skills.map(skill => (
          <ListGroup.Item
            key={skill.id}
            active={skill.id === hoverIdx}
            onMouseEnter={() => handleOnMouseEnter(skill.id)}
            onMouseLeave={() => handleOnMouseLeave()}
          >
            <SkillComponent
              skill={skill}
              buttonText={
                userSkillIds.indexOf(skill.id) === -1 ? 'Add' : 'Remove'
              }
              handleClick={
                userSkillIds.indexOf(skill.id) === -1
                  ? addToUserSkills
                  : removeFromUserSkills
              }
              variant={
                userSkillIds.indexOf(skill.id) === -1 ? 'success' : 'danger'
              }
            />
          </ListGroup.Item>
        ))
      ) : (
        <ListGroup.Item>You haven't selected any skills!</ListGroup.Item>
      )}
    </ListGroup>
  )
}

function SkillComponent({buttonText, handleClick, skill, variant}) {
  return (
    <div className="skillComponent">
      <div>{skill.title}</div>
      <div>
        <Button
          onClick={() => handleClick(skill.id)}
          size="sm"
          variant={variant}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  )
}
