import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../selectors/configAxios'

export const getBills= createAsyncThunk(
    'get/bills',
    async ()=>{
        const response = await axios.get('bills')
        return response.data
    }
)

export const getBillId= createAsyncThunk(
    'get/billId',
    async (id)=>{
        const response = await axios.get(`bills/${id}`)
        return response.data
    }
)

export const getProductId= createAsyncThunk(
    'get/productId',
    async (id)=>{
        const response = await axios.get(`products/${id}`)
        return response.data
    }
)

export const addBill= createAsyncThunk(
    'post/bills',
    async (values)=>{
        const response = await axios.post('bills', values)
        return response.data
    }
)

export const removeBill= createAsyncThunk(
    'delete/bills',
    async ({id})=>{
        const response = await axios.delete(`bills/${id}`)
        return response.data
    }
)

const billSlice= createSlice({
    name: 'bills',
    initialState: {data: [], product: [], errors: ''},
    extraReducers: builder=>{
        builder.addCase(getBills.fulfilled, (state, action)=>{state.data=[...action.payload]})
        builder.addCase(getBillId.fulfilled, (state, action)=>{state.data={...action.payload}})
        builder.addCase(getProductId.fulfilled, (state, action)=>{state.product={...action.payload}})
        builder.addCase(addBill.fulfilled, (state, action)=>{state.data.push(action.payload)})
        builder.addCase(removeBill.fulfilled, (state, action)=>{
            const index= state.data.findIndex(bill=>bill._id===action.payload._id)
            state.data.splice(index,1)
        })
    }
})

export default billSlice.reducer