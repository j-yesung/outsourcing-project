import styled from 'styled-components';

export const Container = styled.div`
  margin: 20px auto;
  width: 800px;
`;
export const PostHeader = styled.div`
  line-height: 3;
  border-bottom: 1px solid #dcdcdc;
`;
export const PostTitle = styled.h1`
  font-size: 24px;
  font-weight: bolder;
`;
export const PostTitleEdit = styled.input`
  font-size: 24px;
  font-weight: bolder;
  width: 80%;
  border: none;
  border-bottom: 1px solid #dcdcdc;
`;

export const PostDate = styled.div``;

export const PostBtn = styled.div`
  & button {
    background-color: transparent;
    margin: 0 10px;
  }
`;

export const PostContent = styled.div`
  margin: 50px 0;
`;
