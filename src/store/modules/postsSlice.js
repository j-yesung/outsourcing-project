import { createSlice } from '@reduxjs/toolkit';
// post의 이니셜스테이트
const initialState = {
  posts: [
    {
      title: '',
      contents: '',
      createdAt: '',
      uid: '',
      isEdit: false
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
    },
    editPost: (state, action) => {
      state.posts.isEdit = action.payload;
    },
    deletePost: (state, action) => {
      state.posts = action.payload;
    }
  }
});

export const { addPost, getPost, editPost, deletePost } = postsSlice.actions;
export default postsSlice.reducer;
