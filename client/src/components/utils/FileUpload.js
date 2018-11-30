import React, { Component, Fragment } from 'react'
import Dropzone from 'react-dropzone'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';

import CircularProgress from '@material-ui/core'


//styled components
const DropzoneContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    width: 40rem;
    height: auto;
    margin: 1rem 0;
    border: 1px dashed ${props => props.theme.primaryColorLight};
`
const DropzoneContent = styled.div`
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 1.5rem;

    svg {
        font-size: 5rem;
        color: ${props => props.theme.primaryColorDark};
    }

    h5 {
        margin: 0;
        color: ${props => props.theme.primaryColorLight};
    }
`

const ImagePreviewContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 44rem;
    height: auto;
    padding: 1rem 0;
`

const ImageBox = styled.div`
    width: 11rem;
    height: 11rem;

    div {
        width: 10rem;
        height: 10rem;
        background-size: cover !important;
    }
`


class FileUpload extends Component {

    state = {
        uploadedFiles: [],
        uploading: false
    }


    static getDerivedStateFromProps(props, state) {
        if (props.reset.addProduct) {
            if (props.reset.addProduct.success) {
                return state = {
                    uploadedFiles: []
                }
            }
        }
        return null
    }

    onDrop = async files => {
        //on drop file, start the uploading state
        this.setState({
            uploading: true
        })
        //create an empty FormData object
        let formData = new FormData()
        //config header
        const config = {
            header: {
                'content-type': 'multipart/form-data'
            }
        }
        //append file to formData
        formData.append('file', files[0])
        //POST request
        const response = await axios.post('/api/users/uploadimage', formData, config)
        console.log('response', response)
        this.setState({
            uploadedFiles: [
                ...this.state.uploadedFiles,
                response.data
            ]
        }, () => {
            let images = this.state.uploadedFiles.reduce((accumulator, currentValue) => {
                accumulator.push(currentValue.url)
                return accumulator
            }, [])
            this.props.updateFormikState(images)
        })
    }

    showUploadedImages = () => {
        return this.state.uploadedFiles.map(item => (
            <ImageBox key={item.public_id}>
                <div style={{
                    background: `no-repeat center url(${item.url})`
                }}>
                </div>
            </ImageBox>
        ))
    }




    render() {
        return (
            <Fragment>
                <DropzoneContainer>
                    <Dropzone
                        style={{ width: '100%', height: '100%', margin: '0' }}
                        onDrop={this.onDrop}
                        multiple={false}
                    >
                        <DropzoneContent>
                            <FontAwesomeIcon icon="cloud-upload-alt" />
                            <h5>Choose an image or drag it here</h5>
                        </DropzoneContent>
                    </Dropzone>
                </DropzoneContainer>

                {this.state.uploadedFiles.length === 0 ?
                    null :
                    <ImagePreviewContainer>
                        {this.showUploadedImages()}
                    </ImagePreviewContainer>}
            </Fragment>
        )
    }
}

export default FileUpload
