import React, { Component } from 'react'
import Lightbox from 'react-images'

class ImageLightBox extends Component {

    state = {
        lightboxIsOpen: true,
        currentImage: this.props.pos,
        images: []
    }

    static getDerivedStateFromProps(props, state) {
        if(props.images) {
            let images = []
            props.images.forEach(img => {
                images.push({src: `${img.url}`})
            })
            return { images }
        }
        return false
    }

    closeLightbox = () => {
        this.props.onClose()
    }

    gotoNext = () => {
        this.setState({
            currentImage: this.state.currentImage + 1
        })
    }

    gotoPrevious = () => {
        this.setState({
            currentImage: this.state.currentImage - 1
        })
    }


    render() {
        console.log('img lightbox', this.state.images)
        return (
            <Lightbox
                backdropClosesModal={true}
                currentImage={this.state.currentImage}
                images={this.state.images}
                isOpen={this.state.lightboxIsOpen}
                onClickPrev={() => this.gotoPrevious()}
                onClickNext={() => this.gotoNext()}
                onClose={() => this.closeLightbox()} />
        )
    }
}

export default ImageLightBox
