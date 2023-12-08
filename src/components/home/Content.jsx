import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import { getPosts } from 'api/firebase/firebase';

import { getPosts } from 'api/firebase';

import { useDispatch, useSelector } from 'react-redux';
import { getPost, editPost, deletePost } from 'store/modules/postsSlice';
import { getFormattedDate } from 'utils/date';
import { deletePosts } from 'api/firebase/firebase';

function Content() {
  // 전역상태에 있는 post 불러오기
  const posts = useSelector((state) => state.postsSlice.posts);
  const auth = useSelector((state) => state.authSlice.userInfo);
  // console.log(posts);
  // console.log(auth);
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const data = await getPosts();
      // console.log(data);
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

  // useEffect(() => {
  //   console.log(posts);
  // }, [posts]);

  // 수정버튼 누르면 수정화면으로 바꾸는 핸들러
  const editHandler = (id) => {
    const findTargetIndex = posts.findIndex((target) => target.id == id);
    console.log(findTargetIndex);
    // const isEditPost = [...posts, ...(posts[findTargetIndex].isEdit = true)];
    // posts[findTargetIndex].isEdit = true;
    // dispatch(editPost([...posts]));
  };
  // 삭제 버튼 누르면 알림창 뜨고 삭제
  const deleteHandler = async (id) => {
    const newPosts = posts.filter((target) => target.id != id);
    alert('삭제하시겠습니까?');
    // firebase삭제
    await deletePosts(id);
    // postsSlice 전역 삭제
    dispatch(deletePost(newPosts));
  };
  return (
    <div style={{ margin: '10px' }}>
      <div> ⬇️ post불러와서 map으로 뿌려주기 ⬇️ </div>
      {/* optional chaining */}
      {posts?.map((item) => {
        return (
          <TempDiv style={{ border: '1px solid pink' }}>
            <div>제목 : {item.title}</div>
            <span>날짜 : {getFormattedDate(item.createdAt)}</span>
            <div>내용 : {item.contents}</div>
            <div>게시글 ID : {item.id}</div>
            <div>게시글 uid : {item.uid}</div>
          </TempDiv>
        );
      })}
      <div> ⬇️ 내 게시글만 모아보기 ⬇️</div>
      {/* 게시글의 uid와 현재 로그인한 계정의 uid비교하여 필터링 */}
      {posts
        ?.filter((user) => user.uid == auth.uid)
        .map((item) => {
          return (
            <TempDiv style={{ border: '1px solid pink' }}>
              <div>제목 : {item.title}</div>
              <span>날짜 : {getFormattedDate(item.createdAt)}</span>
              <div>내용 : {item.contents}</div>
              <div>게시글 ID : {item.id}</div>
              <div>게시글 uid : {item.uid}</div>
              <ConditionalButtonGroup item={item} editHandler={editHandler} deleteHandler={deleteHandler} />
            </TempDiv>
          );
        })}
    </div>
  );
}
const TempDiv = styled.div`
  border: 2px solid pink;
  margin: 5px;
  padding: 5px;
  line-height: 1.2;
  font-size: 12px;
`;
export default Content;

const ConditionalButtonGroup = ({ item, editHandler, deleteHandler }) => {
  return (
    <>
      {item.isEdit ? (
        <>
          <button>취소</button>
          <button>완료</button>
        </>
      ) : (
        <>
          <button
            onClick={() => {
              editHandler(item.id);
            }}
          >
            수정
          </button>
          <button
            onClick={() => {
              deleteHandler(item.id);
            }}
          >
            삭제
          </button>
        </>
      )}
    </>
  );
};
