import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Link } from 'react-router-dom'


//styled components
const StyledHeader = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 8rem;
    color: ${props => props.theme.primaryColorLight};
    border-bottom: 2px solid ${props => props.theme.primaryColorLight};
    margin-top: 3rem;
    h1 {
        margin: 0;
    }
`
const Container = styled.div`
    display: flex;
    margin-top: 2rem;
`
const StyledMenu = styled.div`
    display: flex;
    flex-direction: column;
    flex-basis: 25%;
`

const StyledBoxMenu = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 6rem;
    background-color: ${props => props.theme.fontColorLight};
    border-left: 0.8rem solid ${props => props.theme.accentColor};
    color: ${props => props.theme.primaryColorDark};
    text-transform: uppercase;
    font-size: 1.8rem;
    font-weight: 700;
    padding: 2rem 3rem;
    margin-bottom: 5px;
`

const StyledView = styled.div`
    flex: 1;
    height: 100vh;
    padding: 0 3rem;
`

//links
const links = [
    {
        name: 'My account',
        linkTo: '/user/dashboard'
    },
    {
        name: 'My Info',
        linkTo: '/user/user_profile'
    },
    {
        name: 'My cart',
        linkTo: '/user/cart'
    }
]

const adminLinks = [
    {
        name: 'Site Info',
        linkTo: '/admin/site_info'
    },
    {
        name: "Add Products",
        linkTo: '/admin/add_product'
    },
    {
        name: "Manage Categories",
        linkTo: '/admin/manage_categories'
    }
]



const DashboardLayout = props => {

    const renderLinks = (links) => (
        links.map((link, i) => (
            <Link to={link.linkTo} key={i}>
                <StyledBoxMenu>
                    {link.name}
                </StyledBoxMenu>
            </Link>
        ))
    )

    return (
        <Fragment>
            <StyledHeader>
                <h1>Hello {props.user.firstname ? props.user.firstname : null}!</h1>
            </StyledHeader>
            <Container>
                <StyledMenu>
                    {renderLinks(links)}
                    {
                        props.user.role === 'default' ?
                            renderLinks(adminLinks)
                        : null
                    }
                </StyledMenu> 
                <StyledView>
                    {props.children}
                </StyledView>
            </Container>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    user: state.user.userInfo
})

export default connect(mapStateToProps)(DashboardLayout)
