import React from 'react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { TextInput } from '../Form inputs/TextInput'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { handleLogout } from '../../selectors/handleLogout'
import { addCustomer } from '../../redux/customerSlice'

export const AddCustomer = props=> {
  const dispatch= useDispatch()
  //const history=useHistory()

  const validate = Yup.object({
    name: Yup.string()
      .required('Customer Name is required'),
    mobile: Yup.string()
      .required('Mobile Number is required')
      .min(10, 'Mobile number should be 10 characters long'),
    email: Yup.string()
      .email('Invalid email address')
  })

  const handleCancel= ()=>{props.history.push('/customers')}
  
  return (
    <div>
        <Link to='/'><Button>Home</Button></Link>
        <Link to='/account'><Button >Account</Button></Link>
        <Link to='/products'><Button >Products</Button></Link>
        <Link to='/bills'><Button >Bills</Button></Link>
        <Link to='/'><Button onClick={handleLogout} color='error'>Logout</Button></Link>

        <>
            <Formik
                initialValues={{name: '', mobile: '', email: ''}}
                validationSchema={validate}
                onSubmit={(values, {resetForm})=>{
                    //console.log(values)
                    dispatch(addCustomer(values))
                    alert('customer added succesfully')
                    resetForm({values: ''})
                    props.history.push('/customers')
                }}
            >
                <Form>
                    <TextInput type='text' name='name' placeholder='Enter Customer Name'/><br/>
                    <TextInput type='text' name='mobile' placeholder='Enter Customer Mobile'/><br/>
                    <TextInput type='email' name='email' placeholder='Enter Customer Email'/><br/>
                    <Button variant='contained' type='submit'>Create Customer</Button>
                    <Button variant='contained' color='error' onClick={handleCancel}>Cancel</Button>
                </Form>   
            </Formik><br/>
        </>
    </div>
  )
}
