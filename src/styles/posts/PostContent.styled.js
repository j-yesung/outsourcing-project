import styled from 'styled-components';
import { SearchButton } from 'styles/kakaoMap/kakaoMap.styled';
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
  gap: 10px;
  display: flex;
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

export const UpdateButton = styled(SearchButton)`
  width: 60px;
  padding: 5px;
  margin-bottom: 10px;
`;

export const LikeButton = styled.button`
  border: 0;
  background-color: transparent;
  float: right;
  margin-top: 20px;
`;
export const LikeImg = styled.img`
  -webkit-transform: scale(1);
  transform: scale(1);
  -webkit-transition: 0.5s ease-in-out;
  transition: 0.5s ease-in-out;
  &:hover {
    -webkit-transform: scale(1.3);
    transform: scale(1.3);
  }
`;
