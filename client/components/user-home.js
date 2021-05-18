import React from 'react'
import {Link} from 'react-router-dom'
import {getCurrentUser} from '../store/user'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

export class UserHome extends React.Component {
  componentDidMount() {
    this.props.getCurrentUser(this.props.userId)
  }

  render() {
    const {email, location, userId, skills} = this.props

    return (
      <Container>
        <div className="text-center" style={{marginBottom: 25}}>
          <h3>Welcome, {email}</h3>
        </div>
        <Row className="justify-content-sm-center">
          <Col xs={12} sm={6} md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Add to your list of growing skills!</Card.Title>
                <Card.Text>
                  Interested in offering your services for an Event? Be sure to
                  take advantage of our wide network to showcase your skills!
                </Card.Text>
                <Button as={Link} to={`/users/${userId}/profile`}>
                  Edit Your Profile
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Plan a new Event!</Card.Title>
                <Card.Text>
                  Find services from a wide range of providers to help get your
                  event off on the right foot!
                </Card.Text>
                <Button as={Link} to="/events/new">
                  Get Started
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapState = state => {
  return {
    userId: state.user.id,
    email: state.user.email,
    location: state.user.location,
    skills: state.user.skills
  }
}

const mapDispatch = dispatch => {
  return {
    getCurrentUser: id => dispatch(getCurrentUser(id))
  }
}

export default connect(mapState, mapDispatch)(UserHome)

UserHome.propTypes = {
  email: PropTypes.string
}
