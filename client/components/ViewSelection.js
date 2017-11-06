import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Menu } from 'semantic-ui-react'

import * as pageActions from '../ducks/page'

function Page ({ page }) {
  switch (page) {
    case 'records':
    case 'reports':
    default:
      return null
  }
}

function ViewSelection ({ page, goToRecords, goToReports }) {
  return [
    <Menu key='tab' tabular>
      <Menu.Item name='records' active={page === 'records'} onClick={goToRecords} />
      <Menu.Item name='reports' active={page === 'reports'} onClick={goToReports} />
    </Menu>,
    <Page key='page' page={page} />
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
