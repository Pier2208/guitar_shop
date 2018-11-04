import React from 'react'
import styled from 'styled-components'


const StyledLogo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: auto;
    
    h1 {
        font-family: 'Permanent Marker';
        font-weight: 300;
        color: ${ props => props.theme.fontColorLight };
        margin: 0;
    }
    span {
        font-size: 5rem;
    }
`

const Logo = () => {
    return (
        <StyledLogo>
            <h1>
                <span>T</span>he  
                <span>G</span>uitar 
                <span>S</span>hop
            </h1>
        </StyledLogo>
    )
}

export default Logo
