import React from 'react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { editCustomer } from '../../redux/customerSlice'
import { handleLogout } from '../../selectors/handleLogout'
import { TextInput } from '../Form inputs/TextInput'
import { Button } from '@mui/material'

export const EditCustomer = props=> {
    const customerId= props.match.params.id 
    //console.log(customerId)
    const customer= useSelector(state=>state.customers.data.find(customer=>customer._id===customerId))
    //console.log(customer)

    const dispatch=useDispatch()
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

    return (
        <>
            <Link to='/'><Button>Home</Button></Link>
            <Link to='/account'><Button >Account</Button></Link>
            <Link to='/products'><Button >Products</Button></Link>
            <Link to='/bills'><Button >Bills</Button></Link>
            <Link to='/'><Button onClick={handleLogout} color='error'>Logout</Button></Link>

            <Formik
                initialValues={{name: customer.name, mobile: customer.mobile, email: customer.email}}
                validationSchema={validate}
                onSubmit={(values)=>{
                    values._id= customerId
                    dispatch(editCustomer(values))
                    props.history.push('/customers')
                }}
            >
                <Form>
                    <TextInput type='text' name='name' placeholder='Enter Customer Name'/><br/>
                    <TextInput type='text' name='mobile' placeholder='Enter Customer Mobile'/><br/>
                    <TextInput type='email' name='email' placeholder='Enter Customer Email'/><br/>
                    <Button variant='contained' type='submit'>Save Customer</Button>
                </Form>   
            </Formik><br/>
        </>
    )
}
