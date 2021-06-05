import React, {useState} from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

export default function ConfirmationModal({
  func,
  queryFunc,
  buttonVariant,
  buttonText,
  modalHeading,
  modalBody,
  floatRight,
  id,
  quoteBody,
  confirmationText
}) {
  const [show, setShow] = useState(false)
  const [duration, setDuration] = useState(1)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleDurationChange = e => {
    setDuration(e.target.value)
  }

  const handleFunc = () => {
    if (!quoteBody || quoteBody === undefined) {
      func(id)
      return setShow(false)
    } else {
      func({...quoteBody, duration: Number(duration)})
      queryFunc(id)
      return setShow(false)
    }
  }

  return (
    <>
      <Button
        variant={buttonVariant}
        onClick={handleShow}
        className={floatRight ? 'float-right' : ''}
      >
        {buttonText}
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalHeading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalBody}
          {quoteBody &&
            quoteBody !== undefined && (
              <Form>
                <Form.Group controlId="duration">
                  <Form.Label>Duration (hours):</Form.Label>
                  <Form.Control
                    type="number"
                    value={duration}
                    onChange={e => handleDurationChange(e)}
                    min="1"
                    max="10"
                    step="0.5"
                  />
                  <Form.Text className="text-muted">
                    How long do you need me for?
                  </Form.Text>
                </Form.Group>
              </Form>
            )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant={buttonVariant} onClick={handleFunc}>
            {confirmationText}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
