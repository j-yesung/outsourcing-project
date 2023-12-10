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

export const Container = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
`;

export const Input = styled.input`
  margin-right: 10px;
`;

export const Button = styled.button`
  margin-right: 10px;
`;
export const SearchContainer = styled.div`
  display: flex;
  height: 100%;
`;
export const MapContainer = styled.div`
  border-radius: 20px;
  width: 800px;
  height: 600px;
  box-shadow: 10px;
  box-shadow: 2px 2px 8px #ccc;
`;

export const ResultContainer = styled.div`
  max-height: 600px;
  overflow-y: auto;
  height: 100vh;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  display: ${(props) => (props.$showResults ? 'block' : 'none')};
`;

export const ResultItem = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;
export const GlobalStyle = styled.div`
  .customOverlay {
    position: absolute;
    bottom: 12px;
    left: 6px;
    background-color: white;
    border: 1px solid #ccc;
    padding: 6px;
    border-radius: 3px;
    font-size: 12px;
    white-space: nowrap;
    font-weight: 20px;
  }
`;

export const SearchBox = styled.div`
  display: flex;
  margin-bottom: 20px;
  justify-content: center;
`;
