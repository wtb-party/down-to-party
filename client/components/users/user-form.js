import React from 'react'
import {updateUser} from '../../store/user'
import {fetchAllSkills} from '../../store/skill'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

class UserForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: this.props.email,
      location: this.props.userLocation ? this.props.userLocation : ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.fetchAllSkills()
  }

  handleSubmit(evt) {
    evt.preventDefault()
    this.props.updateUserStore({...this.state, userId: this.props.userId})
    this.props.history.push('/home')
  }

  handleChange(evt) {
    evt.preventDefault()
    this.setState({[evt.target.id]: evt.target.value})
  }

  render() {
    const {skills} = this.props
    const {location} = this.state
    console.log(this.state)
    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="location">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              placeholder={location ? location : 'Chicago'}
              onChange={this.handleChange}
              value={this.state.location}
            />
          </Form.Group>
          <Form.Group controlId="userSkills">
            <Form.Label>Skills</Form.Label>
            <Form.Control as="select" onChange={this.handleChange}>
              {skills && skills.length ? (
                skills.map(skill => (
                  <option key={skill.id}>{skill.title}</option>
                ))
              ) : (
                <option>loading</option>
              )}
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    )
  }
}

const mapState = state => {
  return {
    skills: state.skills
  }
}

const mapDispatch = dispatch => {
  return {
    updateUserStore: (user, userId) => dispatch(updateUser(user, userId)),
    fetchAllSkills: () => dispatch(fetchAllSkills())
  }
}

export default withRouter(connect(mapState, mapDispatch)(UserForm))
