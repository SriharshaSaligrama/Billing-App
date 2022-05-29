import React from 'react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { TextInput } from '../Form inputs/TextInput'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { handleLogout } from '../../selectors/handleLogout'
import { addProduct } from '../../redux/productSlice'

export const AddProduct = props=> {
  const dispatch= useDispatch()
  //const history=useHistory()

  const validate = Yup.object({
    name: Yup.string()
      .required('Product Name is required'),
    price: Yup.number()
      .required('Price is required')
      .min(1, 'price should be greater than 0'),
  })

  const handleCancel= ()=>{props.history.push('/products')}
  
  return (
    <div>
        <Link to='/'><Button>Home</Button></Link>
        <Link to='/account'><Button >Account</Button></Link>
        <Link to='/customers'><Button >Customers</Button></Link>
        <Link to='/bills'><Button >Bills</Button></Link>
        <Link to='/'><Button onClick={handleLogout} color='error'>Logout</Button></Link>

        <>
            <Formik
                initialValues={{name: '', price: ''}}
                validationSchema={validate}
                onSubmit={(values, {resetForm})=>{
                    //console.log(values)
                    dispatch(addProduct(values))
                    alert('product added succesfully')
                    resetForm({values: ''})
                    props.history.push('/products')
                }}
            >
                <Form>
                    <TextInput type='text' name='name' placeholder='Enter Product Name'/><br/>
                    <TextInput type='number' name='price' placeholder='Enter Product Price'/><br/>
                    <Button variant='contained' type='submit'>Add Product</Button>
                    <Button variant='contained' color='error' onClick={handleCancel}>Cancel</Button>
                </Form>   
            </Formik><br/>
        </>
    </div>
  )
}
