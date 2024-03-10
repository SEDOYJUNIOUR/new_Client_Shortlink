import { Button, TextField } from '@mui/material';
import React from 'react';
import ClearIcon from '@mui/icons-material/Clear';

export const InputShortLink = ({name,handleChange}) => {
  
  return (
    <>
      <TextField
        id={name}
        className={'ShortLinkInput'}
        label={name}
        name={name}
        size='small'
        onChange={handleChange}
        variant="outlined"
        InputProps={{
          endAdornment:
            <Button onClick={() => document.getElementById(name).value = ''}
                                sx={{ width: 15, height: 15, minWidth: 15, color: '#778899' }}>
              <ClearIcon />
            </Button>,
        }}
      />
    </>
  )
}