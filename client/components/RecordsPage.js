import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Table, Icon } from 'semantic-ui-react'

import * as recordsActions from '../ducks/records'

import RecordsList from './RecordsList'

class RecordsPage extends React.Component {
  static propTypes = {
    records: PropTypes.array.isRequired,
    fetchRecords: PropTypes.func.isRequired
  }

  componentDidMount () {
    this.props.fetchRecords()
  }

  render () {
    const { records } = this.props

    return (
      <div>
        <RecordsList records={records} />
      </div>
    )
  }
}

function mapState ({ records }) {
  return { records }
}

const mapDispatch = recordsActions

export default connect(mapState, mapDispatch)(RecordsPage)
