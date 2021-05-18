import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import Container from 'react-bootstrap/Container'
import {fetchSingleEvent} from '../../store/single-event'

class SingleEvent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    const id = parseInt(this.props.match.params.id, 10)
    this.props.fetchSingleEvent(id)
  }
  render() {
    const {singleEvent, eventType} = this.props
    return (
      <Container>
        <div>
          <p>
            Event type: {singleEvent && singleEvent.eventType && eventType.name}
          </p>
          <p>Location: {singleEvent.location}</p>
        </div>
        <div>
          <p>Pending Services:</p>
          {singleEvent &&
          singleEvent.services &&
          singleEvent.services.length ? (
            singleEvent.services.map(service => (
              <p key={service.id}>{service.title}</p>
            ))
          ) : (
            <p>No Services yet</p>
          )}
        </div>
      </Container>
    )
  }
}

const mapState = state => ({
  singleEvent: state.singleEvent,
  eventType: state.singleEvent.eventType
})

const mapDispatch = dispatch => ({
  fetchSingleEvent: id => dispatch(fetchSingleEvent(id))
})

export default withRouter(connect(mapState, mapDispatch)(SingleEvent))
