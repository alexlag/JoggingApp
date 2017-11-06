import React from 'react'
import PropTypes from 'prop-types'
import { Segment, Icon, Button, Modal } from 'semantic-ui-react'
import styled from 'styled-components'

import RecordForm from './RecordForm'

const Wrapper = styled(Segment)`
  display: flex;
  flex-direction: column;
  align-items: center;

  i {
    transition: all .2s ease-in-out;
    cursor: pointer;
  }

  &:hover i {
    transform: scale(1.1)
  }
`

class AddRecord extends React.PureComponent {
  static propTypes = {
    onAdd: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)

    this.state = {
      modalOpen: false
    }
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  handleSubmit = () => {
    try {
      this.props.onAdd(this.form.getData())

      this.setState({ modalOpen: false })
    } catch (e) {
      console.log(e)
    }
  }

  render () {
    return (
      <Wrapper>
        <h3>Add new record</h3>

        <Modal
          size='tiny'
          trigger={<Icon name='plus' size='huge' onClick={this.handleOpen} />}
          open={this.state.modalOpen}
          onClose={this.handleClose}
        >
          <Modal.Header>Add Record</Modal.Header>
          <Modal.Content>
            <RecordForm ref={ref => { this.form = ref }} onSubmit={this.handleSubmit} />
          </Modal.Content>
          <Modal.Actions>
            <Button color='green' onClick={this.handleSubmit}>
              Add
            </Button>
          </Modal.Actions>
        </Modal>
      </Wrapper>
    )
  }
}

export default AddRecord
