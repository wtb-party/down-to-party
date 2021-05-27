import React from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Media from 'react-bootstrap/Media'
import Image from 'react-bootstrap/Image'
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'

export default function UserProfile() {
  const {id, email, photoURL, location, skills} = useSelector(
    state => state.user
  )

  return (
    <Container>
      <h1 className="text-center">Your profile</h1>
      <Card className="user-profile center w-75 p-3">
        <Media style={{marginBottom: 10}}>
          <Image
            width={300}
            height={300}
            style={{marginRight: 30}}
            className="align-self-center"
            src={
              photoURL
                ? photoURL
                : `https://robohash.org/set_set5/bgset_bg1/${email}.png`
            }
            alt={email}
            roundedCircle
          />
          <Media.Body>
            <Card.Title>{email}</Card.Title>
            {location ? location : "You haven't specified a location"}
          </Media.Body>
        </Media>
        <div>
          <Accordion style={{marginBottom: 10}}>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="0">
                Search for events that are in need of your skills:
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body className="user-profile p-0">
                  {skills && skills.length ? (
                    skills.map(skill => (
                      <Card key={skill.id}>
                        <Card.Body>
                          <Link to={`/skills/${skill.id}`}>{skill.title}</Link>
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
            className="float-right"
            as={Link}
            to={`/users/${id}/profile/edit`}
          >
            Edit Profile
          </Button>
        </div>
      </Card>
    </Container>
  )
}
