import React, { useState } from 'react';
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export const AlertError = ({errorMassage, errorMessageChange}) =>{
  const [open, setOpen] = useState(true)
  return (
    <>
      <center><Collapse in={open} sx={{ width: 420 , mt: 9}}>
        <Alert
          severity="warning"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
                errorMessageChange('')
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {errorMassage}
        </Alert>
      </Collapse>
      </center>
    </>
  )
}

