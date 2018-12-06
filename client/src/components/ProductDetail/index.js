import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

//import action creator
import { getProductDetail, clearProductDetail } from '../../actions/productActions'

//import components
import PageTop from '../utils/PageTop'
import ProductInfo from './ProductInfo'
import ProductImage from './ProductImage'

//import CircularProgress from Material-UI
import { CircularProgress } from '@material-ui/core'

//styled components
const ProductPageContainer = styled.section`
    display: flex;
    height: 100vh;
    margin-top: 2rem;
`

const LoadingContainer = styled.div`
     display: flex;
     align-items: center;
     justify-content: center;
     height: 100vh;
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
                {
                      this.props.products && this.props.products.productDetail ?
                        <ProductPageContainer>
                            <ProductImage
                                product={this.props.products.productDetail} />
                            <ProductInfo
                                product={this.props.products.productDetail}
                            />
                        </ProductPageContainer>
                        :
                        <LoadingContainer>
                            <CircularProgress
                                style={{ color: '#EF8354' }}
                                thickness={5}
                            />
                        </LoadingContainer>   
                }
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    products: state.products
})

export default connect(mapStateToProps, { getProductDetail, clearProductDetail })(ProductDetail)
