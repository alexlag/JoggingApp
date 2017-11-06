import React from 'react'
import PropTypes from 'prop-types'
import { Table, Icon } from 'semantic-ui-react'

const RecordsList = ({ records }) =>
  <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Date</Table.HeaderCell>
        <Table.HeaderCell>Distance (Metres)</Table.HeaderCell>
        <Table.HeaderCell>Time</Table.HeaderCell>
        <Table.HeaderCell>Average Speed (Km/Hr)</Table.HeaderCell>
        <Table.HeaderCell>Edit</Table.HeaderCell>
        <Table.HeaderCell>Delete</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {
        records.map(r =>
          <Table.Row key={r._id}>
            <Table.Cell>{r.dateString}</Table.Cell>
            <Table.Cell>{r.distance}</Table.Cell>
            <Table.Cell>{r.timeString}</Table.Cell>
            <Table.Cell>{r.averageSpeed.toFixed(2)}</Table.Cell>
            <Table.Cell><Icon name='edit' /></Table.Cell>
            <Table.Cell><Icon name='trash' color='red' /></Table.Cell>
          </Table.Row>
        )
      }
    </Table.Body>
  </Table>

RecordsList.propTypes = {
  records: PropTypes.array.isRequired
}

export default RecordsList
