import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import Container from 'react-bootstrap/Container'
import {fetchSingleEvent} from '../../store/single-event'
import {fetchUsers} from '../../store/users'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

class SingleEvent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.getServices = this.getServices.bind(this)
    this.getUserServices = this.getUserServices.bind(this)
  }
  async componentDidMount() {
    const id = parseInt(this.props.match.params.id, 10)
    await this.props.fetchSingleEvent(id)
    this.props.fetchUsers()
  }
  getServices() {
    const event = this.props.singleEvent
    if (event) {
      return event.services
    }
    return []
  }
  getUserServices(userSkills) {
    const services = this.getServices()
    const serviceNames = services.reduce((accum, curr) => {
      accum.push(curr.title)
      return accum
    }, [])

    return userSkills.some(({title}) => serviceNames.includes(title))
  }
  render() {
    const {singleEvent, eventType, users} = this.props
    return (
      <Container>
        <Card style={{width: '18rem'}} className="center">
          <Card.Body>
            <Card.Title>
              {singleEvent && singleEvent.eventType && eventType.name}
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {singleEvent.location}
            </Card.Subtitle>
            Pending Services:
            {singleEvent &&
            singleEvent.services &&
            singleEvent.services.length ? (
              singleEvent.services.map(service => (
                <div key={service.id}>{service.title}</div>
              ))
            ) : (
              <div>No Services yet</div>
            )}
          </Card.Body>
        </Card>
        <div>
          <br />
          <h3>Search for Service Providers</h3>
          {users && users.length ? (
            users.map(user => {
              if (this.getUserServices(user.skills)) {
                return (
                  <Card key={user.id} style={{marginBottom: 10}}>
                    <Card.Body>
                      <Card.Title>{user.email}</Card.Title>
                      <Button variant="primary">Request a Quote!</Button>
                    </Card.Body>
                  </Card>
                )
              }
            })
          ) : (
            <p>No users</p>
          )}
        </div>
      </Container>
    )
  }
}

const mapState = state => ({
  singleEvent: state.singleEvent,
  eventType: state.singleEvent.eventType,
  users: state.users
})

const mapDispatch = dispatch => ({
  fetchSingleEvent: id => dispatch(fetchSingleEvent(id)),
  fetchUsers: () => dispatch(fetchUsers())
})

export default withRouter(connect(mapState, mapDispatch)(SingleEvent))
