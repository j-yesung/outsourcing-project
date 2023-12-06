import { configureStore } from '@reduxjs/toolkit';
import authSlice from 'store/modules/authSlice';

const store = configureStore({
  reducer: {
    authSlice
  }
});

export default store;
