import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

const mainNav = ({handleClick, isLoggedIn, userId}) => (
  <Navbar bg="light" expand="lg">
    <Navbar.Brand as={Link} to="/home">
      Huddle
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        {isLoggedIn ? (
          <>
            <Nav.Link as={Link} to="/home">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/providers">
              Providers
            </Nav.Link>
            <Nav.Link as={Link} to="/listings">
              Listings
            </Nav.Link>
            <Nav.Link as={Link} to={`/users/${userId}/profile`}>
              Profile
            </Nav.Link>
            <Nav.Link href="/auth/auth0/logout" onClick={handleClick}>
              Logout
            </Nav.Link>
          </>
        ) : (
          <>
            <Nav.Link as={Link} to="/">
              Login
            </Nav.Link>
            <Nav.Link as={Link} to="/">
              Sign Up
            </Nav.Link>
          </>
        )}
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    userId: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(mainNav)

mainNav.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
