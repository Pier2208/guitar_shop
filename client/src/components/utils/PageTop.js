import React from 'react'
import styled from 'styled-components'


const StyledPageTop = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 2rem;
    margin: 0 auto;
    height: 8rem;
    color: ${props => props.theme.primaryColorLight};
    border-bottom: 1px solid ${props => props.theme.primaryColorLight};
    h2 {
        margin: 0;
    }
`

const PageTop = props => {
  return (
      <StyledPageTop>
          <h2>{props.title}</h2>
      </StyledPageTop>
  )
}

export default PageTop
