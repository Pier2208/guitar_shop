import React, { Component } from 'react'
import styled from 'styled-components'

import Logo from './Logo'
import { LogButton } from '../../styles/Button'


const StyledHeader = styled.header`
    background-color: ${props => props.theme.primaryColorDark};
    height: 8rem;
`

const Container = styled.div`
    display: flex;
    width: 90%;
    height: 100%;
    margin: 0 auto;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`


class Header extends Component {
    render() {
        return (
            <StyledHeader>
                <Container>
                    <Logo />
                    <Wrapper>
                        <LogButton>Register</LogButton>
                    </Wrapper>
                    <Wrapper>
                        <LogButton>Login</LogButton>
                    </Wrapper>
                </Container>
            </StyledHeader>
        )
    }
}

export default Header
