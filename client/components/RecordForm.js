import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Form } from 'semantic-ui-react'

import { stringToSeconds, secondsToString } from '../models/utils'

function extractStateFromProps ({ date, distance, time }) {
  return {
    // default HTML5 date input format
    date: moment(date).format('YYYY-MM-DD'),
    distance,
    time: secondsToString(time)
  }
}

class RecordForm extends React.PureComponent {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  }

  static defaultProps = {
    date: new Date(),
    distance: 0,
    time: 0
  }

  constructor (props) {
    super(props)

    this.state = extractStateFromProps(props)
  }

  componentWillReceiveProps (newProps) {
    this.setState(extractStateFromProps(newProps))
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  getData = () => {
    const { date, distance, time } = this.state

    return {
      date: new Date(date),
      distance,
      time: stringToSeconds(time)
    }
  }

  render () {
    const { date, distance, time } = this.state

    return (
      <Form size='small' onSubmit={this.props.onSubmit}>
        <Form.Input
          type='date'
          placeholder='Date'
          name='date'
          value={date}
          onChange={this.handleChange}
        />

        <Form.Input
          type='number'
          min={0}
          placeholder='Distance'
          name='distance'
          value={distance}
          onChange={this.handleChange}
        />

        <Form.Input
          type='text'
          placeholder='Time (HH:MM:SS)'
          name='time'
          value={time}
          onChange={this.handleChange}
        />
      </Form>
    )
  }
}

export default RecordForm
