import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'

import * as recordsActions from '../ducks/records'
import RecordsList from './RecordsList'
import AddRecord from './AddRecord'

class RecordsPage extends React.Component {
  static propTypes = {
    records: PropTypes.array.isRequired,
    sort: PropTypes.number.isRequired,
    toggleSort: PropTypes.func.isRequired,
    fetchRecords: PropTypes.func.isRequired,
    addRecord: PropTypes.func.isRequired,
    editRecord: PropTypes.func.isRequired,
    deleteRecord: PropTypes.func.isRequired
  }

  componentDidMount () {
    this.props.fetchRecords()
  }

  render () {
    const { records, sort, deleteRecord, addRecord, editRecord, toggleSort } = this.props

    return (
      <Grid divided='vertically'>
        <Grid.Row columns={2}>
          <Grid.Column width={12}>
            <RecordsList
              records={records}
              sort={sort}
              onDelete={deleteRecord}
              onEdit={editRecord}
              onToggle={toggleSort}
            />
          </Grid.Column>
          <Grid.Column width={4}>
            <AddRecord onAdd={addRecord} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

function mapState ({ records }) {
  const { all, sort } = records

  return {
    sort,
    records: all.sort((a, b) => sort * (a.date - b.date))
  }
}

const mapDispatch = recordsActions

export default connect(mapState, mapDispatch)(RecordsPage)
