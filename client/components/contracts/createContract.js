import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {createContract} from '../../store/contracts'
import {updateQuoteStatus} from '../../store/quotes'
import Button from 'react-bootstrap/Button'
import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal'
import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner'

export default function CreateContract({
  eventId,
  quote,
  quoteStatus,
  provider,
  service
}) {
  const dispatch = useDispatch()
  const stripe = useStripe()
  const elements = useElements()
  const [show, setShow] = useState(false)
  const [paymentMessage, setPaymentMessage] = useState('')
  const [alertVariant, setAlertVariant] = useState('success')
  const [isProcessing, setIsProcessing] = useState(false)

  const handleClose = () => {
    setShow(false)
    setPaymentMessage('')
  }
  const handleShow = () => setShow(true)

  const handleSubmit = async event => {
    event.preventDefault()

    setIsProcessing(true)

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    })

    if (!error) {
      try {
        const {id} = paymentMethod
        let response
        if (quote && quote.duration && service && service.rate1) {
          response = await axios.post('/api/payments', {
            amount: quote.duration * service.rate1 * 100,
            id: id,
            stripeId: provider.stripeId
          })
        }

        if (response.data.success) {
          console.log('CheckoutForm.js 25 | payment successful!')
          dispatch(
            updateQuoteStatus({quoteId: quote.id, quoteStatus: 'confirmed'})
          )
          dispatch(
            createContract({
              eventId,
              quoteId: quote.id,
              providerId: provider.id
            })
          )
          setPaymentMessage(response.data.message)
          setAlertVariant('success')
          setIsProcessing(false)
          return setTimeout(() => {
            handleClose()
          }, 2000)
        } else {
          console.log(
            `error: ${response.data.message}, reason: ${
              response.data.error.code
            }`
          )
          setPaymentMessage(response.data.message)
          setAlertVariant('danger')
          setIsProcessing(false)
        }
      } catch (err) {
        console.log('CheckoutForm.js 28 | ', err)
      }
    } else {
      console.log(error.message)
    }
  }

  return (
    <>
      <Button
        variant="success"
        onClick={handleShow}
        className="float-right"
        disabled={
          quoteStatus === 'confirmed' /* || quoteStatus !== 'accepted' */
        }
      >
        Confirm Booking
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>
            Payment to {provider && provider.profile && provider.profile.email}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {paymentMessage && (
            <Alert variant={alertVariant}>{paymentMessage}</Alert>
          )}
          <CardElement />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="success"
            onClick={e => handleSubmit(e)}
            disabled={
              isProcessing ||
              (!!paymentMessage && !paymentMessage.endsWith('Failed'))
            }
          >
            {isProcessing ? (
              <Spinner animation="border" size="sm" />
            ) : (
              `$${quote.duration * service.rate1}`
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
