import React from 'react'
import styled from 'styled-components'

//styled components
const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
`

const TotalBox = styled.div`
    display: flex;
    flex-direction: column;
    flex-basis: 25%;
`
const TotalHead = styled.h3`
    color: ${props => props.theme.fontColorDark};
    background-color: ${props => props.theme.fontColorLight};
    width: 100%;
    text-transform: uppercase;
    margin: 0;
    padding: .5rem 0;
    text-align: center;
`

const TotalBody = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
`

const TotalNumber = styled.h2`
    color: ${props => props.theme.fontColorDark};
`



const Total = ({ total }) =>
    <Container>
        <TotalBox>
            <TotalHead>Total</TotalHead>
            <TotalBody>
                <TotalNumber>$ {total.toFixed(2)}</TotalNumber>
            </TotalBody>
        </TotalBox>
    </Container>


export default Total
