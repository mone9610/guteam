/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

import { useDispatch } from 'react-redux';
import { setSnackbarOpen } from 'common/features/snackbarSlice';

type Props = {
  // ToDo:型はあとで決める
  open: any;
  type: any;
  message: any;
};

const Alert = (props: JSX.IntrinsicAttributes & AlertProps) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <MuiAlert elevation={6} variant="filled" {...props} />
);

// 戻り値の型は定義不要
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const CustomizedSnackbars = (props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { open, type, message } = props;

  // HACK:ロジック部分がpresentationalに混在しているが、関数をpropsとして渡す必要性が疑問であるため許容
  const dispatch = useDispatch();
  const handleClose = (event: any, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setSnackbarOpen(false));
  };

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
