import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import Container from 'react-bootstrap/Container'
import {fetchSingleEvent} from '../../store/single-event'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import CardDeck from 'react-bootstrap/CardDeck'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import ConfirmationModal from '../util/confirmationModal'
import {destroyEvent} from '../../store/event'
import {fetchServices} from '../../store/services'

class SingleEvent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  async componentDidMount() {
    const id = parseInt(this.props.match.params.id, 10)
    await this.props.fetchSingleEvent(id)
    const listings = this.props.singleEvent.listings
    if (listings && listings.length) {
      const titles = listings.reduce((accum, curr) => {
        accum.push(`title=${curr.role.title}`)
        return accum
      }, [])
      this.props.fetchServices(titles)
    }
  }
  render() {
    const {singleEvent, eventType, services} = this.props
    return (
      <Container>
        <Tabs defaultActiveKey="event" id="event-control">
          <Tab eventKey="event" title="Event">
            <br />
            <h3>{singleEvent && singleEvent.eventType && eventType.name}</h3>
            <h4 className="text-muted">{singleEvent.location}</h4>
            <p>{`This is a: ${
              singleEvent.public ? 'public' : 'private'
            } event`}</p>
          </Tab>
          <Tab eventKey="services" title="Services">
            <br />
            <h3>Search for Service Providers</h3>
            <br />
            {singleEvent &&
            singleEvent.listings &&
            singleEvent.listings.length ? (
              singleEvent.listings.map(listing => (
                <div key={listing.id}>
                  <h4>
                    {listing.role.title}{' '}
                    <span className="gray-small">See all</span>
                  </h4>
                  <CardDeck>
                    {services && services.length ? (
                      services.map(service => {
                        if (service.skill.title === listing.role.title) {
                          const {email, photoURL} = service.provider.profile
                          return (
                            <Card key={service.id} style={{maxWidth: '16rem'}}>
                              <Card.Img
                                variant="top"
                                src={
                                  photoURL
                                    ? photoURL
                                    : `https://robohash.org/set_set5/bgset_bg1/${email}.png`
                                }
                              />
                              <Card.Body>
                                <Card.Title>{email}</Card.Title>
                                <Card.Text>
                                  Some quick example text to build on the card
                                  title and make up the bulk of the card's
                                  content.
                                </Card.Text>
                                <Button variant="primary">Request Quote</Button>
                              </Card.Body>
                            </Card>
                          )
                        }
                      })
                    ) : (
                      <p>No providers found for this service</p>
                    )}
                  </CardDeck>
                  <br />
                </div>
              ))
            ) : (
              <div>No Services yet</div>
            )}
          </Tab>
          <Tab eventKey="settings" title="Settings">
            <br />
            <ConfirmationModal
              func={this.props.destroyEvent}
              id={singleEvent.id}
              buttonVariant="danger"
              buttonText="Cancel Event"
              modalHeading={`Are you sure you want to cancel your ${singleEvent &&
                singleEvent.eventType &&
                eventType.name}?`}
              modalBody="This action is permanent and cannot be undone. Please confirm by clicking Save Changes bellow"
            />
          </Tab>
        </Tabs>
      </Container>
    )
  }
}

const mapState = state => ({
  singleEvent: state.singleEvent,
  eventType: state.singleEvent.eventType,
  services: state.services
})

const mapDispatch = (dispatch, ownProps) => ({
  fetchSingleEvent: id => dispatch(fetchSingleEvent(id)),
  destroyEvent: id => dispatch(destroyEvent(id, ownProps.history)),
  fetchServices: eventListings => dispatch(fetchServices(eventListings))
})

export default withRouter(connect(mapState, mapDispatch)(SingleEvent))
