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
    // 파이어베이스에 추가(저장)하고 getPost로 전체 데이터 불러올 것이기 때문에 addPost는 굳이 필요없음
    // addPost: (state, action) => {
    //   state.posts = action.payload;
    // },
    getPost: (state, action) => {
      state.posts = action.payload;
    },
    editPost: (state, action) => {
      const { id, title, contents } = action.payload;
      state.posts.map((item) => {
        if (item.id === id) {
          return (item.title = title), (item.contents = contents);
        }
        return item;
      });
    },
    deletePost: (state, action) => {
      state.posts.isEdit = action.payload;
    }
  }
});

export const { addPost, getPost, editPost, deletePost } = postsSlice.actions;
export default postsSlice.reducer;
