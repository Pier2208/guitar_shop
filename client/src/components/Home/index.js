import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

//components
import HomeSlider from './HomeSlider'
import CardBlock from '../utils/CardBlock'


//action creators
import { getProductsByArrival, getProductsBySell } from '../../actions/productActions'


class Home extends Component {

    componentDidMount() {
       this.props.getProductsBySell()
       this.props.getProductsByArrival()
    }

   
    render() {

        return (
            <div>
                <HomeSlider />
                <CardBlock 
                    title="Best Selling Guitars"
                    list={this.props.products.productsBySell}
                />
                <CardBlock 
                    title="Last Arrivals"
                    list={this.props.products.productsByArrival}
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    products: state.products
})

export default connect(mapStateToProps, { getProductsByArrival, getProductsBySell })(Home)
