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
export const SearchContainer = styled.div`
  display: flex;
  height: 100%;
`;
export const MapContainer = styled.div`
  display: ${(props) => (props.$isMapOpen ? 'block' : 'none')};
  transition: 2s;
  border-radius: 20px;
  width: 600px;
  height: 400px;
  box-shadow: 10px;
  box-shadow: 2px 2px 8px #ccc;
`;
export const ResultContainer = styled.div`
  max-height: 400px;
  overflow-y: auto;
  height: 100vh;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  margin-left: 10px;
  display: ${(props) => (props.$showResults ? 'block' : 'none')};
`;
export const ResultItem = styled.div`
  cursor: pointer;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  &:hover {
    background-color: #f5f5f5;
    box-shadow: 2px 2px 8px #ccc;
  }
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
  gap: 10px;
  display: flex;
  margin-bottom: 20px;
  justify-content: center;
`;
export const SearchButton = styled.button`
  color: #fff;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  padding: 5px 10px;
  border-radius: 8px;
  display: inline-block;
  background-color: ${(props) => props.$color};

  &:hover {
    box-shadow: 2px 2px 8px #ccc;
  }
`;
export const ModalBox = styled.div`
  display: ${(props) => (props.$isOpen ? 'block' : 'none')};
  width: 600px;
  height: 400px;
`;
