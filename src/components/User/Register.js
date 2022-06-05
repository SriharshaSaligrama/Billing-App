import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { Button, Typography } from '@mui/material'
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
            <Typography><h2>Register new user</h2></Typography>
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
                    <Button variant='contained' type='submit' sx={{marginRight: '10px'}}>Register User</Button>
                    <Button onClick={handleCancel} variant='contained' color='error'>Cancel</Button><br/>
                    <br/><Typography><big>Already have an account? Please <Link to='/login'>login</Link>!</big></Typography>
                </Form>
            </Formik>
        </div>
    )
}
