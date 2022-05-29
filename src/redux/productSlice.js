import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../selectors/configAxios'

export const getProducts= createAsyncThunk(
    'get/products',
    async ()=>{
        const response = await axios.get('products')
        return response.data
    }
)

export const addProduct= createAsyncThunk(
    'post/products',
    async (values)=>{
        const response = await axios.post('products', values)
        return response.data
    }
)

export const editProduct= createAsyncThunk(
    'put/products',
    async (values)=>{
        const response = await axios.put(`products/${values._id}`, values)
        return response.data
    }
)

export const removeProduct= createAsyncThunk(
    'delete/products',
    async ({id})=>{
        const response = await axios.delete(`products/${id}`)
        return response.data
    }
)

const productSlice= createSlice({
    name: 'products',
    initialState: {data: [], errors: ''},
    extraReducers: builder=>{
        builder.addCase(getProducts.fulfilled, (state, action)=>{state.data=[...action.payload]})
        builder.addCase(addProduct.fulfilled, (state, action)=>{state.data.push(action.payload)})
        builder.addCase(editProduct.fulfilled, (state, action)=>{
            const index= state.data.findIndex(product=>product._id===action.payload._id)
            state.data[index]={...state.data[index], ...action.payload}
        })
        builder.addCase(removeProduct.fulfilled, (state, action)=>{
            const index= state.data.findIndex(product=>product._id===action.payload._id)
            state.data.splice(index,1)
        })
    }
})

export default productSlice.reducer
