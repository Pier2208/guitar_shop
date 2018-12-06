import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { ViewButton, AddToCartButton } from '../../styles/Button'

//react reveal
import Fade from 'react-reveal/Fade';

//styled components
const StyledCard = styled.div`
    flex: 0 1 28rem;
    height: 43rem;
    margin: 2rem;
    border: 2px solid ${props => props.theme.fontColorLight};
`

const CardImage = styled.div`
    width: 100%;
    height: 27rem;
    background-position: center !important;
    background-size: cover !important;
    border-bottom: 2px solid ${props => props.theme.fontColorLight};
    margin: O;
    padding: 0;
`

const CardContent = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
    background-color: #fff;

    h4 {
      margin: 1.5rem 0;
      color: ${props => props.theme.accentColor};
      font-size: 700;
      text-transform: capitalize;
      text-align:center;
    }

    span {
      text-align: center;
      text-transform: uppercase;
    }
`

const CardActions = styled.div`
    display: flex;
    justify-content: center;
    height: auto;  
    padding: 1.5rem;
`


class Card extends Component {

  renderCardImage = images => {
    if (images.length > 0) {
      console.log('images',images)
      return images[0].url
    } else {
      return '/images/image_not_available.png'
    }
  }


  render() {

    return (
      <StyledCard>
        <Fade>
        <CardImage
          style={{
            background: `url(${this.renderCardImage(this.props.images)}) no-repeat`,
          }}
        />
        <CardContent>
          <h4>{this.props.brand.name}</h4>
          <span>{this.props.name}</span>
          <span>${this.props.price}</span>
        </CardContent>
        <CardActions>
          <Link to={`/shop/product_detail/${this.props._id}`}>
            <ViewButton style={{marginRight: '2rem'}}>View Product</ViewButton>
          </Link>
          <AddToCartButton onClick={() => console.log(`${this.props.name} added to cart!`)}>
            <FontAwesomeIcon icon="shopping-bag" />
          </AddToCartButton>
        </CardActions>
        </Fade>
      </StyledCard>
    )
  }
}

export default Card