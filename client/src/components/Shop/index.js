import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import PageTop from '../utils/PageTop'
import CollapseCheckbox from '../utils/CollapseCheckbox'

//action creators
import { getBrands, getWoods } from '../../actions/productActions'

//import fixed categories (frets, prices)
import { frets } from '../utils/fixed_categories'

//components
const ShopContainer = styled.div`
    display: flex;
`
const StyledFilters = styled.div`
   flex-basis: 25%;
   height: 100vh;
`
const StyledView = styled.div`
    flex: 1;
    height: 100vh;
`


class Shop extends Component {

    state = {
        filters: {
            brand: [],
            frets: [],
            wood: [],
            price: []
        }
    }


    async componentDidMount() {
        await this.props.getBrands()
        await this.props.getWoods()
    }

    //pass data from child to parent
    updateFilters = (filters, category) => {
        const newFilters = {...this.state.filters}
        newFilters[category] = filters
        this.setState({
            filters: newFilters
        }, () => {
            console.log(this.state.filters)
        })
    }


    render() {

        return (
            <div>
                <PageTop title="Browse products" />
                <ShopContainer>
                    <StyledFilters>
                        <CollapseCheckbox 
                            initState={true}
                            title="Brands" 
                            list={this.props.products.brands}
                            updateFilters={filters => this.updateFilters(filters, 'brand')}
                        />

                        <CollapseCheckbox 
                            initState={false}
                            title="Frets" 
                            list={frets}
                            updateFilters={filters => this.updateFilters(filters, 'frets')}
                        />

                        <CollapseCheckbox 
                            initState={false}
                            title="Woods" 
                            list={this.props.products.woods}
                            updateFilters={filters => this.updateFilters(filters, 'wood')}
                        />
                    </StyledFilters>
                    <StyledView>
                        VIEW
                    </StyledView>
                </ShopContainer>

            </div>
        )
    }
}

const mapStateToProps = state => ({
    products: state.products
})


export default connect(mapStateToProps, { getBrands, getWoods })(Shop)
