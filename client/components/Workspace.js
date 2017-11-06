import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import Signup from './Signup'

const Wrapper = styled.div`
  padding-top: 7em;
  overflow: auto;
`

const Workspace = ({ hasToken }) =>
  <Wrapper>
    {
      hasToken
        ? null
        : <Signup />
    }
  </Wrapper>

Workspace.propTypes = {
  hasToken: PropTypes.bool.isRequired
}

function mapState ({ token }) {
  return { hasToken: !!token }
}

export default connect(mapState)(Workspace)
