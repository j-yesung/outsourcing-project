import React, { useEffect, useState } from 'react';
import { getPosts } from 'api/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { getPost } from 'store/modules/postsSlice';

function Content() {
  // 전역상태에 있는 post 불러오기
  const posts = useSelector((state) => state.postsSlice.posts);
  console.log(posts);
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const data = await getPosts();
      console.log(data);
      // 전역postsSlice에 data 디스패치로 보내주기
      dispatch(getPost(data));
    } catch (error) {
      console.log('error->', error);
    }
  };
  // mount됐을 때(처음 렌더링 되었을 때)
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(posts);
  }, [posts]);
  return (
    <>
      <div> ⬇️ post불러와서 map으로 뿌려주기 ⬇️ </div>
      {/* optional chaining */}
      {posts?.map((item) => {
        return (
          <div style={{ border: '1px solid pink' }}>
            <div>제목 : {item.title}</div>
            <span>날짜 : {item.createdAt}</span>
            <div>내용 : {item.contents}</div>
            <div>{item.id}</div>
          </div>
        );
      })}
    </>
  );
}

export default Content;
