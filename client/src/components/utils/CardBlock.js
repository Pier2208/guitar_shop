import React from 'react'
import styled from 'styled-components'

//Material UI library
import { CircularProgress } from '@material-ui/core'

//component
import Card from './Card'

//styled components
const MainContainer = styled.div`
    width: 100%;
    margin: 8rem 0;
`
const StyledTitle = styled.div`
    width: 40%;
    height: auto;
    margin: 3rem auto;

    h2 {
        text-transform: uppercase;
        text-align: center;
        color: ${props => props.theme.primaryColorDark};
        font-family: 'Permanent Marker';
        font-size: 4rem
        margin: 1rem;
    }
`

const CardContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 3rem auto;
`


const CardBlock = props => {

    console.log('cardblock', props)

    const renderCards = () => (
        props.list ?
            props.list.map((card, i) => (
                <Card key={i} {...card} />
            ))
            : <CircularProgress
                style={{ color: '#EF8354' }}
                thickness={5}
            />
    )

    return (
        <MainContainer>
            <StyledTitle>
                {props.title ? <h2>{props.title}</h2> : null}
            </StyledTitle>
            <CardContainer>
                {renderCards()}
            </CardContainer>
        </MainContainer>
    )
}

export default CardBlock
