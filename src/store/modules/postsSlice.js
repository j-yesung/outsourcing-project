import { createSlice } from '@reduxjs/toolkit';
// post의 이니셜스테이트
const initialState = {
  posts: [
    {
      title: '',
      contents: '',
      createdAt: '',
      uid: ''
    }
  ]
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts = action.payload;
    },
    getPost: (state, action) => {
      state.posts = action.payload;
    }
  }
});

export const { addPost, getPost } = postsSlice.actions;
export default postsSlice.reducer;
