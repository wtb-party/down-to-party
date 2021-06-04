import React from 'react'
import {connect} from 'react-redux'
import Button from 'react-bootstrap/Button'

const AuthForm = () => {
  return (
    <div className="bg">
      <div className="auth-heading">
        <h1 className="auth-text">Huddle</h1>
      </div>
      <div className="auth-info">
        <h2 className="auth-info-text">Enabling providers</h2>
        <h5 className="auth-info-text">For the best events</h5>
        <br />
      </div>
      <Button className="auth0Button" href="/auth/auth0">
        Login
      </Button>
    </div>
  )
}

export const Login = connect(null, null)(AuthForm)
