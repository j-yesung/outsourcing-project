import { configureStore } from '@reduxjs/toolkit';
import authSlice from 'store/modules/authSlice';
import mapInfoSlice from 'store/modules/mapInfoSlice';
import postsSlice from 'store/modules/postsSlice';

const store = configureStore({
  reducer: {
    authSlice,
    mapInfoSlice,
    postsSlice
  }
});

export default store;
