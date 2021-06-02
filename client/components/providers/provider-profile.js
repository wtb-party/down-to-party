import React from 'react'
import {Link} from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Media from 'react-bootstrap/Media'
import Image from 'react-bootstrap/Image'
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'

export default function ProviderProfile({
  provider: {
    profile: {id, email, location, photoURL, firstName, lastName},
    services
  },
  isAuthenticatedProvider
}) {
  return (
    <Container>
      <h1 className="text-center">
        {isAuthenticatedProvider ? 'Your' : `${firstName}'s`} profile
      </h1>
      <Card className="user-profile center w-75 p-3">
        <Media style={{marginBottom: 10}}>
          <Image
            width={200}
            height={200}
            style={{marginRight: 30}}
            className="align-self-center"
            src={
              photoURL
                ? photoURL
                : `https://robohash.org/set_set5/bgset_bg1/${firstName}${lastName}.png`
            }
            alt={email}
            roundedCircle
          />
          <Media.Body>
            <Card.Title>{email}</Card.Title>
            {location ? location : 'Unspecified'}
          </Media.Body>
        </Media>
        <div>
          <Accordion style={{marginBottom: 10}}>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="0">
                See {isAuthenticatedProvider ? 'your' : `${firstName}'s`}{' '}
                services:
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body className="user-profile p-0">
                  {services ? (
                    services.length ? (
                      services.map(service => (
                        <Card key={service.id}>
                          <Card.Body
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between'
                            }}
                          >
                            <div>{service.type.title}</div>
                            <div>
                              ${service.rate1} / {service.rate1Mode}
                            </div>
                          </Card.Body>
                        </Card>
                      ))
                    ) : (
                      <p>No services</p>
                    )
                  ) : (
                    <p>Loading...</p>
                  )}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </div>
        {isAuthenticatedProvider && (
          <div>
            <Button
              className="float-right"
              as={Link}
              to={`/users/${id}/profile/edit`}
            >
              Edit Services
            </Button>
          </div>
        )}
      </Card>
    </Container>
  )
}
