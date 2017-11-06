import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Container, Menu } from 'semantic-ui-react'

import * as pageActions from '../ducks/page'

import RecordsPage from './RecordsPage'

function Page ({ page }) {
  switch (page) {
    case 'records':
      return <RecordsPage />
    case 'reports':
    default:
      return null
  }
}

Page.propTypes = {
  page: PropTypes.string.isRequired
}

function ViewSelection ({ page, goToRecords, goToReports }) {
  return [
    <Menu key='tab' tabular>
      <Menu.Item name='records' active={page === 'records'} onClick={goToRecords} />
      <Menu.Item name='reports' active={page === 'reports'} onClick={goToReports} />
    </Menu>,
    <Container key='page'>
      <Page page={page} />
    </Container>
  ]
}

ViewSelection.propTypes = {
  page: PropTypes.string.isRequired,
  goToRecords: PropTypes.func.isRequired,
  goToReports: PropTypes.func.isRequired
}

function mapState ({ page }) {
  return { page }
}

const mapDispatch = pageActions

export default connect(mapState, mapDispatch)(ViewSelection)
