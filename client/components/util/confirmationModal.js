import React from 'react'
import Modal from 'react-bootstrap/Modal'
import {useState} from 'react'
import Button from 'react-bootstrap/Button'

export default function ConfirmationModal({
  func,
  buttonVariant,
  buttonText,
  modalHeading,
  modalBody,
  floatRight,
  id
}) {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleFunc = () => {
    func(id)
    return setShow(false)
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
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
