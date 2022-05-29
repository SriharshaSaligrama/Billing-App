import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import { handleLogout } from '../../selectors/handleLogout'
import { useDispatch, useSelector } from 'react-redux'
import { getBills, removeBill } from '../../redux/billSlice'

export const Bills = props=> {
  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(getBills())
  }, [dispatch])

  const {data}=useSelector(state=>state.bills)

  const handleDelete= id=>{
    dispatch(removeBill({id}))
  }

  const columns=[
      {
        field: 'Bills', 
        renderCell: cellValues=>{
          const id=cellValues.id
          //console.log(id)
          return(
            <Link to={`bills/${id}`}><Button>{cellValues.row.date.slice(0,10)} - {id}</Button></Link>
          )
        }, 
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
        <Link to='/'><Button onClick={handleLogout} color='error'>Logout</Button></Link><br/>

        <>
          <Link to='/addBill'><Button variant='contained'>Add Bill</Button></Link>
          <h2>Bills List - {data.length}</h2>
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
            ): (<p>No bills added</p>)
          }
        </>
    </div>
  )
}
