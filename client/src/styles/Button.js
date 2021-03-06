import styled from 'styled-components'

//LOGIN - REGISTER  BUTTONS
export const LogButton = styled.button`
  color: ${ props => props.theme.fontColorLight};
  background-color: transparent;
  padding: 0.8rem;
  margin-right: 0.8rem;
  outline: none;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
  transition: border .2s;

  :hover {
    border: 1px solid ${ props => props.theme.accentColor};
    cursor: pointer;
    }
`

//FORM GO! BUTTON

export const SubmitButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 8rem;
    height: 4rem;
    border-radius: 6px;
    background-color: #EF8354;
    color: ${props => props.theme.fontColorLight};
    font-size: '2rem';
    padding: 0;
    outline: none;
    border: none;
    text-transform: uppercase;
    transition: background-color 0.3s ease;

    :hover {
        background-color: #f08f65;
        cursor: pointer;
    }
    `

//SOCIAL BUTTONS

export const SocialButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25rem;
  padding: .6rem;
  color: ${props => props.amazon ? '#000' : '#fff'};
  font-size: 2rem;
  font-weight: 400;
  border-radius: 6px;
  margin-bottom: 1.1rem;
  background-color: ${props => props.facebook && '#484D8F'};
  background-color: ${props => props.google && '#CB4D36'};
  background-color: ${props => props.amazon && '#ff9900'};

  svg {
      font-size: 2.2rem;
      margin-right: 1rem;
      color: ${props => props.amazon && '#000'};
  }

  :hover {
      cursor: pointer;
  }
  `
// View button
export const ViewButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: .7rem;
    font-size: 1.3rem;
    font-weight: 400;
    color: ${props => props.theme.fontColorLight};
    margin-bottom: 1.1rem;
    background-color: ${props => props.theme.accentColorLight};
    border: 1px solid ${props => props.theme.accentColorLight};
    text-transform: uppercase;

    :hover {
        background-color: ${props => props.theme.accentColor};
        cursor: pointer;
    }
`

// add to cart button
export const AddToCartButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: .7rem;
    font-size: 1.3rem;
    font-weight: 400;
    color: ${props => props.theme.primaryColorLight};
    margin-bottom: 1.1rem;
    border: 1px solid ${props => props.theme.accentColorLight};
    
    svg {
        font-size: 1.7rem;
    }
    :hover {
        color: ${props => props.theme.primaryColorDark};
        cursor: pointer;
    }
`

// Load more button
export const LoadMoreButton = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  width: 7rem;
  height: 7rem;
  border-radius: 50%;
  padding: .6rem;
  font-size: 1.7rem;
  background: #fff;
  border: 2px solid ${props => props.theme.fontColorDark};

  svg {
      font-size: 4rem;
      color: ${props => props.theme.fontColorDark};
  }

  :hover {
      cursor: pointer;
  }
`