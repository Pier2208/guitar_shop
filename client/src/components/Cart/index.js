import React, { Component } from 'react'
import { connect } from 'react-redux'
import DashboardLayout from '../UI/HOC/DashboardLayout'
import styled from 'styled-components'

//action creator
import { getCartItems } from '../../actions/userActions'

//components
import CartSummary from './CartSummary'
import Total from './Total'

//styled components
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


class Cart extends Component {

  state = {
    total: 0,
    showSucess: false
  }

  async componentDidMount() {
    //get an array of product Ids from cart to fetch products via query string
    let productIds

    if (this.props.user && this.props.user.cart) {
      productIds = this.props.user.cart.reduce((accumulator, currentValue) => {
        accumulator.push(currentValue._id)
        return accumulator
      }, [])

      //2 args: array of productIds to do query string, array of products that hold the quantity
      await this.props.getCartItems(productIds, this.props.user.cart)

      //calculate total
      if (this.props.user.cartSummary.length > 0) {
        this.calculateTotal(this.props.user.cartSummary)
      }
    }
  }

  calculateTotal = cart => {
    let total = cart.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.price * currentValue.quantity
    }, 0)
    this.setState({ total })
  }


  render() {
    return (
      <DashboardLayout>
        <CartSummary
          calculateTotal={(cart) => this.calculateTotal(cart)}
          products={this.props.user} />
        {
          this.props.user.cart.length > 0 ?
            <Total total={this.state.total} />
            :
            <EmptyCart />
        }
      </DashboardLayout>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.userInfo
})

export default connect(mapStateToProps, { getCartItems })(Cart)
