import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchProvider} from '../../store/providers'
import ProviderProfile from './provider-profile'
import Container from 'react-bootstrap/Container'

export default function Provider({match}) {
  const dispatch = useDispatch()
  const provider = useSelector(state => state.providers.provider)
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(fetchProvider(match.params.providerId))
  }, [])

  const isAuthenticatedProvider = () => {
    return provider.profile.id === user.id
  }

  return (
    <Container>
      {provider ? (
        provider.profile && provider.profile.id ? (
          <ProviderProfile
            provider={provider}
            isAuthenticatedProvider={isAuthenticatedProvider()}
          />
        ) : (
          <p>Not found</p>
        )
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  )
}
