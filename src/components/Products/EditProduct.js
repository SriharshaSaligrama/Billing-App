import React from 'react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { editProduct } from '../../redux/productSlice'
import { handleLogout } from '../../selectors/handleLogout'
import { TextInput } from '../Form inputs/TextInput'
import { Button } from '@mui/material'

export const EditProduct = props=> {
    const productId= props.match.params.id
    //console.log(productId)
    const product= useSelector(state=>state.products.data.find(product=>product._id===productId))
    //console.log(product)

    const dispatch=useDispatch()
    //const history=useHistory()

    const validate = Yup.object({
        name: Yup.string()
          .required('Product Name is required'),
        price: Yup.number()
          .required('Price is required')
          .min(1, 'price should be greater than 0'),
    })

    return (
        <>
            <Link to='/'><Button>Home</Button></Link>
            <Link to='/account'><Button >Account</Button></Link>
            <Link to='/customers'><Button >Customers</Button></Link>
            <Link to='/bills'><Button >Bills</Button></Link>
            <Link to='/'><Button onClick={handleLogout} color='error'>Logout</Button></Link>

            <Formik
                initialValues={{name: product.name, price: product.price}}
                validationSchema={validate}
                onSubmit={(values)=>{
                    values._id= productId
                    dispatch(editProduct(values))
                    props.history.push('/products')
                }}
            >
                <Form>
                    <TextInput type='text' name='name' placeholder='Enter Product Name'/><br/>
                    <TextInput type='number' name='price' placeholder='Enter Product Price'/><br/>
                    <Button variant='contained' type='submit'>Save Product</Button>
                </Form>   
            </Formik><br/>
        </>
    )
}
