import React from 'react'
import Header from '../../Header'
import styled from 'styled-components'

const Container = styled.div`
    max-width: 140rem;
    margin: 0 auto;
`

const Layout = props => {
    return (
        <main>
            <Header />
            <Container>
                {props.children}
            </Container>
        </main>
    )
}

export default Layout
