import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import {fetchWorkerEvents} from '../store/event'

export class UserHome extends React.Component {
  componentDidMount() {
    this.props.fetchWorkerEvents(this.props.user.id)
  }

  render() {
    const {user: {email, location, id, skills, events}, event} = this.props

    return (
      <Container>
        <div className="text-center" style={{marginBottom: 25}}>
          <h3>Welcome, {email}</h3>
        </div>
        <Row className="justify-content-sm-center">
          <Col xs={12} sm={6} md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Add to your list of growing skills!</Card.Title>
                <Card.Text>
                  Interested in offering your services for an Event? Be sure to
                  take advantage of our wide network to showcase your skills!
                </Card.Text>
                <Button as={Link} to={`/users/${id}/profile`}>
                  Edit Your Profile
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Plan a new Event!</Card.Title>
                <Card.Text>
                  Find services from a wide range of providers to help get your
                  event off on the right foot!
                </Card.Text>
                <Button as={Link} to="/events/new">
                  Get Started
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <br />
        <Row className="justify-content-sm-center app-container">
          <Col xs={12} sm={6}>
            <h3>Events you're hosting</h3>
            {events && events.length ? (
              events.map((event, idx) => (
                <Card key={idx} style={{marginBottom: 10}}>
                  <Card.Body>
                    <Card.Title>{event.eventType.name}</Card.Title>
                    Location: {event.location}
                  </Card.Body>
                  <Card.Footer>
                    <Row>
                      <Col xs={8}>Date: {event.date}</Col>
                      <Col xs={4}>
                        <Button
                          className="float-right"
                          as={Link}
                          to={`/events/${event.id}/users/${id}`}
                        >
                          View Event
                        </Button>
                      </Col>
                    </Row>
                  </Card.Footer>
                </Card>
              ))
            ) : (
              <p>You're not hosting any events yet.</p>
            )}
          </Col>
          <Col xs={12} sm={6}>
            <h3>Events you're working</h3>
            {event && event.length ? (
              event.map((e, idx) => (
                <Card key={e.id}>
                  <Card.Body>
                    <Card.Title>{e.eventType.name}</Card.Title>
                    Location: {e.location}
                  </Card.Body>
                  <Card.Footer>
                    <Row>
                      <Col xs={8}>Date: {e.date}</Col>
                      <Col xs={4}>
                        <Button
                          className="float-right"
                          as={Link}
                          to={`/events/${e.id}/users/${id}`}
                        >
                          View Event
                        </Button>
                      </Col>
                    </Row>
                  </Card.Footer>
                </Card>
              ))
            ) : (
              <p> You're not working any events yet </p>
            )}
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    event: state.event
  }
}

const mapDispatch = dispatch => {
  return {
    fetchWorkerEvents: userId => dispatch(fetchWorkerEvents(userId))
  }
}

export default connect(mapState, mapDispatch)(UserHome)

UserHome.propTypes = {
  email: PropTypes.string
}
