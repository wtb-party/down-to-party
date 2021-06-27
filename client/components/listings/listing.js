import React, {useEffect} from 'react'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import {useDispatch, useSelector} from 'react-redux'
import {fetchListing} from '../../store/listings'

export default function Listing({match}) {
  const dispatch = useDispatch()
  const listing = useSelector(state => state.listings.listing)
  const status = useSelector(state => state.listings.singleStatus)
  const error = useSelector(state => state.listings.error)

  useEffect(() => {
    if (status === 'idle' || String(listing.id) !== match.params.listingId) {
      dispatch(fetchListing(match.params.listingId))
    }
  }, [])

  let content
  if (status === 'loading') {
    // content = <div className="loader-v1">Loading...</div>
  } else if (status === 'succeeded') {
    content = (
      <Card className="listings center w-50 p-3" style={{marginBottom: 10}}>
        <Card.Header>
          <span>{listing.role.title}</span>
          <span className="float-right">
            {listing.positionsAvailable} position(s) available!
          </span>
        </Card.Header>
        <Card.Body>
          <div>Location: {listing.event.location}</div>
          <div>Date: {listing.event.date}</div>
        </Card.Body>
      </Card>
    )
  } else if (status === 'failed') {
    content = <div>{error}</div>
  }

  return <Container>{content}</Container>
}
