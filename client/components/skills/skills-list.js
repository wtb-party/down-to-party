import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {updateUser} from '../../store/user'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'

export default function SkillsList({skills}) {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user)

  const [hoverIdx, setHoverIdx] = useState(null)
  const handleOnMouseEnter = key => setHoverIdx(key)
  const handleOnMouseLeave = () => setHoverIdx(null)

  const isUserSkill = skill => {
    const currentUserSkillIds = currentUser.skills.reduce(
      (skillsArr, currSkill) => [...skillsArr, currSkill.id],
      []
    )

    return currentUserSkillIds.indexOf(skill.id) !== -1
  }

  const addToUserSkills = skill => {
    dispatch(
      updateUser(
        {...currentUser, skills: [...currentUser.skills, skill]},
        currentUser.id
      )
    )
  }

  const removeFromUserSkills = skill => {
    dispatch(
      updateUser(
        {
          ...currentUser,
          skills: currentUser.skills.filter(
            currSkill => currSkill.id !== skill.id
          )
        },
        currentUser.id
      )
    )
  }

  return (
    <ListGroup>
      {skills && skills.length ? (
        skills.map(skill => (
          <ListGroup.Item
            key={skill.id}
            active={skill.id === hoverIdx}
            onMouseEnter={() => handleOnMouseEnter(skill.id)}
            onMouseLeave={() => handleOnMouseLeave()}
          >
            <SkillComponent
              skill={skill}
              buttonText={isUserSkill(skill) ? 'Remove' : 'Add'}
              handleClick={
                isUserSkill(skill) ? removeFromUserSkills : addToUserSkills
              }
              variant={isUserSkill(skill) ? 'danger' : 'secondary'}
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
        <Button onClick={() => handleClick(skill)} size="sm" variant={variant}>
          {buttonText}
        </Button>
      </div>
    </div>
  )
}
