import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import { handleLogout } from '../../selectors/handleLogout'
import { useDispatch, useSelector } from 'react-redux'
import { getBills, removeBill } from '../../redux/billSlice'
import { getCustomers } from '../../redux/customerSlice';

export const CustomerBills = props=> {
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(getBills())
        dispatch(getCustomers())
    }, [dispatch])

    const customerId= props.match.params.id
    const {data}=useSelector(state=>state.bills)
    const customerData=useSelector(state=>state.customers.data)
    const customerBills=data[0]?data.filter(bill=>bill.customer===customerId):[]
    const total=customerBills.length>0?customerBills.map(bill=>bill.total):0
    //console.log(total, customerBills)
    const amount= total.length>0?total.reduce((a,b)=>(a+b)):0
    const customer=customerData.find(customer=>customer._id===customerId)
    //console.log(amount)

    const handleDelete= id=>{
        dispatch(removeBill({id}))
    }

    const columns=[
        {
            field: 'Bills', 
            renderCell: cellValues=>{
                //console.log(cellValues)
                const id=cellValues.id 
                //console.log(id)
                return(
                    <Link to={`/bills/${id}`}><Button>{cellValues.row.date.slice(0,10)} - {id}</Button></Link>
                )
            }, 
            width: 500,
            sortable: false,
        },
        {
            field: 'total',
            headerName: 'Bill Total',
            width: 500,
        },
        {
            field: 'Actions', 
            renderCell: cellValues=>{
                const id=cellValues.id
                //console.log(cellValues.row.date.slice(0,10))
                return (
                <Button variant='contained' color='error' onClick={()=>{handleDelete(id)}}>remove</Button>
                )
            },
            width: 500,
            sortable: false
        },
    ]

    return (
        <div>
            <Link to='/'><Button>Home</Button></Link>
            <Link to='/account'><Button >Account</Button></Link>
            <Link to='/customers'><Button >Customers</Button></Link>
            <Link to='/products'><Button >Products</Button></Link>
            <Link to='/bills'><Button>Bills</Button></Link>
            <Link to='/'><Button onClick={handleLogout} color='error'>Logout</Button></Link><br/>

            <>
            <Link to={`/addBill?${props.match.params.id}`}><Button variant='contained'>Add Bill</Button></Link>
            <h2>Bills of {customer?.name} - {customerBills.length}</h2>
            {
                customerBills?.length>0?(
                <div style={{height: 400}}>
                    <DataGrid 
                        columns={columns} 
                        rows={customerBills} 
                        getRowId={(row) => row._id} 
                        pageSize={5} 
                        rowsPerPageOptions={[5]} 
                    />
                </div>
                ): (<p>No bills added</p>)
            }
            <Button>Total: {amount}</Button><br/>
            <Link to='/customers'><Button variant='contained'>Back</Button></Link>
            </>
        </div>
    )
}
