import styled from 'styled-components';

export const PostContainer = styled.div`
  background-color: #f0f0f0;
  width: 100%;
  height: 100%;
  padding: 10px 0;
  cursor: pointer;
`;
export const PostWrapper = styled.div`
  width: 75%;
  max-width: 940px;
  min-width: 850px;
  height: 100%;
  margin: auto;
  border-radius: 20px;
  background-color: white;
`;

export const PostList = styled.li`
  padding: 0 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 200px;
  margin: auto;
  gap: 40px;
  &:hover {
    background-color: #f0f0f099;
    /* #c2e0f04f; */
  }
`;
export const PostTitle = styled.div`
  color: rgb(44, 135, 241);
  font-size: 22px;
  height: 30px;
  margin: 0 auto;
  font-weight: 1000;
  line-height: 120%;
  
`;
export const PostContent = styled.div`
  height: 135px;
  margin: auto;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  max-height: 75px;
  font-weight: 400;
  line-height: 132%;
  font-size: 15px;
  padding-top: 20px;
`;
export const PostDate = styled.div`
  height: 20;
  margin: 0 auto;
  color: gray;
  margin-top: 20px;
`;
export const PostTitleContentsDate = styled.div``;

export const Postimge = styled.div`
  width: 150px;
  height: 150px;
  text-align: center;
  & img {
    width: 150px;
    height: 150px;
  }
`;
