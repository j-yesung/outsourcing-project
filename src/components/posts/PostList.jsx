import React from 'react';
import { usePosts } from 'hooks/usePosts';
import { useNavigate } from 'react-router-dom';
import * as S from '../../styles/posts/PostContent.styled';
import { getFormattedDate } from 'utils/date';

const PostList = () => {
  const { posts } = usePosts();
  const navigate = useNavigate();

  return (
    <div>
      <div> ⬇️ post불러와서 map으로 뿌려주기 ⬇️ </div>
      {posts?.map((item, idx) => {
        return (
          <S.TempDiv key={idx} onClick={() => navigate(`/post/${item.id}`)}>
            <div>제목 : {item.title}</div>
            <span>날짜 : {getFormattedDate(item.createdAt)}</span>
            <div>내용 : {item.contents}</div>
            <div>게시글 ID : {item.id}</div>
            <div>게시글 uid : {item.uid}</div>
          </S.TempDiv>
        );
      })}
    </div>
  );
};

export default PostList;
