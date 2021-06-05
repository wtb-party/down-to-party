import React, {useState} from 'react'
import Form from 'react-bootstrap/Form'

export default function Toggles({skill, skillIds, handleSwitch}) {
  return (
    <Form.Switch
      id={skill.id}
      className="float-right"
      checked={skillIds.includes(skill.id)}
      onChange={e => handleSwitch(e)}
    />
  )
}
