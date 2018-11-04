import React from 'react'
import styled from 'styled-components'

import CardBlockShop from '../utils/CardBlockShop'

//styled components
const Container = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
`

const LoadmoreCards = props => {
  return (
    <Container>
      <CardBlockShop
          grid={props.grid}
          list={props.list} />
    </Container>
  )
}

export default LoadmoreCards
