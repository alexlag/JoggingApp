import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Button, Icon, Confirm } from 'semantic-ui-react'

import RecordForm from './RecordForm'

class RecordsList extends React.PureComponent {
  static propTypes = {
    records: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)

    this.state = {
      deleteConfirmation: false
    }

    this.form = {}
  }

  handleDeleteOpen = () => {
    this.setState({ deleteConfirmation: true })
  }

  handleDelteConfirm = id => () => {
    this.props.onDelete(id)
    this.handleDeleteCancel()
  }

  handleDeleteCancel = () => {
    this.setState({ deleteConfirmation: false })
  }

  handleEditOpen = id => () => this.setState({ [id]: true })

  handleEditClose = id => () => this.setState({ [id]: false })

  handleEditSubmit = id => () => {
    try {
      this.props.onEdit(id, this.form[id].getData())

      this.setState({ [id]: false })
    } catch (e) {
      console.log(e)
    }
  }

  editModal = ({ _id: id, date, distance, time }) =>
    <Modal
      size='tiny'
      trigger={<Button icon onClick={this.handleEditOpen(id)}><Icon name='edit' /></Button>}
      open={this.state[id]}
      onClose={this.handleEditClose(id)}
    >
      <Modal.Header>Edit Record</Modal.Header>
      <Modal.Content>
        <RecordForm
          date={date}
          distance={distance}
          time={time}
          ref={ref => { this.form[id] = ref }}
          onSubmit={this.handleEditSubmit(id)}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button color='green' onClick={this.handleEditSubmit(id)}>
          Edit
        </Button>
      </Modal.Actions>
    </Modal>

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
                  {this.editModal(r)}
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
