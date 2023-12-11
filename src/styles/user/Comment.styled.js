import styled from 'styled-components';

export const CommentWrapper = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
  margin: 0 500px 0 500px;
`;
export const CommentTitle = styled.h1`
  margin-bottom: 20px;
`;
export const CommentForm = styled.div`
  display: flex;
`;
export const CommentTextarea = styled.textarea`
  width: 100%;
  resize: none;
  color: black;
  border: none;
  outline: none;
  padding: 10px;
  height: 80px;
  font-size: 15px;
  margin-bottom: 20px;
  background-color: #8b8b8b1c;
`;
export const ButtonDiv = styled.div`
  display: flex;
  padding-bottom: 30px;
  flex-direction: row-reverse;
`;
export const CommentButton = styled.button`
  color: #fff;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  padding: 10px 20px;
  border-radius: 8px;
  display: inline-block;
  background-color: #e31c5f;
`;
export const CommentContainer = styled.div`
  /* border-bottom: 1px solid #b6bbc4; */
`;
export const CommentsList = styled.ul`
  margin-top: 20px;
  padding-bottom: 15px;
`;
export const Comments = styled.li`
  display: flex;
  margin: 10px 0 10px 0;
`;
export const userImg = styled.div`
  /* display: flex; */
`;
export const userInfo = styled.div`
  padding: 10px;
`;
export const TextWrapper = styled.div`
  display: flex;
  padding: 5px;
`;
export const UpdateButton = styled(CommentButton)`
  margin-left: 10px;
`;
export const RollbackButton = styled(UpdateButton)`
  color: black;
  background-color: #f0ece5;
`;
