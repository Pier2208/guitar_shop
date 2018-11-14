import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';


//styled components
const DropzoneContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 2rem 0;
    width: fit-content;
    height: 22rem;
    margin-bottom: 5rem;
    border: 1px solid ${props => props.theme.fontColorLight};
`
const DropzoneContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 10rem;
    height: 10rem;

    svg {
        font-size: 6rem;
        color: ${props => props.theme.primaryColorDark};
    }
`


class FileUpload extends Component {

    state = {
        uploadedFiles: [],
        uploading: false
    }

    onDrop = (files) => {
        //on drop file, start uploading state
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
        axios.post('/api/users/uploadimage', formData, config)
            .then(response => {
                this.setState({
                    uploadedFiles: [
                        ...this.state.uploadedFiles,
                        response.data
                    ]
                }, () => console.log(this.state.uploadedFiles))
            })
    }

    render() {
        return (
            <section>
                <DropzoneContainer>
                    <Dropzone
                        onDrop={this.onDrop}
                        multiple={false}
                    >
                        <DropzoneContent>
                            <FontAwesomeIcon icon="cloud-upload-alt" />
                        </DropzoneContent>
                    </Dropzone>
                </DropzoneContainer>
            </section>
        )
    }
}

export default FileUpload
