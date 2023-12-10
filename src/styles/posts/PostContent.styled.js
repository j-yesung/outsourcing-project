import styled from 'styled-components';
import { TopWrapper } from 'styles/pages/Profile.styled';

export const Wrapper = styled(TopWrapper)`
  padding: 20px 20px 20px 40px;
`;
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

export const TempDiv = styled.div`
  border: 2px solid pink;
  margin: 5px;
  padding: 5px;
  line-height: 1.2;
  font-size: 12px;
  border: '1px solid pink';
`;
