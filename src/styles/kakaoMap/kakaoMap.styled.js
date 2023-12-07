import styled from 'styled-components';

export const SearchWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;
export const GuideText = styled.span`
  display: flex;
  font-size: 14px;
  margin-bottom: 10px;
`;
export const SearchListWrapper = styled.div`
  gap: 10px;
  display: flex;
  flex-wrap: wrap; // 수평 스크롤 구현 완료되면 지워줍니다.
  align-items: center;
  justify-content: center;
`;
export const SearchList = styled.div`
  width: 200px;
  height: 200px;
  padding: 30px;
  cursor: pointer;
  border-radius: 15px;
  border: 1px solid black;
  &:hover {
    background-color: aliceblue;
  }
`;
export const SearchElement = styled.div`
  gap: 10px;
  display: flex;
`;
