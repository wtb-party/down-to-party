import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import Container from 'react-bootstrap/Container'
const App = () => {
  return (
    <div>
      <Navbar />
      <Container className="app-container">
        <Routes />
      </Container>
    </div>
  )
}

export default App
