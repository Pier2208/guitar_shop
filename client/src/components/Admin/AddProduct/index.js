import React, { Component } from 'react'
import { connect } from 'react-redux'


//import Dashboard layout
import DashboardLayout from '../../UI/HOC/DashboardLayout'
//import Form
import AddProductForm from './AddProductForm'

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
            </DashboardLayout>
        )
    }
}

const mapStateToProps = state => ({
    products: state.products
})

export default connect(mapStateToProps, { getWoods, getBrands })(AddProduct)