import React from 'react'
import { Menu } from 'semantic-ui-react'
import styled from 'styled-components'

import User from './User'

const Logo = styled.span`
  font-size: 1.2em;
  font-weight: bold;
`

const NavBar = () =>
  <Menu fixed='top'>
    <Menu.Item>
      <Logo>Jogging App</Logo>
    </Menu.Item>

    <Menu.Menu position='right'>
      <User />
    </Menu.Menu>
  </Menu>

export default NavBar
