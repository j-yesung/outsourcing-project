import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mapInfo: null,
  fnbInfo: []
};

export const mapInfoSlice = createSlice({
  name: 'mapInfo',
  initialState,
  reducers: {
    setMapInfo: (state, action) => {
      state.mapInfo = action.payload;
    },
    setFnbInfo: (state, action) => {
      state.fnbInfo = action.payload;
    }
  }
});

export const { setMapInfo, setFnbInfo } = mapInfoSlice.actions;
export default mapInfoSlice.reducer;
