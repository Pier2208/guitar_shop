import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import styled from 'styled-components'

//action creators
import { getProductDetail, clearProductDetail } from '../../actions/productActions'

//import components
import PageTop from '../utils/PageTop'
import ProductInfo from './ProductInfo'
import ProductImage from './ProductImage'


//styled components
const ProductPageContainer = styled.section`
    display: flex;
    height: 100vh;
    margin-top: 2rem;
`


class ProductDetail extends Component {

    componentDidMount() {
        //get the product id from the url
        let id = this.props.match.params.id

        //dispatch an action creator to fetch product
        this.props.getProductDetail(id)
    }

    componentWillUnmount() {
        //on leave page, clear productDetail
        this.props.clearProductDetail()
    }

    render() {
        return (
            <Fragment>
                <PageTop title="Product Detail" />
                <ProductPageContainer>
                    <ProductImage
                        product={this.props.products.productDetail} />
                    <ProductInfo
                        product={this.props.products.productDetail}
                    />
                </ProductPageContainer>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    products: state.products
})

export default connect(mapStateToProps, { getProductDetail, clearProductDetail })(ProductDetail)
