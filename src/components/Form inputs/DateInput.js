import React, { useState } from 'react'
import { useField } from "formik";
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export const DateInput = props => {
    const [field, meta]=useField(props)
    const [value, setValue] = useState(new Date().toISOString().split('T')[0]);
    //console.log(value)
    return (
        <div>
             <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker 
                    {...field} 
                    {...props}
                    value={value}
                    onChange={newValue =>setValue(newValue)} 
                    renderInput={(params) => <TextField {...params} />}
                    disableFuture
                />
            </LocalizationProvider>
            {meta.touched && meta.error ? <div style={{color: 'red'}}>{meta.error}</div>: null}
        </div>
    )
}
