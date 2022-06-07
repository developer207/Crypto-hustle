import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { AuthContext } from '../Context/context';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Alerts() {
  // const [open, setOpen] = React.useState(false);
  const {openAlert,message,handleSetOpenAlert,err}=React.useContext(AuthContext)

  const handleClick = () => {
    handleSetOpenAlert(true);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    handleSetOpenAlert(false);
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      
      <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={`${err?"error":"success"}`} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      
    </Stack>
  );
}
