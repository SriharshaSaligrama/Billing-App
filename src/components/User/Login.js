import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { Button } from '@mui/material'
import { TextInput } from '../Form inputs/TextInput'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../redux/userSlice'

export const Login = props=> {
    const history=useHistory()
    const dispatch=useDispatch()
    const userLoggedIn=useSelector(state=>state.user.data)
    //console.log(userLoggedIn)
    const validate = Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email id required'),
        password: Yup.string()
            .required('Enter the password')
    })

    const handleCancel= ()=>{
        history.push('/')
    }

    return (
        <div>
            <h2>Login</h2>
            <Formik
                initialValues={{email: '', password: ''}}
                validationSchema={validate}
                onSubmit={(values)=>{
                    //console.log(values)
                    const handleLogin = () => {
                        if(userLoggedIn.token) {
                            alert('Login Successful!')
                            localStorage.setItem('token', userLoggedIn.token)
                            history.push('/account')
                        }
                    }
                    const data = {formData: {...values}, handleLogin: handleLogin}
                    dispatch(loginUser(data ))
                   
                }}
            >
                <Form>
                    <TextInput type='email' name='email' placeholder='Enter Email'/><br/>
                    <TextInput type='password' name='password' placeholder='Enter Password'/><br/>
                    <Button variant='contained' type='submit'>Login</Button>
                    <Button onClick={handleCancel} variant='contained' color='error'>Cancel</Button>
                    <Link to='/register'><Button variant='contained'>Register</Button></Link><small>(if not registered)</small>
                </Form>
            </Formik>
        </div>
    )
}
