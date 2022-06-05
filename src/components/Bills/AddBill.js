import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button, MenuItem } from '@mui/material'
import {Formik, Form, FieldArray} from 'formik'
import * as Yup from 'yup'
import { TextInput } from '../Form inputs/TextInput'
import { SelectInput } from '../Form inputs/SelectInput'
//import { DateInput } from '../DateInput'
import { handleLogout } from '../../selectors/handleLogout'
import { useDispatch, useSelector } from 'react-redux'
import { getCustomers } from '../../redux/customerSlice'
import { getProducts } from '../../redux/productSlice'
import { addBill } from '../../redux/billSlice'

export const AddBill = props=> {
    const dispatch=useDispatch()
    //const history=useHistory()
    const location=useLocation()
    const queryId=location.search.substring(1)

    useEffect(()=>{
        dispatch(getCustomers())
        dispatch(getProducts())
    }, [dispatch])

    const customers=useSelector(state=>state.customers.data)
    const products=useSelector(state=>state.products.data)
    //console.log(customers, products)
    const queryCustomer=customers?.find(customer=>customer._id===queryId)
    //console.log(queryCustomer)
    //const handleCancel= ()=>{props.history.goBack()}
    const date= new Date()
    const today=`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
    // const [value, setValue] = useState(new Date().toISOString().split('T')[0]);

    const initialValues={
        date: today,
        customer: queryCustomer?queryCustomer._id:'',
        lineItems: [{product: '', quantity: 1}]
    }
    //console.log(value)
    const validate = Yup.object({
        customer: Yup.string().required('select the customer'),
        lineItems: Yup.array().of(
            Yup.object().shape({
                product: Yup.string().required('select a product'),
                quantity: Yup.number()
                    .min(1, 'Quantity should be 1 or more than 1')
                    .required('select quantity')
            })
        )   
    })

    return (
        <div>
            <Link to='/'><Button>Home</Button></Link>
            <Link to='/account'><Button >Account</Button></Link>
            <Link to='/customers'><Button >Customers</Button></Link>
            <Link to='/products'><Button >Products</Button></Link>
            <Link to='/'><Button onClick={handleLogout} color='error'>Logout</Button></Link><br/>

            <>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validate}
                    onSubmit={(values, {resetForm})=>{
                        //console.log(values.customer)
                        dispatch(addBill(values))
                        alert('bill added succesfully')
                        resetForm({values: ''})
                        props.history.push(`/customerBills/${values.customer}`)
                    }}            
                >
                    {({values})=>{
                        return(
                            <div>
                                <Form>
                                    {/* <DateInput name='date' label='date'/><br/> */}
                                    <SelectInput name='customer' label='customer'>
                                        <MenuItem value=''>Select Customer</MenuItem>
                                        {customers.map(customer=>(
                                            <MenuItem value={customer._id} key={customer._id}>
                                                {customer.name} - {customer.mobile}
                                            </MenuItem>
                                        ))}
                                    </SelectInput>
                                    <FieldArray name='lineItems'>
                                        {({remove, push})=>( 
                                            <div>
                                                {values.lineItems.length>0 && values.lineItems.map((value, i)=>(
                                                    <div key={i} style={{display: 'flex'}}>
                                                        <SelectInput name={`lineItems.${i}.product`} label='product'>
                                                            <MenuItem value=''>Select Product</MenuItem>
                                                            {products.map(product=>(
                                                                <MenuItem value={product._id} key={product._id}>
                                                                    {product.name}
                                                                </MenuItem>
                                                            ))}
                                                        </SelectInput>
                                                        <TextInput type='number' name={`lineItems.${i}.quantity`} />
                                                        <Button 
                                                            variant='contained' 
                                                            color='error' 
                                                            onClick={()=>remove(i)} 
                                                            sx={{height:56}}
                                                        >
                                                            remove
                                                        </Button><br/>
                                                    </div>
                                                ))}
                                                
                                                <Button 
                                                    variant='contained' 
                                                    onClick={()=>push({product: '', quantity: 1})}
                                                >
                                                    Add a product
                                                </Button>
                                            </div>
                                        )}
                                    </FieldArray><br/>
                                    <Button variant='contained' type='submit'>Submit bill</Button>
                                    <Button variant='contained'onClick={props.history.goBack}>Cancel</Button>
                                </Form>
                            </div>
                        )}
                    }
                </Formik>
            </>
        </div>
    )
}
