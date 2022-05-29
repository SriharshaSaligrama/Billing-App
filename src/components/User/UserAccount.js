import { Button } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getBills } from '../../redux/billSlice'
import { getUser } from '../../redux/userSlice'
import { handleLogout } from '../../selectors/handleLogout'

export const UserAccount = props=> {
    const dispatch= useDispatch()

    useEffect(()=>{
        dispatch(getUser())
        dispatch(getBills())
    }, [dispatch])
    
    const registerUser=useSelector(state=>state.user.data)
    const userBills=useSelector(state=>state.bills.data)
    //console.log(registerUser)
    const numberOfBills=userBills.length
    const {username, email, businessName, address}=registerUser
    
    return (
        <div>
            <Link to='/'><Button>Home</Button></Link>
            <Link to='/customers'><Button >Customers</Button></Link>
            <Link to='/products'><Button >Products</Button></Link>
            <Link to='/bills'><Button >Bills</Button></Link>
            <Link to='/'><Button onClick={handleLogout} color='error'>Logout</Button></Link>
            <h2>Welcome {username}!</h2>
            <h3>Please find your account details:</h3>
            <p>Username: {username}</p>
            <p>Email: {email}</p>
            <p>Business Name: {businessName}</p>
            <p>Address: {address}</p>
            <Link to='/bills'><p>No. of Bills created: {numberOfBills}</p></Link>
        </div>
    )
}
