import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  padding: 20px;
  margin-top: 20px;
  flex-direction: row;
`;
export const Image = styled.img`
  width: 380px;
  height: 300px;
  border-radius: 20px;
  box-shadow: 2px 2px 8px #ccc;
`;
export const ButtonBox = styled.div`
  gap: 10px;
  display: flex;
  padding: 20px;
  width: 180px;
  height: 200px;
  margin-top: 90px;
  flex-direction: column;
  justify-content: center;
`;
export const UploadButton = styled.button`
  color: #fff;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  padding: 10px 20px;
  border-radius: 8px;
  display: inline-block;
  background-color: #e31c5f;

  &:hover {
    box-shadow: 2px 2px 8px #ccc;
  }
`;
export const NameWrapper = styled.div`
  gap: 10px;
  display: flex;
  flex-direction: column;
`;
export const NameBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;
export const Nickname = styled.p`
  padding: 10px;
  font-size: 30px;
  min-width: 190px;
  font-family: 'LINESeedKR-Bd';
`;
export const EditNameInput = styled.input`
  width: 180px;
  outline: none;
  padding: 10px;
  font-size: 30px;
  font-family: 'LINESeedKR-Bd';
`;
export const TopWrapper = styled.div`
  display: grid;
  grid-auto-flow: dense;
  grid-auto-columns: 1100px 506px auto;
  -webkit-box-align: center;
  align-items: center;
  height: 100%;
  padding-left: 0px;
  padding-right: 0px;
  box-sizing: border-box;
  justify-content: center;
`;
