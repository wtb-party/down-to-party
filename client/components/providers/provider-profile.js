import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Media from 'react-bootstrap/Media'
import Image from 'react-bootstrap/Image'
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'
import {fetchProviderQuotes, updateQuoteStatus} from '../../store/quotes'
import moment from 'moment'

export default function ProviderProfile({
  provider: {
    profile: {id, email, location, photoURL, firstName, lastName},
    services
  },
  isAuthenticatedProvider
}) {
  let quotes
  const dispatch = useDispatch()
  if (isAuthenticatedProvider) {
    const {id: providerId} = useSelector(state => state.providers)
    quotes = useSelector(state => state.quotes)
    useEffect(() => {
      dispatch(fetchProviderQuotes(providerId))
    }, [])
  }
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
      <br />
      {isAuthenticatedProvider && <h2 className="text-center">Event Quotes</h2>}
      {isAuthenticatedProvider && quotes && quotes.length ? (
        quotes.map(quote => (
          <Card
            key={quote.id}
            className="center w-75"
            style={{marginBottom: 10}}
          >
            <Card.Header>
              {quote &&
                quote.listing &&
                quote.listing.event &&
                quote.listing.event.eventType.name}
              <span className="gray-small">
                {' '}
                {`for ${quote &&
                  quote.listing &&
                  quote.listing.event &&
                  quote.listing.event.Host.email}`}
              </span>
              <span className="float-right gray-small">
                status: {quote.status}
              </span>
            </Card.Header>
            <Card.Body>
              <Card.Title>
                {quote && quote.service && quote.service.type.title}
                <span className="gray-small">
                  {' '}
                  {moment(
                    quote && quote.listing && quote.listing.event.date
                  ).format('MMMM Do YYYY, h:mm a')}
                </span>
              </Card.Title>
              <div>
                Hourly Rate: ${quote && quote.service && quote.service.rate1}
              </div>
              <div>
                Rate Type: {quote && quote.service && quote.service.rate1Mode}
              </div>
              <Button
                className="float-right"
                onClick={() =>
                  dispatch(updateQuoteStatus(quote.id, 'accepted'))
                }
                variant="success"
              >
                Confirm
              </Button>
              <Button
                style={{marginRight: 5}}
                className="float-right"
                onClick={() =>
                  dispatch(updateQuoteStatus(quote.id, 'rejected'))
                }
                variant="danger"
              >
                Deny
              </Button>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p className="text-center">
          {isAuthenticatedProvider && "You haven't received any quotes"}
        </p>
      )}
    </Container>
  )
}
