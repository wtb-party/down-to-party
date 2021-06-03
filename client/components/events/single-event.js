import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import Container from 'react-bootstrap/Container'
import {fetchSingleEvent} from '../../store/single-event'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import ConfirmationModal from '../util/confirmationModal'
import {destroyEvent} from '../../store/event'
import {fetchServices} from '../../store/services'
import {
  requestQuote,
  fetchEventQuotes,
  updateQuoteStatus
} from '../../store/quotes'
import Button from 'react-bootstrap/Button'

class SingleEvent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.serviceQuoteMapper = this.serviceQuoteMapper.bind(this)
    this.quoteListingMapper = this.quoteListingMapper.bind(this)
  }
  async componentDidMount() {
    const id = parseInt(this.props.match.params.id, 10)
    await this.props.fetchSingleEvent(id)
    await this.props.fetchEventQuotes(id)
    const listings = this.props.singleEvent.listings
    if (listings && listings.length) {
      const titles = listings.reduce((accum, curr) => {
        accum.push(`title=${curr.role.title}`)
        return accum
      }, [])
      this.props.fetchServices(titles)
    }
  }

  serviceQuoteMapper(service) {
    const {rate1, rate1Mode} = service
    return (
      <div>
        <p>{`You're requesting services from ${
          service.provider.profile.email
        }, as a ${service.type.title}`}</p>
        <p>{`Hourly Rate: $${rate1}`}</p>
        <p>{`Rate Type: ${rate1Mode}`}</p>
      </div>
    )
  }

  quoteListingMapper(title, providerId, serviceId) {
    const listings = this.props.singleEvent.listings
    const currentRole = listings.find(({role}) => role.title === title)
    return {
      listingId: currentRole.id,
      providerId,
      serviceId
    }
  }

  render() {
    const {singleEvent, eventType, services, quotes} = this.props
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
                        if (service.type.title === listing.role.title) {
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
                                <ConfirmationModal
                                  func={this.props.requestQuote}
                                  queryFunc={this.props.fetchEventQuotes}
                                  id={singleEvent.id}
                                  buttonVariant="primary"
                                  confirmationText="Request Quote"
                                  buttonText="Request Quote"
                                  modalHeading={`Here is an estimated summary of your ${singleEvent &&
                                    singleEvent.eventType &&
                                    eventType.name}`}
                                  modalBody={this.serviceQuoteMapper(service)}
                                  quoteBody={this.quoteListingMapper(
                                    service.type.title,
                                    service.providerId,
                                    service.id
                                  )}
                                />
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
          <Tab eventKey="quotes" title="Quotes">
            <br />
            {quotes && quotes.length ? (
              quotes.map(quote => (
                <Card key={quote.id} style={{marginBottom: 10}}>
                  <Card.Header>
                    {quote && quote.provider && quote.provider.profile.email}
                    <span className="float-right gray-small">
                      status: {quote.status}
                    </span>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title>
                      {quote && quote.service && quote.service.type.title}
                    </Card.Title>
                    <div>
                      Hourly Rate: ${quote &&
                        quote.service &&
                        quote.service.rate1}
                    </div>
                    <div>
                      Rate Type:{' '}
                      {quote && quote.service && quote.service.rate1Mode}
                    </div>
                    <br />
                    <Button
                      onClick={() =>
                        this.props.updateQuoteStatus(quote.id, 'confirmed')
                      }
                      className="float-right"
                      variant="success"
                    >
                      Confirm Booking
                    </Button>
                    <Button
                      onClick={() =>
                        this.props.updateQuoteStatus(quote.id, 'canceled')
                      }
                      className="float-right"
                      style={{marginRight: 5}}
                      variant="danger"
                    >
                      Cancel
                    </Button>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <p>You haven't requested any quotes yet.</p>
            )}
          </Tab>
          <Tab eventKey="settings" title="Settings">
            <br />
            <ConfirmationModal
              func={this.props.destroyEvent}
              id={singleEvent.id}
              confirmationText="Save Changes"
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
  services: state.services,
  quotes: state.quotes
})

const mapDispatch = (dispatch, ownProps) => ({
  fetchSingleEvent: id => dispatch(fetchSingleEvent(id)),
  destroyEvent: id => dispatch(destroyEvent(id, ownProps.history)),
  fetchServices: eventListings => dispatch(fetchServices(eventListings)),
  requestQuote: quoteBody => dispatch(requestQuote(quoteBody)),
  fetchEventQuotes: eventId => dispatch(fetchEventQuotes(eventId)),
  updateQuoteStatus: (quoteId, status) =>
    dispatch(updateQuoteStatus(quoteId, status))
})

export default withRouter(connect(mapState, mapDispatch)(SingleEvent))
