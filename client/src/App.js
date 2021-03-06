import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'

//color styles
import { theme } from './styles/theme'

//components (public)
import Home from './components/Home'
import Layout from './components/UI/HOC/Layout'
import Login from './components/Login'
import Register from './components/Register'
import Shop from './components/Shop'
import ProductDetail from './components/ProductDetail'

//components (private)
import Dashboard from './components/Dashboard'
import AddProduct from './components/Admin/AddProduct'
import Cart from './components/Cart'


//withAuth HOC
import withAuth from './components/UI/HOC/withAuth'

//fontawsone library
library.add(fab, fas)


const GlobalStyle = createGlobalStyle`

    @import url('https://fonts.googleapis.com/css?family=Permanent+Marker|Montserrat:300,400|Courgette');
    
    html {
        box-sizing: border-box;
        font-size: 10px;
    }

    *,
    *:after,
    *:before {
        box-sizing: inherit;
    }

    body {
        margin: 0;
        padding: 0;
        font-size: 1.6rem;
        font-family: 'Montserrat', sans-serif;
    }
    a {
        text-decoration: none;
        color: ${props => props.theme.accentColor};
    }
`

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <Layout>
                <GlobalStyle />
                <Switch>
                    {/* from most to less specific  */}
                    {/* HOC withAuth: a fn that returns a customized class  */}
                    <Route exact path="/user/dashboard" component={withAuth(Dashboard, true)} />
                    <Route exact path="/user/cart" component={withAuth(Cart, true)} />
                    <Route exact path="/add_product" component={withAuth(AddProduct, true, true)} />

                    <Route exact path="/shop/product_detail/:id" component={withAuth(ProductDetail, null)} />
                    <Route exact path="/shop" component={withAuth(Shop, null)} />
                    <Route exact path="/register" component={withAuth(Register, false)} />
                    <Route exact path="/login" component={withAuth(Login, false)} />
                    <Route exact path="/" component={withAuth(Home, null)} />
                </Switch>
            </Layout>
        </ThemeProvider>
    )
}

export default App
