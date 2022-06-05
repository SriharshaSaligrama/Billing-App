import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { handleLogout } from '../../selectors/handleLogout'
import { DataGrid } from '@mui/x-data-grid';
import { getBillId } from '../../redux/billSlice'
import { getCustomers } from '../../redux/customerSlice'
import { getProducts } from '../../redux/productSlice'
import { getUser } from '../../redux/userSlice'
import './print.css'

export const BillId= props=>{
    const dispatch=useDispatch()
    //const history=useHistory()
    const {id}=props.match.params
    //console.log(id)
    useEffect(()=>{
        dispatch(getUser())
        dispatch(getBillId(id))
        dispatch(getCustomers())
        dispatch(getProducts())
    }, [dispatch, id])

    const {data}=useSelector(state=>state.bills)
    const lineItems=data?.lineItems
    //console.log(products)
    const items=lineItems?lineItems.slice(0):[]
    //console.log(items)
    
    const customers=useSelector(state=>state.customers.data)
    const allProducts=useSelector(state=>state.products.data)
    const prod=items.length>0?items.map(item=>{
        const pr=allProducts.length>0?allProducts.find(ele=>item.product===ele._id):[]
        return pr
    }):[]
    //console.log(prod, items)
    const mergedProductDetails= (prod, items)=>{
        return prod.length>0&&items.length>0?prod.map((ele, i)=>{
            if(ele.price===items[i].price) {
                return Object.assign({}, ele, items[i])
            } else return {_id:items[i]._id}
        }):[]
    }

    const productNames=items?mergedProductDetails(prod, items):[]
    //console.log(productNames[0])
    
    const user=useSelector(state=>state.user.data)
    const customerData=customers.find(customer=>customer._id===data.customer)
    //console.log(customerData)
    const date=data?.date?.slice(0,10)?.split('-')?.reverse()?.join('-')

    const handlePrint=()=>{
        window.print()
    }

    const columns=[
        {field: 'name', headerName: 'Product', width: 375, sortable: false},
        {field: 'price', headerName: 'Price(₹)', width: 375, sortable: false},
        {field: 'quantity', headerName: 'Quantity', width: 375, sortable: false},
        {field: 'subTotal', headerName: 'SubTotal', width: 375, sortable: false},
    ]

    return(
        <div>
            <div className='noPrint'>
                <Link to='/'><Button>Home</Button></Link>
                <Link to='/account'><Button >Account</Button></Link>
                <Link to='/customers'><Button >Customers</Button></Link>
                <Link to='/products'><Button >Products</Button></Link>
                <Link to='/bills'><Button>Bills</Button></Link>
                <Link to='/'><Button onClick={handleLogout} color='error'>Logout</Button></Link><br/>
            </div>
            
            <>
                <p>Date: {date}</p>
                <p>Billed by: {user?.username}</p>
                <p>Customer Name: {customerData?.name}</p>
                <p>Customer Mobile: {customerData?.mobile}</p>
                {productNames[0]?
                <div style={{height: 300}}>
                    <DataGrid 
                        columns={columns} 
                        rows={productNames} 
                        getRowId={(row) => row._id} 
                        pageSize={5} 
                        rowsPerPageOptions={[5]} 
                    />
                    <Button>Grand Total: {data.total}</Button><br/>
                </div>: <p>No bills to show</p>
                }
                <br/><br/>
                <div className='noPrint'>
                    <Button variant='contained' onClick={handlePrint} style={{marginRight: '10px'}}>Print</Button>
                    <Button variant='contained' onClick={props.history.goBack}>Back</Button>
                    <br/><br/>
                    <Link to={`/customerBills/${customerData?._id}`}><Button>{customerData?.name}'s bills</Button></Link>
                    {/* <Link to='/customers'><Button variant='contained'>Back to Customers</Button></Link> */}
                </div>
            </>
        </div>
    )
}