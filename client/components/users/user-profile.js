import React from 'react'
import UserForm from './user-form'
import {connect} from 'react-redux'

export const UserProfile = props => {
  const {userId, email, userLocation} = props

  return (
    <>
      <div>hello UserProfile</div>
      <UserForm userId={userId} userLocation={userLocation} email={email} />
    </>
  )
}

const mapState = state => {
  return {
    userId: state.user.id,
    email: state.user.email,
    userLocation: state.user.location
  }
}

export default connect(mapState)(UserProfile)
