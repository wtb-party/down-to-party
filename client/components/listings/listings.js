import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchListings} from '../../store/listings'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'

export default function Listings() {
  const dispatch = useDispatch()
  const listings = useSelector(state => state.listings)

  useEffect(() => {
    dispatch(fetchListings())
  }, [])

  return (
    <Container>
      {listings ? (
        listings.length ? (
          listings.map(({id, positionsAvailable, role, event}) => (
            <Card
              key={id}
              className="listings center w-50 p-3"
              style={{marginBottom: 10}}
            >
              <Card.Header>
                <span>{role.title}</span>
                <span className="float-right">
                  {positionsAvailable} position(s) available!
                </span>
              </Card.Header>
              <Card.Body>
                <div>Location: {event.location}</div>
                <div>Date: {event.date}</div>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p>There are no listings</p>
        )
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  )
}
