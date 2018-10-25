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


class LoginForm extends Component {
    render() {
        return (
            <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                validationSchema={
                    Yup.object().shape({
                        email: Yup.string()
                            .email('Please enter a valid email')
                            .required('Email is required'),
                        password: Yup.string()
                            .min(8, 'Pasword must be at least 8 characters')
                            .required('Password is required')
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
                                <SubmitButton type="submit">Go!</SubmitButton>
                            </div>
                        </Form>
                    )
                }
            </Formik>

        )
    }
}

export default LoginForm
