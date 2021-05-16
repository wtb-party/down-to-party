import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, location, userId} = props

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
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    userId: state.user.id,
    email: state.user.email,
    location: state.user.location
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
