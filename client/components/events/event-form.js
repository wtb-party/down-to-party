import React from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {createEvent} from '../../store/event'
import {fetchEventTypes} from '../../store/eventTypes'
import {fetchSkills} from '../../store/skill'
class EventForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      location: '',
      eventType: 'Birthday Party',
      service: 'Bartender'
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    const {skillStatus, eventTypeStatus} = this.props
    if (skillStatus === 'idle') {
      this.props.fetchSkills()
    }
    if (eventTypeStatus === 'idle') {
      this.props.fetchEventTypes()
    }
  }
  handleChange(evt) {
    evt.preventDefault()
    this.setState({[evt.target.id]: evt.target.value})
  }
  handleSubmit(evt) {
    evt.preventDefault()
    this.props.createEvent({...this.state, userId: this.props.userId})
  }
  render() {
    const {location} = this.state
    const {skills, eventTypes} = this.props
    return (
      <Container>
        <Form onSubmit={this.handleSubmit} className="auth-form w-50 p-3">
          <Form.Group controlId="location">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              placeholder={location ? location : '5555 Party Street'}
              onChange={this.handleChange}
              value={this.state.location}
            />
          </Form.Group>
          <Form.Group controlId="eventType">
            <Form.Label>Event Type</Form.Label>
            <Form.Control
              as="select"
              onChange={this.handleChange}
              value={this.state.eventType}
            >
              {eventTypes && eventTypes.length ? (
                eventTypes.map(type => (
                  <option key={type.id}>{type.name}</option>
                ))
              ) : (
                <option>loading...</option>
              )}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="service">
            <Form.Label>Service</Form.Label>
            <Form.Control
              as="select"
              onChange={this.handleChange}
              value={this.state.service}
            >
              {skills && skills.length ? (
                skills.map(skill => (
                  <option key={skill.id}>{skill.title}</option>
                ))
              ) : (
                <option>loading...</option>
              )}
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    )
  }
}

const mapState = state => ({
  userId: state.user.user.id,
  skills: state.skills.skills,
  eventTypes: state.eventTypes.eventTypes,
  skillStatus: state.skills.status,
  eventTypeStatus: state.eventTypes.status
})

const mapDispatch = (dispatch, ownProps) => ({
  fetchSkills: () => dispatch(fetchSkills()),
  fetchEventTypes: () => dispatch(fetchEventTypes()),
  createEvent: event => dispatch(createEvent(event, ownProps.history))
})

export default withRouter(connect(mapState, mapDispatch)(EventForm))
