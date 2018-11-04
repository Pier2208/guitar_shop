import React from 'react'
import styled from 'styled-components'

//Material UI library
import { CircularProgress } from '@material-ui/core'

import Card from './Card'

//styled components
const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
`

const CardBlockShop = props => {

    const renderCards = () => (
        props.list ?
            props.list.map(card => (
                <Card key={card._id} {...card} grid={props.grid} />
            ))
            :
            <CircularProgress
                style={{ color: '#EF8354' }}
                thickness={5}
            />
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