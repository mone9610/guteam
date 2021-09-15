import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ReloadState = {
  reload: boolean;
};

const initialState: ReloadState = {
  reload: false,
};

export const reloadSlice = createSlice({
  name: 'progressState',
  initialState,
  reducers: {
    setReload(state: ReloadState, action: PayloadAction<boolean>) {
      // eslint-disable-next-line no-param-reassign
      state.reload = action.payload;
    },
  },
});

export default reloadSlice.reducer;
export const { setReload } = reloadSlice.actions;
