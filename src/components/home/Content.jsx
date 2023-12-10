import * as S from "../../styles/posts/PostContent.styled";
import { useNavigate } from "react-router-dom";
import { getFormattedDate } from "utils/date";
import { useSelector } from "react-redux";
import { usePosts } from "hooks/usePosts";
import React from "react";

function Content() {
  const userInfo = useSelector((state) => state.authSlice.userInfo);
  const navigate = useNavigate();
  const { posts } = usePosts();

  return (
    <div style={{ margin: "10px" }}>
      <div> ⬇️ 나의 매거진 ⬇️</div>
      {posts
        ?.filter((user) => user.uid === userInfo.uid)
        .map((item) => {
          return (
            <S.TempDiv
              key={item.id}
              onClick={() => navigate(`/post/${item.id}`)}
            >
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
}

export default Content;
