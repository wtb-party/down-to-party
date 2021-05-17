import React from 'react'
import Form from 'react-bootstrap/Form'

export default function SkillsSelect({skills, handleSelection}) {
  return (
    <Form.Group controlId="userSkills">
      <Form.Label>Skills</Form.Label>
      <Form.Control as="select" onChange={e => handleSelection(e)}>
        {skills && skills.length ? (
          skills.map(skill => <option key={skill.id}>{skill.title}</option>)
        ) : (
          <option>loading...</option>
        )}
      </Form.Control>
    </Form.Group>
  )
}
