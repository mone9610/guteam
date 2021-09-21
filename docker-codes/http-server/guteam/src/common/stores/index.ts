import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import titleSlice from 'common/features/pageTitleSlice';
import progressSlice from 'common/features/progressSlice';
import reloadSlice from 'common/features/reloadSlice';
import snackbarSlice from 'common/features/snackbarSlice';
import profileModalSlice from 'common/features/profileModalSlice';

const reducer = combineReducers({
  title: titleSlice,
  progress: progressSlice,
  reload: reloadSlice,
  snackbar: snackbarSlice,
  profileModal: profileModalSlice,
});

const store = configureStore({ reducer });
export default store;
