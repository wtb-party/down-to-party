import React from 'react'
import {useDispatch} from 'react-redux'
import {updateQuoteStatus} from '../../store/quotes'
import {deleteContract} from '../../store/contracts'
import Button from 'react-bootstrap/Button'

export default function CancelContract({
  eventId,
  quoteId,
  providerId,
  quoteStatus
}) {
  const dispatch = useDispatch()

  const handleCancelContract = () => {
    dispatch(updateQuoteStatus({quoteId, quoteStatus: 'canceled'}))
    if (quoteStatus === 'confirmed') {
      dispatch(deleteContract({eventId, quoteId, providerId}))
    }
  }

  return (
    <Button
      onClick={() => handleCancelContract()}
      className="float-right"
      style={{marginRight: 5}}
      variant="danger"
    >
      Cancel
    </Button>
  )
}
