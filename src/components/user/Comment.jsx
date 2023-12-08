import React, { useRef, useState } from 'react';
import { useComments } from 'hooks/useComments';
import { getFormattedDate } from 'utils/date';
import * as S from '../../styles/user/Comment.styled';

const Comment = (props) => {
  const commentRef = useRef();
  const editCommentRef = useRef();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const [isEditing, setEditing] = useState({});
  JSON.parse(localStorage.getItem('ALL_DATA'));

  const { comments, isLoading, addComment, updateComment, deleteComment } = useComments();
  const commentsCount = comments ? comments.filter((v) => v.id === props.id) : [];

  const addCommentHandler = (e) => {
    e.preventDefault();
    if (!userInfo) return alert('댓글을 작성하시려면 로그인이 필요합니다.');

    addComment({
      id: props.id,
      comment: commentRef.current.value,
      email: userInfo.email,
      nickname: userInfo.nickname,
      image: userInfo.image,
      date: getFormattedDate(new Date())
    });
    commentRef.current.value = '';
  };

  const updateCommentHandler = (data) => {
    const updateData = { comment: editCommentRef.current.value, isEditing: false };
    updateComment({ id: data.uid, updateData });
    setEditing((prev) => ({ ...prev, [data.uid]: false }));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <S.CommentWrapper>
      <S.CommentTitle>{`${commentsCount.length}개의 댓글`}</S.CommentTitle>
      <div>
        <S.CommentForm>
          <S.CommentTextarea type="text" ref={commentRef} placeholder="댓글을 작성하세요"></S.CommentTextarea>
        </S.CommentForm>
        <S.ButtonDiv>
          <S.CommentButton type="submit" onClick={addCommentHandler}>
            댓글 작성
          </S.CommentButton>
        </S.ButtonDiv>
      </div>
      <S.CommentsList>
        {comments
          .filter((v) => v.id === props.id)
          .map((item) => (
            <S.CommentContainer key={item.uid}>
              <S.Comments>
                <S.userImg>
                  <img src={item.image} alt="사진" width={60} />
                </S.userImg>
                <S.userInfo>
                  <p>{item.nickname}</p>
                  <p>{item.date}</p>
                </S.userInfo>
              </S.Comments>
              <S.TextWrapper>
                {isEditing[item.uid] ? (
                  <S.CommentTextarea ref={editCommentRef} type="text" defaultValue={item.comment}></S.CommentTextarea>
                ) : (
                  <p>{item.comment}</p>
                )}
              </S.TextWrapper>
              {userInfo && userInfo.email === item.email && (
                <S.ButtonDiv>
                  {isEditing[item.uid] ? (
                    <>
                      <S.UpdateButton onClick={() => updateCommentHandler(item)}>저장</S.UpdateButton>
                      <S.RollbackButton onClick={() => setEditing((prev) => ({ ...prev, [item.uid]: false }))}>
                        취소
                      </S.RollbackButton>
                    </>
                  ) : (
                    <>
                      <S.UpdateButton onClick={() => setEditing((prev) => ({ ...prev, [item.uid]: true }))}>
                        수정
                      </S.UpdateButton>
                      <S.RollbackButton onClick={() => deleteComment(item.uid)}>삭제</S.RollbackButton>
                    </>
                  )}
                </S.ButtonDiv>
              )}
            </S.CommentContainer>
          ))}
      </S.CommentsList>
    </S.CommentWrapper>
  );
};

export default Comment;
