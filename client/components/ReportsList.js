import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'semantic-ui-react'

class ReportsList extends React.PureComponent {
  static propTypes = {
    stats: PropTypes.array.isRequired
  }

  render () {
    const { stats } = this.props

    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Week</Table.HeaderCell>
            <Table.HeaderCell>Average distance (Metres)</Table.HeaderCell>
            <Table.HeaderCell>Average Speed (Km/Hr)</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {
            stats.map(r =>
              <Table.Row key={r.week}>
                <Table.Cell>{r.week}</Table.Cell>
                <Table.Cell>{r.distance.toFixed(2)}</Table.Cell>
                <Table.Cell>{r.speed.toFixed(2)}</Table.Cell>
              </Table.Row>
            )
          }
        </Table.Body>
      </Table>
    )
  }
}

export default ReportsList
