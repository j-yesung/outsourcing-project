import React from 'react';
import { usePosts } from 'hooks/usePosts';
import { useNavigate } from 'react-router-dom';
import * as S from '../../styles/posts/PostList.styled';
import { getFormattedDate } from 'utils/date';
import defaultImage from '../../assets/user.svg';

const PostList = () => {
  const { posts } = usePosts();
  const navigate = useNavigate();

  return (
    <S.PostContainer>
      <S.PostWrapper>
        {posts?.map((item, idx) => {
          return (
            <S.PostList key={idx} onClick={() => navigate(`/post/${item.id}`)}>
              <S.PostTitleContentsDate>
                <S.PostTitle>{item.title}</S.PostTitle>
                <S.PostContent>{item.contents}</S.PostContent>
                <S.PostDate>{getFormattedDate(item.createdAt)}</S.PostDate>
              </S.PostTitleContentsDate>
              <S.Postimge>
                <img src={defaultImage} />
              </S.Postimge>
            </S.PostList>
          );
        })}
      </S.PostWrapper>
    </S.PostContainer>
  );
};

export default PostList;
