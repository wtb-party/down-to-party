import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchProviders} from '../../store/providers'
import {Link} from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Media from 'react-bootstrap/Media'
import Image from 'react-bootstrap/Image'
import Accordion from 'react-bootstrap/Accordion'

export default function Providers() {
  const dispatch = useDispatch()
  const providers = useSelector(state => state.providers)

  useEffect(() => {
    dispatch(fetchProviders())
  }, [])

  return (
    <Container>
      {providers ? (
        providers.length ? (
          providers.map(
            ({
              profile: {id, location, firstName, lastName, photoURL},
              services
            }) => (
              <Card
                key={`profile-${id}`}
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
                    Location: {location ? location : 'Unspecified'}
                  </Media.Body>
                </Media>
                <div>
                  <Accordion style={{marginBottom: 10}}>
                    <Card>
                      <Accordion.Toggle as={Card.Header} eventKey="0">
                        View {firstName + "'s"} skills:
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body className="providers p-0">
                          {services.length ? (
                            services.map(({id, skill}) => (
                              <Card key={`skill-${id}`}>
                                <Card.Body>{skill.title}</Card.Body>
                              </Card>
                            ))
                          ) : (
                            <p>No services</p>
                          )}
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                </div>
              </Card>
            )
          )
        ) : (
          <p>There are no providers</p>
        )
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  )
}
