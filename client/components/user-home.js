import React from 'react'
import {Link} from 'react-router-dom'
import {getCurrentUser} from '../store/user'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

export class UserHome extends React.Component {
  componentDidMount() {
    this.props.getCurrentUser(this.props.userId)
  }

  render() {
    const {email, location, userId, skills} = this.props

    return (
      <div>
        <h3>Welcome, {email}</h3>
        {!location && (
          <>
            <p>
              hey {email}, we noticed you haven't finished setting up your
              account.
            </p>
            <Link to={`/users/${userId}/profile`}>
              please complete your profile
            </Link>
          </>
        )}
        <div>this section shows all your events</div>
        <div>this section is for creating events</div>
        {skills ? (
          skills.map(skill => <div key={skill.id}>{skill.title}</div>)
        ) : (
          <div>you haven't selected any skills</div>
        )}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
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

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
