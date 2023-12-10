import styled from 'styled-components';
import { TopWrapper } from 'styles/pages/Profile.styled';

export const Wrapper = styled(TopWrapper)`
  padding: 20px 20px 20px 40px;
`;
export const Container = styled.div`
  margin: 20px auto;
  width: 800px;
`;
export const Title = styled.span`
  font-size: 24px;
  font-weight: bold;
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
  margin: 5px;
  padding: 5px;
  font-size: 12px;
  cursor: pointer;
  line-height: 1.2;
  border-bottom: 1px solid #ccc;

  &:hover {
    transition: 0.5s;
    background-color: #f1efef;
    transform: translateY(-2px);
    box-shadow: 2px 2px 8px #ccc;
  }
`;
