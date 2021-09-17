import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SnackbarState = {
  open: boolean;
  // 関数のためany型を許容
  // handleClose: any;
  type: string;
  message: string;
};

const initialState: SnackbarState = {
  open: false,
  // handleClose: null,
  type: 'success',
  message: '成功しました。',
};

export const snackbarSlice = createSlice({
  name: 'snackbarState',
  initialState,
  reducers: {
    setSnackbarOpen(state: SnackbarState, action: PayloadAction<boolean>) {
      // eslint-disable-next-line no-param-reassign
      state.open = action.payload;
    },
    setSnackbarState(
      state: SnackbarState,
      action: PayloadAction<SnackbarState>
    ) {
      // eslint-disable-next-line no-param-reassign
      state.message = action.payload.message;
      // eslint-disable-next-line no-param-reassign
      state.open = action.payload.open;
      // eslint-disable-next-line no-param-reassign
      state.type = action.payload.type;
    },
  },
});

export default snackbarSlice.reducer;
export const { setSnackbarOpen, setSnackbarState } = snackbarSlice.actions;
