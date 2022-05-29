import React from 'react'
import { useField } from "formik";
import TextField from '@mui/material/TextField';
import { FormControl } from '@mui/material';

export const SelectInput = props => {
    const [field, meta]=useField(props)
    return (
        <div>
            <FormControl sx={{width: 200, marginBottom: 2}}>
                <TextField {...field} {...props} variant='outlined' select></TextField>
            </FormControl>
            {meta.touched && meta.error ? <div style={{color: 'red'}}>{meta.error}</div>: null}
        </div>
    )
}
