import React, { Fragment } from 'react'
import styled from 'styled-components'
import Slider from 'react-slick'

//styled components
const StyledSlide = styled.div`
    width: 100%;
    height: 95rem;
    background-position: top !important;
    background-size: cover !important;
`

const StyledTagline = styled.div`
    position: relative;
    z-index: 10;
    top: 75%;
    left: 50%;
    width: fit-content;
    height: auto;
    padding: 0;
    margin:0;
    background: rgba(0, 0, 0, 0.4);
`
const StyledTaglineMain = styled.h1`
    color: ${props => props.theme.accentColor};
    text-transform: uppercase;
    font-family: 'Lobster';
    font-size: 6rem;
    margin: 0;
`

const SyledTaglineSecondary = styled.h2`
    color: ${props => props.theme.fontColorLight};
    font-size: 4rem;
    font-family: 'Lobster';
    margin: 0;
`


const HomeSlider = () => {

    const slides = [
        {
            img: '/images/featured/featured_home.jpg',
            lineOne: 'New Online Shop',
            lineTwo: 'Thousands of guitars in stock!',
            linkTitle: 'Shop now',
            linkTo: '/shop'
        },
        {
            img: '/images/featured/featured_home_2.jpg',
            lineOne: 'Fender',
            lineTwo: 'Custom Shop Now Available',
            linkTitle: 'Shop now',
            linkTo: '/shop'
        },
        {
            img: '/images/featured/featured_home_3.jpg',
            lineOne: 'New Online Shop',
            lineTwo: 'Thousands of guitars in stock',
            linkTitle: 'Shop now',
            linkTo: '/shop'
        }
    ]

    const settings = {
        dots: true,
        fade: true,
        autoplay: true,
        lazyLoad: true,
        slidePerRow: 1
    }

    const generateSlides = () => (
        slides ?
            slides.map((slide, i) => (
                <Fragment key={i}>
                    <StyledSlide style={{
                        background: `url(${slide.img}) no-repeat`
                    }}>
                        <StyledTagline>
                            <StyledTaglineMain>
                                {slide.lineOne}
                            </StyledTaglineMain>
                            <SyledTaglineSecondary>
                                {slide.lineTwo}
                            </SyledTaglineSecondary>
                        </StyledTagline>
                    </StyledSlide>
                </Fragment>
            ))
            : null
    )


    return (
        <Slider {...settings}>
            {generateSlides()}
        </Slider>
    )
}

export default HomeSlider
