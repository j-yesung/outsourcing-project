import styled from 'styled-components';

export const HomeWrapper = styled.div`
  gap: 10px;
  width: 100vw;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;
export const FnbWrapper = styled.div`
  gap: 10px;
  display: flex;
  flex-wrap: wrap; // 수평 스크롤 구현 완료되면 지워줍니다.
  align-items: center;
  justify-content: center;
`;
export const FnbList = styled.div`
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
