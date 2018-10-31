import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import PageTop from '../utils/PageTop'
import CollapseCheckbox from '../utils/CollapseCheckbox'
import CollapseRadio from '../utils/CollapseRadio'

//action creators
import { getBrands, getWoods } from '../../actions/productActions'

//import fixed_categories
import { frets, prices } from '../utils/fixed_categories'


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
        //take a copy of the state
        const newFilters = {...this.state.filters}
        newFilters[category] = filters

        //if category===price
        if(category === "price") {
            //get the price range [0, 299] from the _id (filters)
            const priceRange = this.getPriceRange(filters)
            //update the filters
            newFilters[category] = priceRange
        }
        //update the state
        this.setState({
            filters: newFilters
        }, () => {
            console.log(this.state.filters)
        })
    }
  
    //a fn to get the range of prices associated to id from the prices fixed_categories
    getPriceRange = id => {
        let array = []
        //for each object in array prices
        for(let key in prices) {
            //if object in array prices with _id property === id
            //id from collapseRadio is a string, needs to convert it in number like in array prices
            if(prices[key]._id === parseInt(id, 10)) {
                //then match with the corresponding range of prices
                array = prices[key].range
            }
        }

        return array
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

                        <CollapseRadio
                            initState={true}
                            title="Prices"
                            list={prices}
                            updateFilters={filters => this.updateFilters(filters, 'price')}
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