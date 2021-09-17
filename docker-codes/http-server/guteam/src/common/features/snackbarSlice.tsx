import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SnackbarState = {
  open: boolean;
  // 関数のためany型を許容
  handleClose: any;
  type: string;
  message: string;
};

const initialState: SnackbarState = {
  open: false,
  handleClose: null,
  type: 'success',
  message: '成功しました。',
};

export const snackbarSlice = createSlice({
  name: 'snackbarState',
  initialState,
  reducers: {
    setSnackbar(state: SnackbarState, action: PayloadAction<SnackbarState>) {
      // eslint-disable-next-line no-param-reassign
      state = action.payload;
    },
  },
});

export default snackbarSlice.reducer;
export const { setSnackbar } = snackbarSlice.actions;
