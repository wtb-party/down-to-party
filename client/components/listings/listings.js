import React, {useEffect} from 'react'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchListings} from '../../store/listings'

export default function Listings() {
  const dispatch = useDispatch()
  const listings = useSelector(state => state.listings.listings)
  const status = useSelector(state => state.listings.status)
  const error = useSelector(state => state.listings.error)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchListings())
    }
  }, [])

  let content
  if (status === 'loading') {
    // content = <div className="loader-v1">Loading...</div>
  } else if (status === 'succeeded') {
    content = listings.map(({id, positionsAvailable, role, event}) => (
      <Card
        key={id}
        className="listings center w-50 p-3"
        style={{marginBottom: 10}}
      >
        <Card.Header>
          <span>
            <Link to={`/listings/${id}`}>{role.title}</Link>
          </span>
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
  } else if (status === 'failed') {
    content = <div>{error}</div>
  }

  return <Container>{content}</Container>
}
