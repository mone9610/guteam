import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AccordionState = {
  communityOpen: boolean;
  teamOpen: boolean;
  directOpen: boolean;
  settingOpen: boolean;
  docOpen: boolean;
};

const initialState: AccordionState = {
  communityOpen: false,
  teamOpen: false,
  directOpen: false,
  settingOpen: false,
  docOpen: false,
};

export const accordionSlice = createSlice({
  name: 'accordionState',
  initialState,
  reducers: {
    setCommunityOpen(state: AccordionState, action: PayloadAction<boolean>) {
      // eslint-disable-next-line no-param-reassign
      state.communityOpen = action.payload;
    },
    setTeamOpen(state: AccordionState, action: PayloadAction<boolean>) {
      // eslint-disable-next-line no-param-reassign
      state.teamOpen = action.payload;
    },
    setDirectOpen(state: AccordionState, action: PayloadAction<boolean>) {
      // eslint-disable-next-line no-param-reassign
      state.directOpen = action.payload;
    },
    setSettingOpen(state: AccordionState, action: PayloadAction<boolean>) {
      // eslint-disable-next-line no-param-reassign
      state.settingOpen = action.payload;
    },
    setDocOpen(state: AccordionState, action: PayloadAction<boolean>) {
      // eslint-disable-next-line no-param-reassign
      state.docOpen = action.payload;
    },
  },
});

export default accordionSlice.reducer;
export const {
  setCommunityOpen,
  setTeamOpen,
  setDirectOpen,
  setSettingOpen,
  setDocOpen,
} = accordionSlice.actions;
