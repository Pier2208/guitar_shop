import React, { Component } from 'react'
import { connect } from 'react-redux'
import DashboardLayout from '../UI/HOC/DashboardLayout'

//action creator
import { getCartItems } from '../../actions/userActions'

//components
import CartSummary from './CartSummary'



class Cart extends Component {

  state = {
    total: 0,
    showTotal: false,
    showSucess: false
  }

  componentDidMount() {
    //get an array of product Ids from cart to fetch products via query string
    let productIds

    if (this.props.user && this.props.user.cart) {
      productIds = this.props.user.cart.reduce((accumulator, currentValue) => {
        accumulator.push(currentValue._id)
        return accumulator
      }, [])

      //2 args: array of productIds to do query string, array of products that hold the quantity
      this.props.getCartItems(productIds, this.props.user.cart)
    }
  }

  render() {
    return (
      <DashboardLayout>
          <CartSummary
              products={this.props.user} />
      </DashboardLayout>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.userInfo
})

export default connect(mapStateToProps, { getCartItems })(Cart)
