import React from 'react'
import { useField } from "formik";
import TextField from '@mui/material/TextField';

export const TextInput = props => {
    const [field, meta]=useField(props)
    return (
        <div>
            <TextField {...field} {...props}/>
            {meta.touched && meta.error ? <div style={{color: 'red'}}>{meta.error}</div>: null}
        </div>
    )
}

export const TextArea= props => {
    const [field, meta]=useField(props)
    return (
        <div>
            <TextField {...field} {...props} multiline/>
            {meta.touched && meta.error ? <div style={{color: 'red'}}>{meta.error}</div>: null}
        </div>
    )
}