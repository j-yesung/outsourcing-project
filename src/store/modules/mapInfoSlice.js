import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mapInfo: JSON.parse(localStorage.getItem('mapInfo')) || null,
  fnbInfo: JSON.parse(localStorage.getItem('fnbInfo')) || null
};

export const mapInfoSlice = createSlice({
  name: 'mapInfo',
  initialState,
  reducers: {
    setMapInfo: (state, action) => {
      localStorage.setItem('mapInfo', JSON.stringify(action.payload));
      state.mapInfo = action.payload;
    },
    setFnbInfo: (state, action) => {
      localStorage.setItem('fnbInfo', JSON.stringify(action.payload));
      state.fnbInfo = action.payload;
    }
  }
});

export const { setMapInfo, setFnbInfo } = mapInfoSlice.actions;
export default mapInfoSlice.reducer;
