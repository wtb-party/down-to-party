import React from 'react'
import {updateUser} from '../../store/user'
import {fetchAllSkills} from '../../store/skill'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import SkillsSelect from '../skills/skills-select'

class UserForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: this.props.email,
      location: this.props.userLocation ? this.props.userLocation : '',
      skillSelection: 0
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSelection = this.handleSelection.bind(this)
  }

  componentDidMount() {
    this.props.fetchAllSkills()
  }

  handleSubmit(evt) {
    evt.preventDefault()
    this.props.updateUserStore({...this.state}, this.props.userId)
    this.props.history.push('/home')
  }

  handleChange(evt) {
    evt.preventDefault()
    this.setState({[evt.target.id]: evt.target.value})
  }

  handleSelection(evt) {
    this.setState({skillSelection: evt.target.value})
  }

  render() {
    const {skills} = this.props
    const {location} = this.state
    return (
      <Container>
        <Form onSubmit={this.handleSubmit} className="auth-form w-50 p-3">
          <Form.Group controlId="location">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              placeholder={location ? location : 'Chicago'}
              onChange={this.handleChange}
              value={this.state.location}
            />
          </Form.Group>
          <SkillsSelect
            skills={skills}
            handleSelection={this.handleSelection}
          />
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
