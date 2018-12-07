import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from 'react-redux'

//import action creator
import { addToCart } from '../../actions/userActions'


const Container = styled.div`
    flex: 1;
    height: 100vh;
`

const StyledTitle = styled.h1`
    text-transform: uppercase;
    color: ${props => props.theme.primaryColorDark};
    background: ${props => props.theme.fontColorLight};
    width: fit-content;
    padding: 1rem 2rem;
`

const Tags = styled.div`
    display: flex;
`

const Tag = styled.div`
    display: flex;
    align-items: center;
    padding: 1.5rem;
`
const Icon = styled.div`
    font-size: 2.5rem;
    color: ${props => props.theme.primaryColorDark};
    margin-right: 2rem;

`

const TagPrice = styled.div`
    display: flex;
    align-items: center;
    padding: 0 1rem;
    width: fit-content;
    margin: 1rem 0;

    h3 {
        color: ${props => props.theme.accentColor};
        font-size: 3rem;
        margin: .5em 0;
    }
`

const IconText = styled.div`
`

const AddToCart = styled.div`
    display: flex;
    align-items: center;
    color: ${props => props.theme.primaryColorDark};
    border: 1px solid ${props => props.theme.primaryColorDark};
    border-radius: 1rem;
    padding: 1rem 2rem;
    text-transform: uppercase;
    font-weight: bold;
    width: fit-content;
    margin-top: 3rem;

    &:hover {
        cursor: pointer;
    }
`

const ActionBox = styled.div`
`


const ProductInfo = ({ product, addToCart }) => {

    const showProductTags = ({ shipping, available }) => (
        <Tags>
            <Tag>
                <Icon>
                    <FontAwesomeIcon icon="truck" />
                </Icon>
                {
                    shipping ?
                        <IconText>
                            <div>Free Shipping</div>
                            <div>And Return</div>
                        </IconText>
                        :
                        <IconText>
                            <div>Shipping not available for this product</div>
                        </IconText>
                }
            </Tag>

            <Tag>
                <Icon>
                    {
                        available ?
                            <FontAwesomeIcon icon="check" style={{ color: 'green' }} />
                            :
                            <FontAwesomeIcon icon="times" style={{ color: 'red' }} />
                    }

                </Icon>
                {
                    available ?
                        <IconText>
                            <div>Available</div>
                            <div>In Stock</div>
                        </IconText>
                        :
                        <IconText>
                            <div>Product currently not available</div>
                        </IconText>
                }
            </Tag>
        </Tags>
    )

    const showProductPrice = ({ price }) => (
        <Tags>
            <TagPrice>
                <Icon>
                    <FontAwesomeIcon icon="dollar-sign" />
                </Icon>
                <IconText>
                    {
                        price ?
                            <h3>{price.toFixed(2)}</h3>
                            : null
                    }
                </IconText>
            </TagPrice>
        </Tags>
    )

    const showProductDesc = ({ description }) => (
        <Tags>
            <Tag style={{ alignItems: 'flex-start' }}>
                <Icon>
                    <FontAwesomeIcon icon="info" />
                </Icon>
                {
                    description ?
                        <IconText>
                            <div>{description}</div>
                        </IconText>
                        :
                        <IconText>
                            <div>No info available</div>
                        </IconText>
                }
            </Tag>

        </Tags>

    )

    const showProductSpecs = ({ wood, frets }) => (
        <div>
        </div>
    )

    return (
        <Container>
            <StyledTitle>{product.name}</StyledTitle>
            {showProductDesc(product)}
            {showProductPrice(product)}
            {showProductTags(product)}
            <AddToCart
                onClick={() => addToCart(product._id)}
            >
                <Icon>
                    <FontAwesomeIcon icon="cart-plus" />
                </Icon>
                Add To Cart
            </AddToCart>
            {showProductSpecs(product)}
        </Container>
    )
}


export default connect(null, { addToCart })(ProductInfo)

