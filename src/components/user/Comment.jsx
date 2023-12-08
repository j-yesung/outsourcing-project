import { addToCommentDatabase, deleteComment, getComments, updatingComment } from 'api/firebase';
import React, { useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getFormattedDate } from 'utils/date';

const Comment = (props) => {
  const commentRef = useRef();
  const editCommentRef = useRef();
  const queryClient = useQueryClient();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  JSON.parse(localStorage.getItem('ALL_DATA'));
  const [isEditing, setEditing] = useState({});

  // React Query 댓글 조회
  const { data: comments, isLoading } = useQuery('comments', getComments);

  // React Query 댓글 추가
  const addMutation = useMutation(addToCommentDatabase, {
    onSuccess: () => {
      queryClient.invalidateQueries('comments');
    }
  });
  // React Query 댓글 수정
  const updateCommentMutation = useMutation((data) => updatingComment(data.uid, { comment: data.comment }), {
    onSuccess: () => {
      queryClient.invalidateQueries('comments');
    }
  });

  // React Query 댓글 삭제
  const deleteMutation = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries('comments');
    }
  });

  // 댓글 추가
  const addCommentHandler = (e) => {
    e.preventDefault();
    if (!userInfo) {
      return alert('로그인을 필요합니다!');
    }
    const newComment = {
      id: props.id,
      comment: commentRef.current.value,
      email: userInfo.email,
      date: getFormattedDate(new Date())
    };
    addMutation.mutate(newComment);
    commentRef.current.value = '';
  };

  // 댓글 수정 상태 토글
  const editToggleHandler = (data) => {
    setEditing((prev) => ({ ...prev, [data.uid]: true }));
  };

  const updateCommentHandler = (data) => {
    updateCommentMutation.mutate({
      uid: data.uid,
      comment: editCommentRef.current.value,
      isEditing: false
    });
    setEditing((prev) => ({ ...prev, [data.uid]: false }));
  };

  // 삭제
  const deleteCommentHandler = (uid) => deleteMutation.mutate(uid);

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
                        <button onClick={() => editToggleHandler(item)}>수정</button>
                        <button onClick={() => deleteCommentHandler(item.uid)}>삭제</button>
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
