import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { signup } from '../ducks/auth'

import Signup from './Signup'

const Wrapper = styled.div`
  padding-top: 7em;
  overflow: auto;
`

const Workspace = ({ hasToken, signup }) =>
  <Wrapper>
    {
      hasToken
        ? null
        : <Signup onSubmit={signup} />
    }
  </Wrapper>

Workspace.propTypes = {
  hasToken: PropTypes.bool.isRequired,
  signup: PropTypes.func.isRequired
}

function mapState ({ token }) {
  return { hasToken: !!token }
}

const mapDispatch = {
  signup
}

export default connect(mapState, mapDispatch)(Workspace)
