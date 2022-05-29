import React, { useEffect } from 'react'
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { handleLogout } from '../../selectors/handleLogout';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { getCustomers } from '../../redux/customerSlice';
import { getProducts } from '../../redux/productSlice';
import { last5items } from '../../selectors/last5';
import { getBills } from '../../redux/billSlice';
import { Card } from '@mui/material';

export const Home = props=> {
    const dispatch=useDispatch()

    useEffect(()=>{
        dispatch(getCustomers())
        dispatch(getProducts())
        dispatch(getBills())
    }, [dispatch])

    let totalBills=0, totalCustomers=0, totalProducts=0, AllBillsByCustomer=0
    const allCustomers=useSelector(state=>state.customers.data)
    const allProducts=useSelector(state=>state.products.data)
    const allBills=useSelector(state=>state.bills.data)

    totalCustomers=allCustomers.length
    totalProducts=allProducts.length
    totalBills=allBills.length

    const last5Customers= allCustomers.length>0?last5items(allCustomers):[]
    const last5Products=allProducts.length>0?last5items(allProducts):[]
    const last5Bills=allBills.length>0?last5items(allBills):[]

    const customerColumns=[
        {field: 'name', headerName: 'Name', width: 150},
        {field: 'mobile', headerName: 'Mobile', width: 150, sortable: false},
        {field: 'email', headerName: 'Email', width: 200, sortable: false},
        {
          field: 'No. of Bills',
          renderCell: cellValues=>{
            const id=cellValues.id
            const customerBills=allBills.length>0?allBills.filter(bill=>bill?.customer===id):0
            const customerTotal=customerBills.length>0?customerBills.map(bill=>bill?.total):0
            const eachTotal=customerTotal?customerTotal.reduce((a,b)=>a+b):0
            //console.log(eachTotal)
            AllBillsByCustomer=customerBills.length||0
            return (
              <Link to={`/customerBills/${id}`}><Button>{AllBillsByCustomer} - ₹{eachTotal}</Button></Link>  
            )
          },
          width: 100,
          sortable: false
        },
    ]

    const productColumns=[
        {field: 'name', headerName: 'Name', width: 200,},
        {field: 'price', headerName: 'Price(₹)', width: 200, align: 'center', headerAlign: 'center'},
    ]

    const billColumns=[
        {
          field: 'Bills', 
          renderCell: cellValues=>{
            const id=cellValues.id
            //console.log(id)
            return(
              <Link to={`bills/${id}`}><Button>{cellValues.row.date.slice(0,10)} - {id}</Button></Link>
            )
          }, 
          width: 400,
        },
    ]  

    return (
        <div>
            <h2>Welcome to POS billing app!</h2>
            {localStorage.getItem('token')?<>
                <Link to='/account'><Button>Account</Button></Link>
                <Link to='/customers'><Button>Customers</Button></Link>
                <Link to='/products'><Button>Products</Button></Link>
                <Link to='/bills'><Button>Bills</Button></Link>
                <Link to='/'><Button color='error' onClick={handleLogout}>Logout</Button></Link>
                
                <h2>Dashboard: </h2>
                <div style={{display: 'flex', columnGap: '390px'}}>
                    <Card sx={{borderColor: 'royalblue'}} variant='outlined'>
                        <p><Link to='/products'>
                            <Button>
                                Total Products: {totalProducts}
                            </Button>
                        </Link></p>
                    </Card>
                    <Card sx={{borderColor: 'royalblue'}} variant='outlined'>
                        <p><Link to='/customers'>
                            <Button>
                                Total Customers: {totalCustomers}
                            </Button>
                        </Link></p>
                    </Card>
                    <Card sx={{borderColor: 'royalblue'}} variant='outlined'>
                        <p><Link to='/bills'>
                            <Button>
                                Total Bills: {totalBills}
                            </Button>
                        </Link></p>
                    </Card>
                </div>

                <h2>Recent 5: </h2>
                <div style={{display: 'flex', columnGap: '50px'}}>
                    {
                        last5Products.length>0?(
                        <div style={{height: 400, width: 400}}>
                            <Button>Products: </Button>
                            <DataGrid 
                                columns={productColumns} 
                                rows={last5Products} 
                                getRowId={(row) => row._id}
                                pageSize={5} 
                                rowsPerPageOptions={[5]}
                            />
                        </div>
                        ): (<p>No products added</p>)
                    }
                    {
                        last5Customers.length>0?(
                        <div style={{height: 400, width: 600}}>
                            <Button>Customers: </Button>
                            <DataGrid 
                                columns={customerColumns} 
                                rows={last5Customers} 
                                getRowId={(row) => row._id} 
                                pageSize={5} 
                                rowsPerPageOptions={[5]}
                            />
                        </div>
                        ): (<p>No customers added</p>)
                    }
                    {
                        last5Bills.length>0?(
                        <div style={{height: 400, width: 400}}>
                            <Button>Bills: </Button>
                            <DataGrid 
                                columns={billColumns} 
                                rows={last5Bills} 
                                getRowId={(row) => row._id} 
                                pageSize={5} 
                                rowsPerPageOptions={[5]}
                            />
                        </div>
                        ): (<p>No bills added</p>)
                    }
                </div>
                </>:<><Link to='/register'><Button variant='contained'>Register</Button></Link>
                <Link to='/login'><Button variant='contained'>Login</Button><small>(if already registered)</small></Link>
            </>}
        </div>
    )
}
