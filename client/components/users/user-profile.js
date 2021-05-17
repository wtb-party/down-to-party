import React from 'react'
import UserForm from './user-form'
import {connect} from 'react-redux'

export const UserProfile = props => {

  const {userId, email, userLocation, skills} = props

  return (
    <>
      <div>Edit your profile:</div>
      <UserForm
        userId={userId}
        userLocation={userLocation}
        email={email}
        skills={skills}
      />
    </>
}

const mapState = state => {
  return {
    userId: state.user.id,
    email: state.user.email,
    userLocation: state.user.location,
    userSkills: state.user.skills
  }
}

export default connect(mapState)(UserProfile)
