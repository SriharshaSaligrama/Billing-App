import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { Button } from '@mui/material'
import { TextArea, TextInput } from '../Form inputs/TextInput'
import { registerUser } from '../../redux/userSlice'

export const Register = props=> {
    const history=useHistory()
    const dispatch=useDispatch()
    const registeredUsers=useSelector(state=>state.user.data)
    if(registeredUsers.length>0) {
        alert('user registered succesfully')
        history.push('/login')
    }

    const validate = Yup.object({
        username: Yup.string()
            .required('Username is required')
            .min(4, 'Username must be minimum 4 characters long'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Email id required'),
        password: Yup.string()
            .required('Enter the password')
            .min(8, 'Password must be minimum 8 characters long'),
        businessName: Yup.string()
            .required('Business name required'),
        address: Yup.string()
            .required('Address required')
    })

    const handleCancel= ()=>{
        history.push('/')
    }

    return (
        <div>
            <h2>Register new user</h2>
            <Formik
                initialValues={{username: '', email: '', password: '', businessName: '', address: ''}}
                validationSchema={validate}
                onSubmit={(values, {resetForm})=>{
                    //console.log(values)
                    dispatch(registerUser(values))
                }}
            >
                <Form>
                    <TextInput type='text' name='username' placeholder='Enter Username'/><br/>
                    <TextInput type='email' name='email' placeholder='Enter Email'/><br/>
                    <TextInput type='password' name='password' placeholder='Enter Password'/><br/>
                    <TextInput type='text' name='businessName' placeholder='Enter Business name'/><br/>
                    <TextArea type='text' name='address' placeholder='Enter Address'/><br/>
                    <Button variant='contained' type='submit'>Register User</Button>
                    <Button onClick={handleCancel} variant='contained' color='error'>Cancel</Button>
                    <Link to='/login'><Button variant='contained'>Login</Button></Link><small>(if already registered)</small>
                </Form>
            </Formik>
        </div>
    )
}
