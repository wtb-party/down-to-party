import React from 'react'
import {useDispatch} from 'react-redux'
import {createContract} from '../../store/contracts'
import {updateQuoteStatus} from '../../store/quotes'
import Button from 'react-bootstrap/Button'

export default function CreateContract({
  eventId,
  quoteId,
  quoteStatus,
  providerId
}) {
  const dispatch = useDispatch()
  const handleCreateContract = () => {
    dispatch(updateQuoteStatus(quoteId, 'confirmed'))
    dispatch(createContract({eventId, quoteId, providerId}))
  }
  return (
    <Button
      className="float-right"
      variant="success"
      onClick={() => handleCreateContract()}
      disabled={quoteStatus === 'confirmed'}
    >
      Confirm Booking
    </Button>
  )
}
