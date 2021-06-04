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
        <h4 className="auth-info-text">Enabling providers</h4>
        <h2 className="auth-info-text">
          <strong>For the best events</strong>
        </h2>
        <br />
        <h5 className="auth-info-text">Plan {'&'} enjoy in half the time</h5>
        <br />
      </div>
      <Button className="auth0Button" href="/auth/auth0">
        Log in
      </Button>
    </div>
  )
}

export const Login = connect(null, null)(AuthForm)
