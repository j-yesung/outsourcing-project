import React, { useRef, useState } from 'react';
import { useComments } from 'hooks/useComments';
import { getFormattedDate } from 'utils/date';

const Comment = (props) => {
  const commentRef = useRef();
  const editCommentRef = useRef();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  JSON.parse(localStorage.getItem('ALL_DATA'));
  const [isEditing, setEditing] = useState({});

  const { comments, isLoading, addComment, updateComment, deleteComment } = useComments();
  console.log('🚀 ~ file: Comment.jsx:16 ~ Comment ~ comments:', comments);

  const addCommentHandler = (e) => {
    e.preventDefault();
    if (!userInfo) return alert('댓글을 작성하시려면 로그인이 필요합니다.');

    addComment({
      id: props.id,
      comment: commentRef.current.value,
      email: userInfo.email,
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
    <>
      <div>Comment</div>
      <br></br>
      <div>Box</div>
      <>
        <form>
          <input type="text" ref={commentRef} />
          <button type="submit" onClick={addCommentHandler}>
            댓글 작성
          </button>
        </form>
      </>
      <br></br>
      <ul>
        {comments
          .filter((v) => v.id === props.id)
          .map((item) => (
            <li key={item.uid}>
              {isEditing[item.uid] ? (
                <input ref={editCommentRef} type="text" defaultValue={item.comment} />
              ) : (
                <div>{item.comment}</div>
              )}

              {userInfo && userInfo.email === item.email && (
                <div>
                  {isEditing[item.uid] ? (
                    <>
                      <div>
                        <button onClick={() => updateCommentHandler(item)}>저장</button>
                        <button onClick={() => setEditing((prev) => ({ ...prev, [item.uid]: false }))}>취소</button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <button onClick={() => setEditing((prev) => ({ ...prev, [item.uid]: true }))}>수정</button>
                        <button onClick={() => deleteComment(item.uid)}>삭제</button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </li>
          ))}
      </ul>
    </>
  );
};

export default Comment;
