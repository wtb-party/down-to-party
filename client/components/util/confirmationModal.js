import React from 'react'
import Modal from 'react-bootstrap/Modal'
import {useState} from 'react'
import Button from 'react-bootstrap/Button'

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

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleFunc = () => {
    if (!quoteBody || quoteBody === undefined) {
      func(id)
      return setShow(false)
    } else {
      func(quoteBody)
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
        <Modal.Body>{modalBody}</Modal.Body>
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
