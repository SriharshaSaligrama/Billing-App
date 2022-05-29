import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { handleLogout } from '../../selectors/handleLogout'
import { DataGrid } from '@mui/x-data-grid';
import { getProducts, removeProduct } from '../../redux/productSlice'

export const Products = props=> {
    const dispatch= useDispatch()

    useEffect(()=>{
        dispatch(getProducts())
    }, [dispatch])

    const {data}=useSelector(state=>state.products)
    
    const handleDelete= id=>{
        dispatch(removeProduct({id}))
    }

    const columns=[
        {field: 'name', headerName: 'Name', width: 500},
        {field: 'price', headerName: 'Price(₹)', width: 500},
        {
            field: 'Actions', 
            renderCell: cellValues=>{
              const id=cellValues.id
              //console.log(id)
              return (
                <div>
                  <Link to={`/editProduct/${id}`}><Button variant='contained'>edit</Button></Link>
                  <Button variant='contained' color='error' onClick={()=>{handleDelete(id)}}>remove</Button>
                </div>
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
            <Link to='/bills'><Button >Bills</Button></Link>
            <Link to='/'><Button onClick={handleLogout} color='error'>Logout</Button></Link><br/>

            <>
                <Link to='/addProduct'><Button variant='contained'>Add Product</Button></Link>
                <h2>Products List - {data.length}</h2>
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
                    ): (<p>No products added</p>)
                }     
            </>
        </div>
    )
}
