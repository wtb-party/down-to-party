import queryString from 'query-string'
import React, {useEffect, useState} from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Image from 'react-bootstrap/Image'
import Media from 'react-bootstrap/Media'
import Row from 'react-bootstrap/Row'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchProviders} from '../../store/providers'
import {fetchSkills} from '../../store/skill'

export default function Providers({history, location}) {
  const dispatch = useDispatch()
  const providers = useSelector(state => state.providers)
  const skills = useSelector(state => state.skills.skills)
  const skillStatus = useSelector(state => state.skills.status)
  const [locationInput, setLocationInput] = useState('')
  const [skillIds, setSkillIds] = useState([])

  useEffect(
    () => {
      dispatch(fetchProviders(location.search))
    },
    [location.search]
  )

  useEffect(() => {
    if (skillStatus === 'idle') {
      dispatch(fetchSkills())
    }
  }, [])

  const handleLocationInput = e => {
    setLocationInput(e.target.value)
  }

  const handleSwitch = e => {
    const id = parseInt(e.target.id, 10)
    if (skillIds.includes(id)) {
      setSkillIds(skillIds.filter(skillId => skillId !== id))
    } else {
      setSkillIds([...skillIds, id])
    }
  }

  const handleSubmit = e => {
    e.preventDefault()

    const queryStringified = queryString.stringify(
      {
        location: locationInput,
        skill: skillIds
      },
      {skipEmptyString: true}
    )
    history.push(location.pathname + '?' + queryStringified)
  }

  const clearFilters = () => {
    setLocationInput('')
    setSkillIds([])
    history.push(location.pathname)
  }

  return (
    <Container>
      <Row>
        <Col md={8}>
          {providers ? (
            providers.length ? (
              providers.map(
                ({
                  id,
                  profile: {
                    id: profileId,
                    location: userLocation,
                    firstName,
                    lastName,
                    photoURL
                  }
                }) => (
                  <Card
                    key={`profile-${profileId}`}
                    className="providers center w-50 p-3"
                    style={{marginBottom: 10}}
                  >
                    <Media style={{marginBottom: 10}}>
                      <Image
                        width={75}
                        height={75}
                        style={{marginRight: 30}}
                        className="align-self-center"
                        src={
                          photoURL
                            ? photoURL
                            : `https://robohash.org/set_set5/bgset_bg1/${firstName}${lastName}.png`
                        }
                        alt={`${firstName}${lastName}`}
                        roundedCircle
                      />
                      <Media.Body>
                        <Card.Title>
                          <Link to={`/providers/${id}`}>
                            {firstName + ' ' + lastName}
                          </Link>
                        </Card.Title>
                        Location: {userLocation ? userLocation : 'Unspecified'}
                      </Media.Body>
                    </Media>
                  </Card>
                )
              )
            ) : (
              <p>There are no providers</p>
            )
          ) : (
            <p>Loading...</p>
          )}
        </Col>
        <Col>
          <Form>
            <Form.Group>
              <Button
                type="submit"
                onClick={e => handleSubmit(e)}
                variant="success"
              >
                Set Filters
              </Button>
              <Button
                onClick={() => clearFilters()}
                className="float-right"
                variant="danger"
              >
                Clear Filters
              </Button>
            </Form.Group>
            <Form.Group controlId="locationInput">
              <Form.Label>Filter by Location:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Location"
                onChange={e => handleLocationInput(e)}
                value={locationInput}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Filter by Skill:</Form.Label>
              <Card>
                <Card.Body className="user-form p-0">
                  {skills ? (
                    skills.length ? (
                      <>
                        <span
                          onClick={() => {
                            setSkillIds(
                              skills.reduce(
                                (skillIdArr, currSkill) => [
                                  ...skillIdArr,
                                  currSkill.id
                                ],
                                []
                              )
                            )
                          }}
                        >
                          all
                        </span>
                        {' / '}
                        <span onClick={() => setSkillIds([])}>none</span>
                        {skills.map(skill => (
                          <Card key={skill.id}>
                            <Card.Body>
                              {skill.title}
                              <Form.Switch
                                id={skill.id}
                                className="float-right"
                                checked={skillIds.includes(skill.id)}
                                onChange={e => handleSwitch(e)}
                              />
                            </Card.Body>
                          </Card>
                        ))}
                      </>
                    ) : (
                      <p>No skills!</p>
                    )
                  ) : (
                    <p>Loading...</p>
                  )}
                </Card.Body>
              </Card>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}
