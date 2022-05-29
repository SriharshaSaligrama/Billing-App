import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { handleLogout } from '../../selectors/handleLogout'
import { DataGrid } from '@mui/x-data-grid';
import { getCustomers, removeCustomer } from '../../redux/customerSlice'
import { getBills } from '../../redux/billSlice'

export const Customers = props=> {
  const dispatch= useDispatch()

  useEffect(()=>{
    dispatch(getCustomers())
    dispatch(getBills())
  }, [dispatch])

  const {data}=useSelector(state=>state.customers)
  const billsData=useSelector(state=>state.bills.data)
  let AllBillsByCustomer=0
  
  const handleDelete= id=>{
    dispatch(removeCustomer({id}))
    // const customerBills=billsData.length>0?billsData.filter(bill=>bill?.customer===id):0
    // customerBills?.forEach(bill => {
    //   dispatch(removeBill({id: bill._id}))
    // });
  }

  const columns=[
    {field: 'name', headerName: 'Name', width: 300},
    {field: 'mobile', headerName: 'Mobile', width: 300, sortable: false},
    {field: 'email', headerName: 'Email', width: 300, sortable: false},
    {
      field: 'No. of Bills',
      renderCell: cellValues=>{
        const id=cellValues.id
        const customerBills=billsData.length>0?billsData.filter(bill=>bill?.customer===id):0
        //console.log(customerBills)
        const customerTotal=customerBills.length>0?customerBills.map(bill=>bill?.total):0
        const eachTotal=customerTotal?customerTotal.reduce((a,b)=>a+b):0
        //console.log(eachTotal)
        AllBillsByCustomer=customerBills.length||0
        return (
          <Link to={`/customerBills/${id}`}><Button>{AllBillsByCustomer} - ₹{eachTotal}</Button></Link>  
        )
      },
      width: 300,
      sortable: false
    },
    {
      field: 'Actions', 
      renderCell: cellValues=>{
        const id=cellValues.id
        //console.log(id)
        return (
          <div>
            <Link to={`/editCustomer/${id}`}><Button variant='contained'>edit</Button></Link>
            <Button variant='contained' color='error' onClick={()=>{handleDelete(id)}}>remove</Button>
          </div>
        )
      },
      width: 300,
      sortable: false
    },
  ]

  return (
    <div>
        <Link to='/'><Button>Home</Button></Link>
        <Link to='/account'><Button >Account</Button></Link>
        <Link to='/products'><Button >Products</Button></Link>
        <Link to='/bills'><Button >Bills</Button></Link>
        <Link to='/'><Button onClick={handleLogout} color='error'>Logout</Button></Link><br/>

        <>
          <Link to='/addCustomer'><Button variant='contained'>Add Customer</Button></Link>
          <h2>Customers List - {data.length}</h2>
          {
            data.length>0?(
              <div style={{height: 400}}>
                <DataGrid 
                  columns={columns} 
                  rows={data} 
                  getRowId={(row) => row._id} 
                  pageSize={5} 
                  rowsPerPageOptions={[5]} 
                />
              </div>
            ): (<p>No customers added</p>)
          }     
        </>
    </div>
  )
}
