import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TitleState = {
  title: string;
};

const initialState: TitleState = {
  title: 'タイムライン',
};

export const titleSlice = createSlice({
  name: 'title',
  initialState,
  reducers: {
    setTitle(state: TitleState, action: PayloadAction<string>) {
      // eslint-disable-next-line no-param-reassign
      state.title = action.payload;
    },
  },
});

export default titleSlice.reducer;
export const { setTitle } = titleSlice.actions;
