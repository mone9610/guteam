import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import titleSlice from 'common/features/pageTitleSlice';
import progressSlice from 'common/features/progressSlice';
import reloadSlice from 'common/features/reloadSlice';
import snackbarSlice from 'common/features/snackbarSlice';

const reducer = combineReducers({
  title: titleSlice,
  progress: progressSlice,
  reload: reloadSlice,
  snackbar: snackbarSlice,
});

const store = configureStore({ reducer });
export default store;
