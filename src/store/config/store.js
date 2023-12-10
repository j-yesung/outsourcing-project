import { configureStore } from '@reduxjs/toolkit';
import authSlice from 'store/modules/authSlice';
import mapInfoSlice from 'store/modules/mapInfoSlice';

const store = configureStore({
  reducer: {
    authSlice,
    mapInfoSlice
  }
});

export default store;
