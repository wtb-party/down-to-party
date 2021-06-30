import React, {useEffect} from 'react'
import Container from 'react-bootstrap/Container'
import {useDispatch, useSelector} from 'react-redux'
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

function Routes() {
  const dispatch = useDispatch()
  const userId = useSelector(state => state.user.user.id)
  const status = useSelector(state => state.user.status)

  useEffect(() => {
    if (status === 'idle') dispatch(fetchMe())
  }, [])

  return (
    <Switch>
      <Route path="/login" component={Login} />
      {!userId &&
        status === 'succeeded' && <Route path="/" component={Login} />}
      {userId && (
        <>
          <Navbar />
          <Container className="app-container">
            <Switch>
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
              <Route path="/home" component={UserHome} />
              <Route exact path="/users/:id/profile" component={UserProfile} />
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
    </Switch>
  )
}

export default withRouter(Routes)
