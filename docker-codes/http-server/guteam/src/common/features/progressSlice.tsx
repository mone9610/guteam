import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ProgressState = {
  progress: boolean;
};

const initialState: ProgressState = {
  progress: true,
};

export const progressSlice = createSlice({
  name: 'progressState',
  initialState,
  reducers: {
    setProgress(state: ProgressState, action: PayloadAction<boolean>) {
      // eslint-disable-next-line no-param-reassign
      state.progress = action.payload;
    },
  },
});

export default progressSlice.reducer;
export const { setProgress } = progressSlice.actions;
