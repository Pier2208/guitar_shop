import React from 'react'
import styled from 'styled-components'


const StyledPageTop = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 0 auto;
    height: 8rem;
    color: ${props => props.theme.primaryColorLight};
    border-bottom: 1px solid ${props => props.theme.primaryColorLight};
    h3{
        margin: 0;
    }
`

const PageTop = props => {
  return (
      <StyledPageTop>
          <h3>{props.title}</h3>
      </StyledPageTop>
  )
}

export default PageTop
