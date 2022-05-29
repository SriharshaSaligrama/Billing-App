import {configureStore} from '@reduxjs/toolkit'
import customerReducer from './customerSlice'
import productReducer from './productSlice'
import userReducer from './userSlice'
import billReducer from './billSlice'

export default configureStore({
    reducer:{
        user: userReducer,
        customers: customerReducer,
        products: productReducer,
        bills: billReducer,
    }
})