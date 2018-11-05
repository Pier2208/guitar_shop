import React from 'react'
import styled from 'styled-components'


import Card from './Card'

//styled components
const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    margin-bottom: 2rem;
`

const CardBlockShop = props => {

    const renderCards = () => (
        props.list ?
            props.list.map(card => (
                <Card key={card._id} {...card} grid={props.grid} />
            ))
            :
            null
    )

    return (
        <Container>
            {props.list ?
                props.list.length === 0 ?
                    <div>
                        No RESULT
                    </div>
                    : null
                : null
            }
            {renderCards(props.list)}
        </Container>
    )
}

export default CardBlockShop