import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
//import withRouter to be able to use history from inside action creator
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Logo from './Logo'
import { LogButton } from '../../styles/Button'

//import action creator
import { logoutUser } from '../../actions/userActions'



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

    handleLogout = () => {
        this.props.logoutUser(this.props.history)
    }
 
    render() {

        return (
            <StyledHeader>
                <Container>
                    <Logo />
                    {
                        !this.props.user ?
                            null
                            :
                            this.props.user.isAuth ?
                                <Fragment>
                                    <Wrapper>
                                        <LogButton
                                            onClick={() => this.handleLogout()}
                                        >Logout
                                        </LogButton>
                                    </Wrapper>
                                </Fragment>
                                :
                                <Fragment>
                                    <Wrapper>
                                        <Link to="/register">
                                            <LogButton>Register</LogButton>
                                        </Link>
                                    </Wrapper>
                                    <Wrapper>
                                        <Link to="/login">
                                            <LogButton>Login</LogButton>
                                        </Link>
                                    </Wrapper>
                                </Fragment>
                    }
                </Container>
            </StyledHeader>
        )
    }
}
const mapStateToProps = state => ({
    user: state.user.userInfo
})


export default connect(mapStateToProps, { logoutUser })(withRouter(Header))
