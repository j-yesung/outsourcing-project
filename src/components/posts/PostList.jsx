import React, { useEffect, useState } from 'react';
import { usePosts } from 'hooks/usePosts';
import { useNavigate } from 'react-router-dom';
import * as S from '../../styles/posts/PostList.styled';
import { getFormattedDate } from 'utils/date';
import defaultImage from '../../assets/food.jpg';
import ScrollToTopBtn from './ScrollToTopBtn';

const PostList = () => {
  const { posts } = usePosts();
  const navigate = useNavigate();
  const [postscroll, setPostscroll] = useState(posts?.slice(0, 10));
  const [pages, setPages] = useState(20);

  const onClickHandler = () => {
    setPages(pages + 10);
    setPostscroll(posts?.slice(0, pages));
  };
  return (
    <>
      <S.PostContainer>
        <S.PostWrapper>
          {postscroll?.map((item) => {
            return (
              <S.PostList key={item.id} onClick={() => navigate(`/post/${item.id}`)}>
                <S.PostTitleContentsDate>
                  <S.PostTitle>{item.title}</S.PostTitle>
                  <S.PostContent>{item.contents}</S.PostContent>
                  <S.PostDate>{getFormattedDate(item.createdAt)}</S.PostDate>
                </S.PostTitleContentsDate>
                <S.Postimge>
                  <img src={item.imgurl == '' ? defaultImage : item.imgurl} alt="사진" />
                </S.Postimge>
              </S.PostList>
            );
          })}
        </S.PostWrapper>
        <S.PostMoreBtn>
          <button onClick={onClickHandler}>More</button>
        </S.PostMoreBtn>
      </S.PostContainer>
      <ScrollToTopBtn />
    </>
  );
};

export default PostList;
