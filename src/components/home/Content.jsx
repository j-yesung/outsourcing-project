import ScrollToTopBtn from 'components/posts/ScrollToTopBtn';
import * as S from '../../styles/posts/PostList.styled';
import defaultImage from '../../assets/food.jpg';
import { useNavigate } from 'react-router-dom';
import { getFormattedDate } from 'utils/date';
import { useSelector } from 'react-redux';
import { usePosts } from 'hooks/usePosts';
import React from 'react';
import * as M from '../../styles/modal/Lodaing.styled';

function Content() {
  const userInfo = useSelector((state) => state.authSlice.userInfo);
  const navigate = useNavigate();
  const { posts, postsLoading } = usePosts();
  if (postsLoading) {
    return <M.Loader />;
  }
  const likePosts = posts.filter((item) => item.likedBy.includes(userInfo.uid));

  return (
    <>
      <S.PostContainer>
        <S.HeaderText>내가 작성한 게시글</S.HeaderText>
        <S.PostWrapper>
          {posts
            ?.filter((user) => user.uid === userInfo.uid)
            .map((item) => {
              return (
                <S.PostList key={item.id} onClick={() => navigate(`/post/${item.id}`)}>
                  <S.PostTitleContentsDate>
                    <S.PostTitle>{item.title}</S.PostTitle>
                    <S.PostContent>{item.contents}</S.PostContent>
                    <S.PostDate>{getFormattedDate(item.createdAt)}</S.PostDate>
                  </S.PostTitleContentsDate>
                  <S.Postimge>
                    <img src={item.imgurl === '' ? defaultImage : item.imgurl} alt="" />
                  </S.Postimge>
                </S.PostList>
              );
            })}
        </S.PostWrapper>
        <S.HeaderText>좋아요 누른 게시글</S.HeaderText>
        <S.PostWrapper>
          {likePosts.map((item) => {
            return (
              <S.PostList key={item.id} onClick={() => navigate(`/post/${item.id}`)}>
                <S.PostTitleContentsDate>
                  <S.PostTitle>{item.title}</S.PostTitle>
                  <S.PostContent>{item.contents}</S.PostContent>
                  <S.PostDate>{getFormattedDate(item.createdAt)}</S.PostDate>
                </S.PostTitleContentsDate>
                <S.Postimge>
                  <img src={item.imgurl === '' ? defaultImage : item.imgurl} alt="" />
                </S.Postimge>
              </S.PostList>
            );
          })}
        </S.PostWrapper>
      </S.PostContainer>
      <ScrollToTopBtn />
    </>
  );
}

export default Content;
