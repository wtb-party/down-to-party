import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './app'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'

// establishes socket connection
import './socket'

const stripePromise = loadStripe(
  'pk_test_51IxykBCnx9PLZ3cbvYBfkFz0PyBP9Ygrw18QAhB1kIfsGvey9xp8xrHRPq63PgrlX3OdHYYpL4bssmwPn2eHYteF00e9TS8Dvl'
)

ReactDOM.render(
  <Elements stripe={stripePromise}>
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </Elements>,
  document.getElementById('app')
)
