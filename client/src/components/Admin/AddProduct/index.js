import React, { Component } from 'react'
import { connect } from 'react-redux'


//import Dashboard layout
import DashboardLayout from '../../UI/HOC/DashboardLayout'
//import Form
import AddProductForm from './AddProductForm'
//import Snackbar
import CustomSnackbar from '../../utils/CustomSnackbar'

//import action creators
import { getWoods, getBrands } from '../../../actions/productActions'


class AddProduct extends Component {

    componentDidMount() {
        this.props.getWoods()
        this.props.getBrands()
    }


    render() {
        
        return (
            <DashboardLayout>
                <AddProductForm 
                    products={this.props.products}
                />
                {
                    this.props.products.addProduct ?
                    this.props.products.addProduct.success ?
                        <CustomSnackbar
                            initState={true} 
                            variant='success' 
                            message={`${this.props.products.addProduct.product.name} added successfully!`}
                        />
                        : null
                        : null
                    }
            </DashboardLayout>
        )
    }
}

const mapStateToProps = state => ({
    products: state.products
})

export default connect(mapStateToProps, { getWoods, getBrands })(AddProduct)