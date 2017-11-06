import React from 'react'
import PropTypes from 'prop-types'
import { Table, Button, Icon, Confirm } from 'semantic-ui-react'

class RecordsList extends React.PureComponent {
  static propTypes = {
    records: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)

    this.state = {
      deleteConfirmation: false
    }
  }

  handleDeleteOpen = () => {
    this.setState({ deleteConfirmation: true })
  }

  handleDelteConfirm = id => () => {
    this.props.onDelete(id)
    this.setState({ deleteConfirmation: false })
  }

  handleDeleteCancel = () => {
    this.setState({ deleteConfirmation: false })
  }

  render () {
    const { records } = this.props

    return (
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
                <Table.Cell>
                  <Button icon>
                    <Icon name='edit' />
                  </Button>
                </Table.Cell>
                <Table.Cell>
                  <Button icon color='red' onClick={this.handleDeleteOpen} >
                    <Icon name='trash' />
                  </Button>
                  <Confirm
                    open={this.state.deleteConfirmation}
                    onConfirm={this.handleDelteConfirm(r._id)}
                    onCancel={this.handleDeleteCancel}
                  />
                </Table.Cell>
              </Table.Row>
            )
          }
        </Table.Body>
      </Table>
    )
  }
}

export default RecordsList
