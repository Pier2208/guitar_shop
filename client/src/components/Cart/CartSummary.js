import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'
import { CircularProgress } from '@material-ui/core'
import CustomTooltip from '../utils/CustomTooltip'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import _ from 'lodash'


//import action creator
import { removeItemFromCart, updateQuantity } from '../../actions/userActions'

//fixed menu
const TableMenu = ["Image", "Name", "Quantity", "Price"]


//styled components
const TableRow = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    height: auto;
    background-color: ${({ type, theme }) => type === "Head" ? theme.primaryColorDark : '#ffffff'};
    padding: ${({ type }) => type === "Head" ? 0 : '.8rem 0'};
    border-bottom: ${({ type }) => type === "Head" ? 'none' : '1px solid #F7F7F2'};
`

const TableCell = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    border-right: 1px solid white;
    padding: .3rem 0;
    flex: ${({ name }) => name === "Image" || name === "Quantity" ? '15%' : name === "Name" ? '40%' : '25%'};
    color: ${({ theme }) => theme.primaryColorDark};
    text-transform: uppercase;
    font-weight: ${({ name }) => name === "Name" || name === 'Quantity' && 'bold'};

    div {
        width: 8rem;
        height: 8rem;
        background-position: center !important;
        background-size: cover !important;
    }

    span {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 2rem;
        background-color: ${({ theme }) => theme.primaryColorDark};
        color: white;
        border-radius: 50%;
        width: 3rem;
        height: 3rem;
    }

    h4 {
        color: white;
        margin: 0;
    }
`

const EmptyCart = styled.div`
    width: 100%;
    height: 20rem;
    display: flex;
    justify-content: center;
    align-items: center;

    h3 {
        color: ${({ theme }) => theme.primaryColorDark};
    }
`

const LoaderContainer = styled.div`
    width: 30%;
    height: 50vh;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Actions = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    
    svg {
        margin: .5rem 0 0 0;
        color: ${({ theme }) => theme.primaryColorLight};

        &:hover,
        &:active {
            color: ${({ theme }) => theme.primaryColorDark};
        }
    }
    
`
const Price = styled.div`
    display: flex; 
    justify-content: center;
    align-items: center;
    flex-basis: 80%;
`


const CartSummary = ({ products, removeItemFromCart, updateQuantity, calculateTotal }) => {


    const removeItemHandler = id => {
        removeItemFromCart(id, calculateTotal)
    }

    const updateQuantityHandler = _.throttle((id, num) => {
        updateQuantity(id, num, calculateTotal)
    }, 1000, { 'trailing': false })
    c

    return (
        <React.Fragment>
            <TableRow type="Head">
                {
                    products.cart && products.cart.length > 0 ?
                        TableMenu.map(item =>
                            <TableCell key={item} name={item} type="Head">
                                <h4>{item}</h4>
                            </TableCell>
                        )
                        : null
                }
            </TableRow>

            {
                products.cartSummary === undefined ? null :

                    products.cartSummary && products.cartSummary.length > 0 ?
                        products.cartSummary.map(product =>
                            <TableRow key={product._id}>
                                <TableCell name="Image">
                                    <div style={{ background: `url(${product.images[0].url}) no-repeat` }} />
                                </TableCell>
                                <TableCell name="Name">{product.name}</TableCell>
                                <TableCell
                                    style={{ display: 'flex', justifyContent: 'center' }}
                                    name="Quantity">
                                    {
                                        product.quantity <= 1 ?
                                            <FontAwesomeIcon
                                                style={{ fontSize: '1.4rem', color: '#deded9' }}
                                                icon="minus"
                                            />
                                            :
                                            <FontAwesomeIcon
                                                onClick={() => updateQuantityHandler(product._id, -1)}
                                                style={{ fontSize: '1.4rem' }}
                                                icon="minus"
                                            />
                                    }
                                    {product.quantity}
                                    <FontAwesomeIcon
                                        onClick={() => updateQuantityHandler(product._id, 1)}
                                        style={{ fontSize: '1.4rem' }}
                                        icon="plus"
                                    />
                                </TableCell>
                                <TableCell name="Price">
                                    <Price>$ {product.price.toFixed(2)}</Price>
                                    <Actions>
                                        <Link to={`/shop/product_detail/${product._id}`}>
                                            <CustomTooltip title="view" variant="light">
                                                <FontAwesomeIcon
                                                    icon="eye"
                                                />
                                            </CustomTooltip>
                                        </Link>

                                        <CustomTooltip title="remove" variant="light">
                                            <FontAwesomeIcon
                                                style={{ marginRight: '.25rem' }}
                                                onClick={() => removeItemHandler(product._id)}
                                                icon="trash-alt"
                                            />
                                        </CustomTooltip>
                                    </Actions>
                                </TableCell>
                            </TableRow>
                        )
                        :
                        <EmptyCart><h3>You have no items in your shopping cart</h3></EmptyCart>
            }
        </React.Fragment>
    )
}

export default connect(null, { removeItemFromCart, updateQuantity })(CartSummary)
