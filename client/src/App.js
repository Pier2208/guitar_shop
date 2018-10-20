import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'

import { theme } from './styles/theme'

import Layout from './components/UI/HOC/Layout'
import Home from './components/Home'

library.add(fab)


const GlobalStyle = createGlobalStyle`

    @import url('https://fonts.googleapis.com/css?family=Permanent+Marker|Montserrat:300,400');
    
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
    }
`

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <Layout>
                <GlobalStyle />
                <Switch>
                    <Route exact path="/" component={Home} />
                </Switch>
            </Layout>
        </ThemeProvider>
    )
}

export default App
