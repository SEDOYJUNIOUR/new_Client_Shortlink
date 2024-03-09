import React from 'react';
import { TextField } from '@mui/material';

export const InputText = ({name,handleChange}) => {
  return (
    <>
      <br></br>
      <TextField className={'RegisterInput'} label={name} name={name} onChange={handleChange} variant="outlined" />
      <br></br>
    </>
  )
}