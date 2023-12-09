import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: JSON.parse(localStorage.getItem('userInfo')) || null
};

export const authSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
      state.userInfo = action.payload;
    }
  }
});

export const { setUserInfo } = authSlice.actions;
export default authSlice.reducer;
