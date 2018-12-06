import React, { Component } from 'react'
import { connect } from 'react-redux'

//Material UI library
import { CircularProgress } from '@material-ui/core'

//import action creators
import { getCurrentUser } from '../../../actions/userActions'

//styled components
import styled from 'styled-components'

const LoaderContainer = styled.div`
    width: 30%;
    height: 50vh;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
`

//withAuth HOC is a function that takes 3 args:
// - a component
// - a boolean: is the route private?
// - a boolean: is the route an admin route (default-null)?
//and after doing some logic returns a new customized component

export default (WrappedComponent, isPrivateRoute, isAdminRoute = null) => {

    class Authorization extends Component {

        state = {
            loading: true
        }

        //http request --> authUser endpoint to get data about current user
        async componentDidMount() {
            //asynchronous task !!!
            await this.props.getCurrentUser()
            let user = this.props.user.userInfo
            console.log('user', user)

            //data is fetched, do not show spinner
            this.setState({ loading: false })

            //if user is not authenticated
            //and if route is private
            if (!user.isAuth) {
                if (isPrivateRoute) {
                    this.props.history.push('/login')
                }
                //if the user is authenticated
            } else {
                //and the route is an admin route and the user is not admin
                if (isAdminRoute && user.role !== "admin") {
                    this.props.history.push('/user/dashboard')
                } else {
                    //and the route is public
                    if (isPrivateRoute === false) {
                        this.props.history.push('/user/dashboard')
                    }
                }
            }
        }


        render() {
            //if loading is true (still fetching user data)
            //then display a spinner
            if (this.state.loading) {
                return (
                    <LoaderContainer>
                        <CircularProgress
                            style={{ color: '#EF8354' }}
                            thickness={5}
                        />
                    </LoaderContainer>
                )
            }
            //else returns the enhanced component
            //get all the props form the router
            //data from redux about the current user
            return (
                <WrappedComponent
                    {...this.props}
                    user={this.props.user}
                />
            )
        }
    }

    //access user data on state
    const mapStateToProps = state => ({
        user: state.user
    })

    //return the customized component
    return connect(mapStateToProps, { getCurrentUser })(Authorization)
}

