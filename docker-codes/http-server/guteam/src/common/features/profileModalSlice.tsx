import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'common/CustomTypes';

export type ProfileModalState = {
  open: boolean;
  user: User;
};

const initialState: ProfileModalState = {
  open: false,
  user: {
    id: 0,
    name: 'ほぎゃああ',
    picture_url: '',
    introduction: '',
    sub: '',
  },
};

export const profileModalSlice = createSlice({
  name: 'profileModalSlice',
  initialState,
  reducers: {
    setProfileModalOpen(
      state: ProfileModalState,
      action: PayloadAction<boolean>
    ) {
      // eslint-disable-next-line no-param-reassign
      state.open = action.payload;
    },
    setProfileModalState(
      state: ProfileModalState,
      action: PayloadAction<User>
    ) {
      // eslint-disable-next-line no-param-reassign
      state.user.name = action.payload.name;
      // eslint-disable-next-line no-param-reassign
      state.user.picture_url = action.payload.picture_url;
      // eslint-disable-next-line no-param-reassign
      state.user.introduction = action.payload.introduction;
      // eslint-disable-next-line no-param-reassign
      state.user.sub = action.payload.sub;
    },
  },
});

export default profileModalSlice.reducer;
export const { setProfileModalOpen, setProfileModalState } =
  profileModalSlice.actions;
