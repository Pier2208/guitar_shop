import styled from 'styled-components'

//LOGIN - REGISTER  BUTTONS
export const LogButton = styled.button`
  color: ${ props => props.theme.fontColor};
  background-color: transparent;
  padding: 0.8rem;
  margin-right: 0.8rem;
  outline: none;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
  outline: none;
  transition: border .2s;

  :hover {
    border: 1px solid ${ props => props.theme.accentColor};
    cursor: pointer;
    }
`