import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { Button, Typography } from '@mui/material'
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
            <Typography><h2>Login</h2></Typography>
            <Formik
                initialValues={{email: '', password: ''}}
                validationSchema={validate}
                onSubmit={(values)=>{
                    //console.log(values)
                    const handleLogin = () => {
                        if(userLoggedIn.token) {
                            alert('Login Successful!')
                            localStorage.setItem('token', userLoggedIn.token)
                            history.push('/')
                        }
                    }
                    const data = {formData: {...values}, handleLogin: handleLogin}
                    dispatch(loginUser(data))
                   
                }}
            >
                <Form>
                    <TextInput type='email' name='email' placeholder='Enter Email'/><br/>
                    <TextInput type='password' name='password' placeholder='Enter Password'/><br/>
                    <Button variant='contained' type='submit' sx={{marginRight: '10px'}}>Login</Button>
                    <Button onClick={handleCancel} variant='contained' color='error'>Cancel</Button><br/>
                    <br/><Typography><big>If not yet registered, please <Link to='/register'>register</Link> to login</big></Typography>
                </Form>
            </Formik>
        </div>
    )
}
