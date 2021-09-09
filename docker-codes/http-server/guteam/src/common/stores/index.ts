import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import titleSlice from 'common/features/pageTitleSlice';

const reducer = combineReducers({
  title: titleSlice,
});

const store = configureStore({ reducer });
export default store;
