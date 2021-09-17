import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import titleSlice from 'common/features/pageTitleSlice';
import progressSlice from 'common/features/progressSlice';
import reloadSlice from 'common/features/reloadSlice';

const reducer = combineReducers({
  title: titleSlice,
  progress: progressSlice,
  reload: reloadSlice,
});

const store = configureStore({ reducer });
export default store;
