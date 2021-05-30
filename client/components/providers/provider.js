import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchProvider} from '../../store/providers'
import Container from 'react-bootstrap/Container'

export default function Provider({match}) {
  const dispatch = useDispatch()
  const provider = useSelector(state => state.providers)
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(fetchProvider(match.params.providerId))
  }, [])

  const isAuthenticatedUser = () => {
    return provider.profile.id === user.id
  }

  return (
    <Container>
      {provider ? (
        provider.profile && provider.profile.id ? (
          isAuthenticatedUser() ? (
            <p>Authenticated User {provider.profile.firstName}</p>
          ) : (
            <p>Different User {provider.profile.firstName}</p>
          )
        ) : (
          <p>Not found</p>
        )
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  )
}
