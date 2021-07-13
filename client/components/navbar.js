import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {logout} from '../store'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

const mainNav = () => {
  const dispatch = useDispatch()
  const handleClick = () => dispatch(logout())
  const isLoggedIn = useSelector(state => !!state.user.user.id)
  const userId = useSelector(state => state.user.user.id)

  return (
    <Navbar bg="light" expand="lg" id="nav">
      <Navbar.Brand as={NavLink} to="/home">
        Huddle
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {isLoggedIn ? (
            <>
              <Nav.Link as={NavLink} to="/home">
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/providers">
                Providers
              </Nav.Link>
              <Nav.Link as={NavLink} to="/listings">
                Listings
              </Nav.Link>
              <Nav.Link as={NavLink} to={`/users/${userId}/profile`}>
                Profile
              </Nav.Link>
              <Nav.Link href="/auth/auth0/logout" onClick={handleClick}>
                Logout
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link as={NavLink} to="/">
                Login
              </Nav.Link>
              <Nav.Link as={NavLink} to="/">
                Sign Up
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default mainNav
