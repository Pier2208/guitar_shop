import React, { Component } from 'react'
import styled from 'styled-components'

//import components
import ImageLightBox from '../utils/ImageLightBox'


//styled components
const Container = styled.div`
    flex-basis: 40%;
    height: 100vh;
`
const ImageContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 95%;
    height: auto;
`
const Image = styled.div`
    display: block;
    width: 85%;
    height: 50rem;
    background-position: center !important;
    background-size: cover !important;
    background-repeat: no-repeat;

    &:hover {
        cursor: pointer;
    }
`
const ThumbnailsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 85%;
    justify-content: flex-start;
    margin-top: 1rem;
`
const Thumbnail = styled.div`
    width: 10rem;
    height: 10rem;
    border: 1px solid ${props => props.theme.primaryColorLight};
    background-position: center !important;
    background-size: cover !important;
    background-repeat: no-repeat;
    margin: .5rem .5rem 0 0;

    &:hover {
        cursor: pointer;
    }
`


class ProductImage extends Component {

    state = {
        lightBoxImages: [],
        isLightboxOpen: false,
        currentImage: 0
    }

    static getDerivedStateFromProps (props, state) {
        if(props.product && props.product.images) {
            return state = {
                lightBoxImages: props.product.images
            }
        }
        return null
    }

    componentDidMount() {
        if (this.props.product) {
            if (this.props.product.images) {
                this.setState({
                    lightBoxImages: this.props.product.images
                }, () => console.log(this.state.lightBoxImages))
            }
        }
    }

    renderMainImage = images => {
        if (images.length > 0) {
            return images[0].url
        }
        else {
            return `images/image_not_available.png`
        }
    }

    //make lightbox available only if there are images
    openLightBox = index => {
        if (this.state.lightBoxImages.length > 0) {
            this.setState({
                lightbox: true,
                currentImage: index
            })
        }
    }

    closeLightBox = () => {
        this.setState({
            lightbox: false
        })
    }

    showThumbs = () => (
        this.state.lightBoxImages.map((img, i) => (
            i > 0 ?
                <Thumbnail
                    key={i}
                    onClick={() => this.openLightBox(i)}
                    style={{ background: `url(${img.url})` }}
                />
                : null
        ))
    )

    render() {

        return (
            <Container>
                <ImageContainer>
                    <Image
                        onClick={() => this.openLightBox(0)}
                        style={{
                            background: `url(${this.renderMainImage(this.state.lightBoxImages)})`
                        }} />
                </ImageContainer>
                <ImageContainer>
                    <ThumbnailsContainer>
                        {this.showThumbs()}
                    </ThumbnailsContainer>
                </ImageContainer>

                {
                    this.state.lightbox ?
                        <ImageLightBox
                            id={this.props.product.id}
                            images={this.state.lightBoxImages}
                            open={this.state.isLightboxOpen}
                            pos={this.state.currentImage}
                            onClose={() => this.closeLightBox()}
                        />
                        : null
                }
            </Container>
        )
    }
}

export default ProductImage


