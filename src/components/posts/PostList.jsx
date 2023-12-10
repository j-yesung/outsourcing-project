import React from 'react';
import { usePosts } from 'hooks/usePosts';
import { useNavigate } from 'react-router-dom';
import * as S from '../../styles/posts/PostList.styled';
import { getFormattedDate } from 'utils/date';
import defaultImage from '../../assets/user.svg';

import ScrollToTopBtn from './ScrollToTopBtn';
const PostList = () => {
  const { posts } = usePosts();
  const navigate = useNavigate();

  return (
    <>
      <S.PostContainer>
        <S.PostWrapper>
          {posts?.map((item, idx) => {
            return (
              <S.PostList key={idx} onClick={() => navigate(`/post/${item.id}`)}>
                <S.PostTitleContentsDate>
                  <S.PostTitle>{item.title}</S.PostTitle>
                  <S.PostContent>{item.contents}</S.PostContent>
                  <S.PostDate>{getFormattedDate(item.createdAt)}</S.PostDate>
                  {/* <div>게시글 좋아요 : {item.likeCount}</div> */}
                </S.PostTitleContentsDate>
                <S.Postimge>
                  <img src={defaultImage} alt="사진" />
                </S.Postimge>
              </S.PostList>
            );
          })}
        </S.PostWrapper>
      </S.PostContainer>
      <ScrollToTopBtn />
    </>
  );
};

export default PostList;
