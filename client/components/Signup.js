import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Form } from 'semantic-ui-react'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: auto;

  form {
    display: flex;
    flex-direction: column;
    width: 50%;

    button {
      width: 100%;
    }
  }
`

class Signup extends React.PureComponent {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => this.props.onSubmit(this.state)

  render () {
    const { name, surname, email, password, passwordConfirm } = this.state

    return (
      <Wrapper>
        <h3>Create an account</h3>

        <Form size='small' onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Input
              type='text'
              placeholder='First name'
              name='name'
              value={name}
              onChange={this.handleChange}
              width={8}
            />
            <Form.Input
              type='text'
              placeholder='Surname'
              name='surname'
              value={surname}
              onChange={this.handleChange}
              width={8}
            />
          </Form.Group>

          <Form.Input
            type='email'
            placeholder='Email'
            name='email'
            value={email}
            onChange={this.handleChange}
          />

          <Form.Input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={this.handleChange}
          />

          <Form.Input
            type='password'
            placeholder='Repeat password'
            name='passwordConfirm'
            value={passwordConfirm}
            onChange={this.handleChange}
          />

          <Form.Button content='Signup' />
        </Form>
      </Wrapper>
    )
  }
}

export default Signup
