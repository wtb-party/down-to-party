import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {fetchAllSkills} from '../../store/skill'
import {updateUser} from '../../store/user'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Media from 'react-bootstrap/Media'
import Image from 'react-bootstrap/Image'
import Form from 'react-bootstrap/Form'
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'

export default function UserForm({history}) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllSkills())
  }, [])

  const user = useSelector(state => state.user)
  const skills = useSelector(state => state.skills)
  const [inputs, setInputs] = useState({
    photoURL: '',
    location: ''
  })
  const [skillIds, setSkillIds] = useState([])

  useEffect(
    () => {
      if (user.skills && user.skills.length) {
        setSkillIds(
          user.skills.reduce(
            (skillsArr, currSkill) => [...skillsArr, currSkill.id],
            []
          )
        )
      }
    },
    [user]
  )

  const handleInput = e => {
    setInputs({
      ...inputs,
      [e.target.id]: e.target.value
    })
  }

  const handleSwitch = (e, skill) => {
    const id = parseInt(e.target.id, 10)
    if (skillIds.includes(id)) {
      user.skills = user.skills.filter(userSkill => skill.id !== userSkill.id)
      setSkillIds(skillIds.filter(skillId => skillId !== id))
    } else {
      user.skills = [...user.skills, skill]
      setSkillIds([...skillIds, id])
    }
  }

  const handleSubmit = e => {
    e.preventDefault()

    if (inputs.photoURL === '') inputs.photoURL = user.photoURL
    if (inputs.location === '') inputs.location = user.location

    dispatch(
      updateUser(
        {
          ...inputs,
          skillIds
        },
        user.id
      )
    )

    history.push(`/users/${user.id}/profile`)
  }

  return (
    <Container>
      <h1 className="text-center">Edit your profile</h1>
      <Card className="user-profile center w-75 p-3">
        <Media style={{marginBottom: 10}}>
          <Image
            width={200}
            height={200}
            style={{marginRight: 10}}
            className="align-self-center"
            src={
              user.photoURL
                ? user.photoURL
                : `https://robohash.org/set_set5/bgset_bg1/${user.email}.png`
            }
            alt={user.email}
            roundedCircle
          />
          <Media.Body>
            <Form>
              <Form.Group controlId="photoURL">
                <Form.Label size="sm">URL to your profile picture:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="https://www.example.com/your-photo"
                  onChange={e => handleInput(e)}
                  value={inputs.photoURL}
                />
              </Form.Group>
              <Form.Group controlId="location">
                <Form.Label size="sm">Location:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={
                    user.location ? user.location : 'A galaxy far far away...'
                  }
                  onChange={e => handleInput(e)}
                  value={inputs.location}
                />
              </Form.Group>
            </Form>
          </Media.Body>
        </Media>
        <div>
          <Accordion style={{marginBottom: 10}}>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="0">
                Select skills to track jobs...
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body className="user-form p-0">
                  {skills && skills.length ? (
                    skills.map(skill => (
                      <Card key={skill.id}>
                        <Card.Body>
                          {skill.title}
                          <Form.Switch
                            id={skill.id}
                            className="float-right"
                            checked={skillIds.includes(skill.id)}
                            onChange={e => handleSwitch(e, skill)}
                          />
                        </Card.Body>
                      </Card>
                    ))
                  ) : (
                    <p>Loading...</p>
                  )}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </div>
        <div>
          <Button
            onClick={e => handleSubmit(e)}
            className="float-right"
            variant="danger"
          >
            Save Changes
          </Button>
        </div>
      </Card>
    </Container>
  )
}
