import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../selectors/configAxios'

export const registerUser= createAsyncThunk(
    'users/register',
    async (values)=>{
        //console.log(values)
        const response = await axios.post('users/register', values)
        //console.log(response.data)
        return response.data
    }
)

export const loginUser= createAsyncThunk(
    'users/login',
    async (values)=>{
        const { formData, handleLogin} = values 
        //console.log(values)
        const response = await axios.post('users/login', formData)
        if(!response.data.errors) handleLogin()
        //console.log(values, handleLogin)
        //console.log(response.data)
        return response.data
    }
)

export const getUser= createAsyncThunk(
    'users/account',
    async ()=>{
        //console.log(values)
        const response = await axios.get('users/account')
        //console.log(response.data)
        return response.data
    }
)

const userSlice= createSlice({
    name: 'users',
    initialState: {data: [], errors: ''},
    // reducers: {
    //     handleLogin: state=>{state.login=!state.login}
    // },
    extraReducers: builder=>{
        builder.addCase(registerUser.fulfilled, (state, action)=>{
            //console.log(action.payload)
            const error=action.payload.keyValue
            if(error) alert(JSON.stringify(error) + ' is already in use')
            else {
                state.data.push(action.payload)
            }
        })
        builder.addCase(loginUser.fulfilled, (state, action)=>{
            if(action.payload.errors) alert(action.payload.errors)
            else state.data=(action.payload)
        })
        builder.addCase(getUser.fulfilled, (state, action)=>{
            //console.log(action.payload)
            state.data={...state.data, ...action.payload}
        })
    }
})

//export const {handleLogin}=userSlice.actions

export default userSlice.reducer