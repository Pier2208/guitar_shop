import React from 'react'
import styled from 'styled-components'

import { CircularProgress } from '@material-ui/core'


//fixed menu
const TableMenu = ["Image", "Name", "Quantity", "Price"]

//styled components
const TableRow = styled.div`
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
    padding: .5rem 0;
    flex: ${({ name }) => name === "Image" || name === "Quantity" ? '15%' : name === "Name" ? '40%' : '25%'};
    color: ${({ theme }) => theme.primaryColorDark};
    text-transform: uppercase;
    font-weight: ${({ name }) => name === "Name" && 'bold'};

    div {
        width: 8rem;
        height: 8rem;
        background-position: center !important;
        background-size: cover !important;
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


const CartSummary = ({ products }) => {

    if (!products.cartSummary) {
        return (
            <LoaderContainer>
                <CircularProgress
                    style={{ color: '#EF8354' }}
                    thickness={5}
                />
            </LoaderContainer>
        )
    } else {
        return (
            <React.Fragment>
                <TableRow type="Head">
                    {
                        products.cartSummary ?
                            TableMenu.map(item =>
                                <TableCell key={item} name={item} type="Head">
                                    <h4>{item}</h4>
                                </TableCell>
                            )
                            : null
                    }
                </TableRow>

                {
                    products.cartSummary ?
                        products.cartSummary.map((product, i) =>
                            <TableRow key={i}>
                                <TableCell name="Image">
                                    <div style={{ background: `url(${product.images[0].url}) no-repeat` }} />
                                </TableCell>
                                <TableCell name="Name">{product.name}</TableCell>
                                <TableCell name="Quantity">{product.quantity}</TableCell>
                                <TableCell name="Price">$ {product.price.toFixed(2)}</TableCell>
                            </TableRow>
                        )
                        :
                        <EmptyCart><h3>You have no items in your shopping cart</h3></EmptyCart>
                }
            </React.Fragment>


        )
    }
}

export default CartSummary
