import 'semantic-ui-css/semantic.css'

import React from 'react'
import styled from 'styled-components'

import NavBar from './components/NavBar'
import Workspace from './components/Workspace'

const Container = styled.div`
`

const App = () =>
  <Container>
    <NavBar />
    <Workspace />
  </Container>

export default App
