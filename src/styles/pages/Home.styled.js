import styled from 'styled-components';

export const HomeWrapper = styled.div`
  gap: 10px;
  width: 100vw;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;
export const FnbWrapper = styled.div`
  gap: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const FnbList = styled.div`
  gap: 10px;
  display: flex;
  flex-direction: column;
  width: 220px;
  height: 200px;
  padding: 30px;
  cursor: pointer;
  border-radius: 15px;
  border: 1px solid black;
  &:hover {
    background-color: aliceblue;
  }
`;

export const ListName = styled.p`
  font-size: 18px;
  font-family: 'JalnanGothic';
`;

export const ListCategoryName = styled.p`
  color: #e31c5f;
  font-weight: bold;
`;
