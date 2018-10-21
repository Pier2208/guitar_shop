import React, { Component } from 'react'
import styled from 'styled-components'
import { Formik } from 'formik'
import * as Yup from 'yup'

import { Input } from '../../styles/Input'
import { SubmitButton } from '../../styles/Button'


const Form = styled.form`
    display: flex;
    flex-flow: column;
    align-items: center;
    width: 100%;

    div:last-of-type button {
        margin-top: 2rem;
    }
`

const ErrorMessage = styled.div`
  width: 40rem;
  padding-top: .4rem;
  margin: 0;
  font-size: 1.2rem;
  color: #CB4D36;
`


class RegisterForm extends Component {
    render() {
        return (
            <Formik
                initialValues={{
                    firstname: '',
                    lastname: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                }}
                validationSchema={
                    Yup.object().shape({
                        firstname: Yup.string().max(50, 'Firstname cannot be longer than 50 characters').required('Firstname is required'),
                        lastname: Yup.string().max(50, 'Lastname cannot be longer than 50 characters').required('Lastname is required'),
                        email: Yup.string().email('Please enter a valid email').required('Email is required'),
                        password: Yup.string().min(8, 'Pasword must be at least 8 characters').required('Password is required'),
                        confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Password must match').required('Please confirm password')
                    })
                }
                onSubmit={values => console.log(values)}
            >

                {({
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
                                <Input
                                    type='text'
                                    name='firstname'
                                    placeholder='Firstname'
                                    value={values.firstname}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    border={touched.firstname && errors.firstname && '1px solid #CB4D36'}
                                />
                                {touched.firstname && errors.firstname && <ErrorMessage>{errors.firstname}</ErrorMessage>}
                            </div>

                            <div>
                                <Input
                                    type='text'
                                    name='lastname'
                                    placeholder='Lastname'
                                    value={values.lastname}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    border={touched.lastname && errors.lastname && '1px solid #CB4D36'}
                                />
                                {touched.lastname && errors.lastname && <ErrorMessage>{errors.lastname}</ErrorMessage>}
                            </div>

                            <div>
                                <Input
                                    type='email'
                                    name='email'
                                    placeholder='Email'
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    border={touched.email && errors.email && '1px solid #CB4D36'}
                                />
                                {touched.email && errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
                            </div>

                            <div>
                                <Input
                                    type='password'
                                    name='password'
                                    placeholder='Password'
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    border={touched.password && errors.password && '1px solid #CB4D36'}
                                />
                                {touched.password && errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
                            </div>

                            <div>
                                <Input
                                    type='password'
                                    name='confirmPassword'
                                    placeholder='Confirm password'
                                    value={values.confirmPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    border={touched.confirmPassword && errors.confirmPassword && '1px solid #CB4D36'}
                                />
                                {touched.confirmPassword && errors.confirmPassword && <ErrorMessage>{errors.confirmPassword}</ErrorMessage>}
                            </div>

                            <div>
                                <SubmitButton type="submit">Go!</SubmitButton>
                            </div>
                        </Form>
                    )
                }
            </Formik>

        )
    }
}

export default RegisterForm
