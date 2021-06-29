import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import moment from 'moment'

export class UserHome extends React.Component {
  constructor(props) {
    super(props)
    this.handleEventStaff = this.handleEventStaff.bind(this)
  }

  handleEventStaff(e, userId) {
    const {skills} = this.props.user
    let eventSkill
    if (e.workers && e.workers.length) {
      eventSkill = e.workers.find(({id}) => id === userId)
      if (eventSkill) {
        eventSkill = eventSkill.event_staff.skillId
      }
      if (skills && skills.length) {
        const currentSkill = skills.find(({id}) => id === eventSkill)
        if (currentSkill) {
          return currentSkill.title
        }
      }
    }
    return 'No Skills found'
  }

  render() {
    const {user: {email, id, events}} = this.props

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
              events.map(event => (
                <Card key={event.id} style={{marginBottom: 10}}>
                  <Card.Body>
                    <Card.Title>
                      {event && event.eventType ? event.eventType.name : ''}
                    </Card.Title>
                    Location: {event.location}
                  </Card.Body>
                  <Card.Footer>
                    {moment(event.date).format('MMMM Do YYYY, h:mm a')}
                    <Button
                      className="float-right"
                      as={Link}
                      to={`/events/${event.id}`}
                    >
                      View Event
                    </Button>
                  </Card.Footer>
                </Card>
              ))
            ) : (
              <p>You're not hosting any events yet.</p>
            )}
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapState = state => {
  return {
    user: state.user.user,
    event: state.event
  }
}

export default connect(mapState, null)(UserHome)

UserHome.propTypes = {
  email: PropTypes.string
}
