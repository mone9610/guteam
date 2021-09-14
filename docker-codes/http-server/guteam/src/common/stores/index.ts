import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import titleSlice from 'common/features/pageTitleSlice';
import progressSlice from 'common/features/progressSlice';

const reducer = combineReducers({
  title: titleSlice,
  progress: progressSlice,
});

const store = configureStore({ reducer });
export default store;
