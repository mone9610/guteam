/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

function Alert(props: JSX.IntrinsicAttributes & AlertProps) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const CustomizedSnackbars = (props: {
  open: any;
  handleClose: any;
  type: any;
  message: any;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { open, handleClose, type, message } = props;
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={handleClose} severity={type}>
        {message}
      </Alert>
    </Snackbar>
  );
};
export default CustomizedSnackbars;
