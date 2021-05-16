import React from 'react'
import {updateUser} from '../../store/user'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

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

  handleSubmit(evt) {
    evt.preventDefault()
    this.props.updateUserStore({...this.state, userId: this.props.userId})
    this.props.history.push('/home')
  }

  handleChange(evt) {
    evt.preventDefault()
    this.setState({[evt.target.name]: evt.target.value})
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="location">location</label>
            <input
              name="location"
              type="text"
              onChange={this.handleChange}
              value={this.state.location}
            />
          </div>
          <button type="submit">Update</button>
        </form>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    updateUserStore: (user, userId) => dispatch(updateUser(user, userId))
  }
}

export default withRouter(connect(null, mapDispatch)(UserForm))
