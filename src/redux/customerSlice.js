import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../selectors/configAxios'

export const getCustomers= createAsyncThunk(
    'get/customers',
    async ()=>{
        //console.log(values)
        const response = await axios.get('customers')
        //console.log(response.data)
        return response.data
    }
)

export const addCustomer= createAsyncThunk(
    'post/customers',
    async (values)=>{
        //console.log(values)
        const response = await axios.post('customers', values)
        //console.log(response.data)
        return response.data
    }
)

export const editCustomer= createAsyncThunk(
    'put/customers',
    async (values)=>{
        //console.log(values)
        const response = await axios.put(`customers/${values._id}`, values)
        //console.log(response.data)
        return response.data
    }
)

export const removeCustomer= createAsyncThunk(
    'delete/customers',
    async ({id})=>{
        //console.log(id)
        const response = await axios.delete(`customers/${id}`)
        //console.log(response.data)
        return response.data
    }
)

const customerSlice= createSlice({
    name: 'customers',
    initialState: {data: [], errors: ''},
    extraReducers: builder=>{
        builder.addCase(getCustomers.fulfilled, (state, action)=>{state.data=[...action.payload]})
        builder.addCase(addCustomer.fulfilled, (state, action)=>{state.data.push(action.payload)})
        builder.addCase(editCustomer.fulfilled, (state, action)=>{
            const index= state.data.findIndex(customer=>customer._id===action.payload._id)
            state.data[index]={...state.data[index], ...action.payload}
        })
        builder.addCase(removeCustomer.fulfilled, (state, action)=>{
            const index= state.data.findIndex(customer=>customer._id===action.payload._id)
            state.data.splice(index,1)
        })
    }
})

export default customerSlice.reducer
