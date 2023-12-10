import * as S from '../../styles/posts/PostContent.styled';
import { useNavigate } from 'react-router-dom';
import { getFormattedDate } from 'utils/date';
import { useSelector } from 'react-redux';
import { usePosts } from 'hooks/usePosts';
import React from 'react';

function Content() {
  const userInfo = useSelector((state) => state.authSlice.userInfo);
  const navigate = useNavigate();
  const { posts } = usePosts();

  return (
    <S.Wrapper>
      <S.Title>나의 매거진</S.Title>
      {posts
        ?.filter((user) => user.uid === userInfo.uid)
        .map((item) => (
          <S.TempDiv key={item.id} onClick={() => navigate(`/post/${item.id}`)}>
            <p>제목 : {item.title}</p>
            <p>내용 : {item.contents}</p>
            <p>날짜 : {getFormattedDate(item.createdAt)}</p>
          </S.TempDiv>
        ))}
    </S.Wrapper>
  );
}

export default Content;
