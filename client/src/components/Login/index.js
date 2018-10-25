import React, { Component } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

import LoginForm from './LoginForm'
import { SocialButton } from '../../styles/Button'


const Wrapper = styled.div`
    max-width: 80rem;
    margin: 0 auto;
    margin-top: 5rem;
`

const BoxTitle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 7rem;
    word-spacing: .8rem;
    background: ${ props => props.theme.fontColorLight};
    border-top: 2px solid ${props => props.theme.primaryColorLight};
    margin-bottom: 1rem;

    h2 {
        color: #47524D;
        font-size: 3rem;
        font-weight: 300;
        margin: 0;
        text-transform: uppercase;
        padding-right: 2rem;
    }

    svg {
        font-size: 3rem;
    }
`

const FormContainer = styled.div`
    display: flex;
    flex-flow: column;
    align-items: center;
    padding: 2rem;
    width: 80%;
    margin: 0 auto;
    margin-bottom: 5rem;
`


class Login extends Component {
    render() {
        return (
            <Wrapper>
                <BoxTitle>
                    <h2>Login</h2>
                    <FontAwesomeIcon icon="user" />
                </BoxTitle>
                <FormContainer>
                    <LoginForm />
                </FormContainer>
                <BoxTitle>
                    <h2>Or continue with</h2>
                </BoxTitle>
                <FormContainer>
                    <SocialButton facebook>
                        <FontAwesomeIcon icon={['fab', 'facebook']} />
                        Facebook
                    </SocialButton>
                    <SocialButton google>
                        <FontAwesomeIcon icon={['fab', 'google']} />
                        Google
                    </SocialButton>
                    <p>No account yet? <Link to='/register'>Register</Link></p>
                </FormContainer>
            </Wrapper>
        )
    }
}

export default Login
