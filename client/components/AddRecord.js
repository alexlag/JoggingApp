import React from 'react'
import { Segment, Icon } from 'semantic-ui-react'
import styled from 'styled-components'

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

const AddRecord = () =>
  <Wrapper>
    <h3>Add new record</h3>

    <Icon name='plus' size='huge' />
  </Wrapper>

export default AddRecord
