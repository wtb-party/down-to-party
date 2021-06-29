import PropTypes from 'prop-types'
import React, {Component} from 'react'
import Container from 'react-bootstrap/Container'
import {connect} from 'react-redux'
import {Redirect, Route, Switch, withRouter} from 'react-router-dom'
import {
  EventForm,
  Events,
  Listing,
  Listings,
  Login,
  Navbar,
  Provider,
  Providers,
  SingleEvent,
  UserForm,
  UserHome,
  UserProfile
} from './components'
import {fetchMe} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        {isLoggedIn && (
          <>
            <Navbar />
            <Container className="app-container">
              <Switch>
                {/* Routes placed here are only available after logging in */}
                <Route exact path="/">
                  <Redirect to="/home" />
                </Route>

                <Route path="/home" component={UserHome} />
                <Route
                  exact
                  path="/users/:id/profile"
                  component={UserProfile}
                />
                <Route path="/users/:id/profile/edit" component={UserForm} />
                <Route exact path="/providers" component={Providers} />
                <Route path="/providers/:providerId" component={Provider} />
                <Route exact path="/events" component={Events} />
                <Route path="/events/new" component={EventForm} />
                <Route path="/events/:id" component={SingleEvent} />
                <Route exact path="/listings" component={Listings} />
                <Route path="/listings/:listingId" component={Listing} />
              </Switch>
            </Container>
          </>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(fetchMe())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
