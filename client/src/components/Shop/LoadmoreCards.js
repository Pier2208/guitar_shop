import React from 'react'
import styled from 'styled-components'

import CardBlockShop from '../utils/CardBlockShop'
import { LoadMoreButton } from '../../styles/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//react reveal
import Spin from 'react-reveal/Spin'

//styled components
const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`

const LoadmoreCards = props => {
  return (
    <Container>
      <CardBlockShop
        grid={props.grid}
        list={props.list}
      />
      <Spin>
        <LoadMoreButton onClick={() => props.loadmore()}>
          {
            props.list ?
              <FontAwesomeIcon icon="plus" />
              : <FontAwesomeIcon icon="sync-alt" />
          }
        </LoadMoreButton>
      </Spin>
    </Container>
  )
}

export default LoadmoreCards
