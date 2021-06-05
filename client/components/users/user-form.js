import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {fetchAllSkills} from '../../store/skill'
import {updateUser} from '../../store/user'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Media from 'react-bootstrap/Media'
import Image from 'react-bootstrap/Image'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Tab from 'react-bootstrap/Tab'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import {createProvider, updateProvider} from '../../store/providers'
import {Link} from 'react-router-dom'
import Toggles from '../util/toggles'

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

  const handleSwitch = e => {
    const id = parseInt(e.target.id, 10)
    if (skillIds.includes(id)) {
      setSkillIds(skillIds.filter(skillId => skillId !== id))
    } else {
      setSkillIds([...skillIds, id])
    }
  }

  const handleUserUpdate = e => {
    e.preventDefault()

    if (inputs.photoURL === '') inputs.photoURL = user.photoURL
    if (inputs.location === '') inputs.location = user.location

    dispatch(
      updateUser(
        {
          ...inputs
        },
        user.id
      )
    )

    history.push(`/users/${user.id}/profile`)
  }

  const handleCreateProvider = userId => {
    dispatch(createProvider(userId, history))
  }

  const handleProviderUpdate = e => {
    console.log('providerId', user.provider.id)
    e.preventDefault()
    dispatch(updateProvider(skillIds, user.provider.id))
  }

  return (
    <Container>
      <Tab.Container id="left-profile-tabs" defaultActiveKey="profile">
        <Row>
          <Col sm={2}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="profile">Profile</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="provider">Provider</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={10}>
            <Tab.Content>
              <Tab.Pane eventKey="profile">
                <Card className="user-profile p-3">
                  <Media style={{marginBottom: 10}}>
                    <Image
                      width={200}
                      height={200}
                      style={{marginRight: 10}}
                      className="align-self-center"
                      src={
                        user.photoURL
                          ? user.photoURL
                          : `https://robohash.org/set_set5/bgset_bg1/${
                              user.email
                            }.png`
                      }
                      alt={user.email}
                      roundedCircle
                    />
                    <Media.Body>
                      <Form>
                        <Form.Group controlId="photoURL">
                          <Form.Label size="sm">
                            URL to your profile picture:
                          </Form.Label>
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
                              user.location
                                ? user.location
                                : 'A galaxy far far away...'
                            }
                            onChange={e => handleInput(e)}
                            value={inputs.location}
                          />
                        </Form.Group>
                      </Form>
                    </Media.Body>
                  </Media>
                  <div>
                    <Button
                      onClick={e => handleUserUpdate(e)}
                      className="float-right"
                      variant="success"
                    >
                      Save Changes
                    </Button>
                  </div>
                </Card>
              </Tab.Pane>
              <Tab.Pane eventKey="provider">
                <Card className="user-profile p-3">
                  {user && user.provider && user.provider.id ? (
                    <>
                      <div>Your Provider account is active!</div>
                      <Form>
                        <Row>
                          {skills && skills.length
                            ? skills.map(skill => (
                                <Col xs={12} sm={6} md={4} key={skill.id}>
                                  <Card style={{marginBottom: 5}}>
                                    <Card.Body style={{padding: 10}}>
                                      {skill.title}
                                      <Toggles
                                        skill={skill}
                                        skillIds={skillIds}
                                        handleSwitch={handleSwitch}
                                      />
                                    </Card.Body>
                                  </Card>
                                </Col>
                              ))
                            : false}
                        </Row>
                        <Button
                          onClick={e => handleProviderUpdate(e)}
                          variant="success"
                        >
                          Save Changes
                        </Button>
                      </Form>
                      <br />
                      <Button as={Link} to={`/providers/${user.provider.id}`}>
                        Public Provider Page
                      </Button>
                    </>
                  ) : (
                    <>
                      <p>Become a service provider!</p>
                      <Button
                        onClick={() => handleCreateProvider(user.id)}
                        className="float-right"
                        variant="success"
                      >
                        Create a Provider Account!
                      </Button>
                    </>
                  )}
                </Card>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  )
}
