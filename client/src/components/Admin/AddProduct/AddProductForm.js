import React, { Component } from 'react'
import styled from 'styled-components'


//Formik and validation library
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Input, Textarea, Select } from '../../../styles/Input';

//styled components
const Form = styled.form`
    display: flex;
    flex-flow: column;
    align-items: flex-start;
    width: 100%;
    padding: 0 10rem;

    div {
        margin-bottom: 1rem;
    }
`
const Label = styled.label`
    display: flex;
    flex-flow: column;
    
    span {
        width: fit-content;
        padding: 1rem;
        background-color: ${props => props.theme.primaryColorLight};
        color: ${props => props.theme.fontColorLight};
    }
`

const ErrorMessage = styled.div`
  width: 40rem;
  padding-top: .4rem;
  margin: 0;
  font-size: 1.2rem;
  color: #CB4D36;
`


class AddProductForm extends Component {
    render() {
        return (
            <Formik
                initialValues={{
                    name: '',
                    description: '',
                    price: '',
                    brand: '',
                    shipping: '',
                    available: '',
                    wood: '',
                    frets: '',
                    published: ''
                }}
                validationSchema={
                    Yup.object().shape({
                        name: Yup.string()
                            .max(50, 'Product name must be less than 50 characters')
                            .required('Product name is required'),
                        description: Yup.string()
                            .min(50, 'Description must be at least 50 characters')
                            .required('A description is required'),
                        price: Yup.number()
                            .positive('Negative numbers are not allowed')
                            .required('Product price is required'),
                        brand: Yup.string()
                            .required('Please select a brand'),
                        shipping: Yup.boolean()
                            .required('Please select shipping availability'),
                        available: Yup.boolean()
                            .required('Please select product availability'),
                        wood: Yup.string()
                            .required('Wood material is required'),
                        frets: Yup.number()
                            .required('Please select frets'),
                        published: Yup.boolean()
                            .required('Please specify if product can be published')
                    })
                }
                onSubmit={values => console.log(values)}
            >
                {
                    ({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleSubmit,
                        handleBlur,
                        isSubmitting
                    }) => (
                            <Form onSubmit={handleSubmit} noValidate>
                                <div>
                                    <Label>
                                        <span>Product Name</span>
                                        <Input
                                            type='text'
                                            name='name'
                                            placeholder="Enter a name"
                                            value={values.name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            border={touched.name && errors.name && '1px solid #CB4D36'}
                                        />
                                    </Label>
                                    {touched.name && errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
                                </div>

                                <div>
                                    <Label>
                                        <span>Product Description</span>
                                        <Textarea
                                            name='description'
                                            rows="5"
                                            placeholder='Add a description'
                                            value={values.description}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            border={touched.description && errors.description && '1px solid #CB4D36'}
                                        />
                                    </Label>
                                    {touched.description && errors.description && <ErrorMessage>{errors.description}</ErrorMessage>}
                                </div>

                                <div>
                                    <Label>
                                        <span>Price</span>
                                        <Input
                                            type='number'
                                            name='price'
                                            placeholder="Enter a price"
                                            value={values.price}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            border={touched.price && errors.price && '1px solid #CB4D36'}
                                        />
                                    </Label>
                                    {touched.price && errors.price && <ErrorMessage>{errors.price}</ErrorMessage>}
                                </div>

                                <div>
                                    <Label>
                                        <span>Product Brand</span>
                                        <Select
                                            name='brand'
                                            value={values.brand}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            border={touched.brand && errors.brand && '1px solid #CB4D36'}
                                        >
                                            <option value="" label="Select..." />
                                            {
                                                
                                            }
                                        </Select>
                                    </Label>
                                    {touched.brand && errors.brand && <ErrorMessage>{errors.brand}</ErrorMessage>}
                                </div>

                                <div>
                                    <Label>
                                        <span>Shipping</span>
                                        <Select
                                            name='shipping'
                                            value={values.shipping}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            border={touched.shipping && errors.shipping && '1px solid #CB4D36'}
                                        >
                                            <option value="" label="Select..." />
                                            <option value="true" label="Yes" />
                                            <option value="false" label="No" />
                                        </Select>
                                    </Label>
                                    {touched.shipping && errors.shipping && <ErrorMessage>{errors.shipping}</ErrorMessage>}
                                </div>

                                <div>
                                    <Label>
                                        <span>In Stock</span>
                                        <Select
                                            name='available'
                                            value={values.availabale}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            border={touched.available && errors.available && '1px solid #CB4D36'}
                                        >
                                            <option value="" label="Select..." />
                                            <option value="true" label="Yes" />
                                            <option value="false" label="No" />
                                        </Select>
                                    </Label>
                                    {touched.available && errors.available && <ErrorMessage>{errors.available}</ErrorMessage>}
                                </div>

                                <div>
                                    <Label>
                                        <span>Wood Material</span>
                                        <Select
                                            name='wood'
                                            value={values.wood}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            border={touched.wood && errors.wood && '1px solid #CB4D36'}
                                        >
                                            <option value="" label="Select..." />
                                            <option value="red" label="red" />
                                            <option value="blue" label="blue" />
                                            <option value="green" label="green" />
                                        </Select>
                                    </Label>
                                    {touched.wood && errors.wood && <ErrorMessage>{errors.wood}</ErrorMessage>}
                                </div>

                                <div>
                                    <Label>
                                        <span>Frets</span>
                                        <Select
                                            name='frets'
                                            value={values.frets}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            border={touched.frets && errors.frets && '1px solid #CB4D36'}
                                        >
                                            <option value="" label="Select..." />
                                            <option value="20" label="20" />
                                            <option value="21" label="21" />
                                            <option value="22" label="22" />
                                            <option value="23" label="23" />
                                        </Select>
                                    </Label>
                                    {touched.frets && errors.frets && <ErrorMessage>{errors.frets}</ErrorMessage>}
                                </div>

                                <div>
                                    <Label>
                                        <span>Published</span>
                                        <Select
                                            name='published'
                                            value={values.published}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            border={touched.published && errors.published && '1px solid #CB4D36'}
                                        >
                                            <option value="" label="Select..." />
                                            <option value="true" label="Yes" />
                                            <option value="false" label="No" />
                                        </Select>
                                    </Label>
                                    {touched.published && errors.published && <ErrorMessage>{errors.published}</ErrorMessage>}
                                </div>
                            </Form>
                        )
                }
            </Formik>
        )
    }
}

export default AddProductForm
