import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: null
};

export const authSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    }
  }
});

export const { setUserInfo } = authSlice.actions;
export default authSlice.reducer;
