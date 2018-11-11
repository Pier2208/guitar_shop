import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'


//Formik and validation library
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Input, Textarea, Select } from '../../../styles/Input';
import { SubmitButton } from '../../../styles/Button'

//import action creator
import { addProduct, clearProduct } from '../../../actions/productActions'

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
                            .min(30, 'Description must be at least 50 characters')
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
                onSubmit={ async (values, {resetForm, setFieldError, setSubmitting}) => {
                    await this.props.addProduct(values, resetForm, setFieldError, setSubmitting)
                    setTimeout(() => {
                        this.props.clearProduct()
                    }, 5000)
                }}
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
                                                this.props.products.brands ?
                                                    this.props.products.brands.map(brand => {
                                                        return <option
                                                            key={brand._id}
                                                            value={brand._id}
                                                            label={brand.name}
                                                        />
                                                    })
                                                    : null
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
                                            {
                                                this.props.products.woods ?
                                                    this.props.products.woods.map(wood => {
                                                        return <option
                                                            key={wood._id}
                                                            value={wood._id}
                                                            label={wood.name}
                                                        />
                                                    })
                                                    : null
                                            }
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
                                            <option value="24" label="24" />
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

                                <div>
                                <SubmitButton 
                                    type="submit"
                                    disabled={isSubmitting}>Submit</SubmitButton>
                            </div>
                            </Form>
                        )
                }
            </Formik>
        )
    }
}

const mapStateToProps = state => ({
    products: state.products
})

export default connect(null, { addProduct, clearProduct })(AddProductForm)
