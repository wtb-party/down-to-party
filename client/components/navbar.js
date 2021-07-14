import React from 'react'
import Image from 'react-bootstrap/Image'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import {useDispatch, useSelector} from 'react-redux'
import {Link, NavLink} from 'react-router-dom'
import {logout} from '../store'

const mainNav = () => {
  const dispatch = useDispatch()
  const handleClick = () => dispatch(logout())
  const isLoggedIn = useSelector(state => !!state.user.user.id)
  const user = useSelector(state => state.user.user)

  return (
    <Navbar bg="light" expand="lg" id="nav" collapseOnSelect={true}>
      <Navbar.Brand as={NavLink} to="/home">
        Huddle
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {isLoggedIn ? (
            <>
              <Nav.Link
                as={NavLink}
                className="link"
                eventKey="home"
                to="/home"
              >
                Home
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                className="link"
                eventKey="providers"
                to="/providers"
              >
                Providers
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                className="link"
                eventKey="listings"
                to="/listings"
              >
                Listings
              </Nav.Link>
              <NavDropdown
                title={
                  <Image
                    src={user.photoURL}
                    className="nav-image"
                    roundedCircle
                  />
                }
                id="nav-dropdown"
                alignRight
              >
                <NavDropdown.Item
                  as={Link}
                  eventKey="profile"
                  to={`/users/${user.id}/profile`}
                >
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={handleClick}
                  href="/auth/auth0/logout"
                >
                  Sign out
                </NavDropdown.Item>
              </NavDropdown>
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
