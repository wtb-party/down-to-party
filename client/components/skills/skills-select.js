import React from 'react'
import Form from 'react-bootstrap/Form'

export default function SkillsSelect({skills, handleSelection}) {
  return (
    <Form.Group controlId="userSkills">
      <Form.Label>Skills</Form.Label>
      <Form.Control as="select" onChange={e => handleSelection(e)}>
        <option value={0}>Select a skill to add</option>
        {skills && skills.length ? (
          skills.map(skill => (
            <option key={skill.id} value={skill.id}>
              {skill.title}
            </option>
          ))
        ) : (
          <option>loading...</option>
        )}
      </Form.Control>
    </Form.Group>
  )
}
