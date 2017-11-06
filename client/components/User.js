import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Menu, Form, Input } from 'semantic-ui-react'

import { initToken } from '../ducks/token'
import { signin, signout } from '../ducks/auth'

class Login extends React.PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    const { email, password } = this.state

    this.props.onSubmit(email, password)
  }

  render () {
    const { email, password } = this.state

    return (
      <Form size='small' onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Field inline>
            <Input type='text' placeholder='email' name='email' value={email} onChange={this.handleChange} />
          </Form.Field>
          <Form.Field inline>
            <Input type='password' placeholder='password' name='password' value={password} onChange={this.handleChange} />
          </Form.Field>
          <Form.Button content='Login' />
        </Form.Group>
      </Form>
    )
  }
}

function Logout ({ onSubmit }) {
  return (
    <Form size='small' onSubmit={onSubmit}>
      <Form.Group>
        <Form.Button content='Logout' />
      </Form.Group>
    </Form>
  )
}

class User extends React.PureComponent {
  componentDidMount () {
    this.props.initToken()
  }

  render () {
    return (
      <Menu.Item>
        {
          this.props.hasToken
            ? <Logout onSubmit={this.props.signout} />
            : <Login onSubmit={this.props.signin} />
        }
      </Menu.Item>
    )
  }
}

User.propTypes = {
  hasToken: PropTypes.bool.isRequired,
  initToken: PropTypes.func.isRequired,
  signin: PropTypes.func.isRequired,
  signout: PropTypes.func.isRequired
}

function mapState ({ token }) {
  return { hasToken: !!token }
}

const mapDispatch = {
  initToken, signin, signout
}

export default connect(mapState, mapDispatch)(User)
