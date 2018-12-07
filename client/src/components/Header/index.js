import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
//import withRouter to be able to use history from inside action creator
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Logo from './Logo'
import { LogButton } from '../../styles/Button'

//import action creator
import { logoutUser } from '../../actions/userActions'
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';



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

const CartCount = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: -.9rem;
    left: -1rem;
    background: ${props => props.theme.accentColor};
    color: white;
    border-radius: 50%;
    width: 2rem;
    height: 2rem;
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
                                        <Link to="/">
                                            <LogButton style={{ border: 'none' }}>Home</LogButton>
                                        </Link>
                                    </Wrapper>
                                    <Wrapper
                                        style={{ marginRight: '10rem' }}>
                                        <Link to="/shop">
                                            <LogButton style={{ border: 'none' }}>Online Shop</LogButton>
                                        </Link>
                                    </Wrapper>
                                    <Wrapper>
                                        <Link to="/user/cart">
                                            <LogButton style={{ position: 'relative' }}>
                                                {
                                                    this.props.user.cart.length > 0 ?
                                                        <CartCount>{this.props.user.cart.reduce((accumulator, currentValue) => accumulator + currentValue.quantity, 0)}</CartCount>
                                                        :
                                                        null
                                                }
                                                <FontAwesomeIcon
                                                    icon="shopping-cart"
                                                    style={{ marginRight: '1.5rem' }}
                                                />
                                                My Cart
                                            </LogButton>
                                        </Link>
                                    </Wrapper>
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
                                        <Link to="/">
                                            <LogButton style={{ border: 'none' }}>Home</LogButton>
                                        </Link>
                                    </Wrapper>
                                    <Wrapper
                                        style={{ marginRight: '10rem' }}>
                                        <Link to="/shop">
                                            <LogButton style={{ border: 'none' }}>Online Shop</LogButton>
                                        </Link>
                                    </Wrapper>
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
