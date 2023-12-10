import styled from 'styled-components';

export const Container = styled.div`
  padding-top: 10px;
  width: 100vw;
  height: 100vh;
  background-color: white;
`;

export const PostInput = styled.input`
  border: none;
  font-size: 50px;
  width: 100%;
  padding: 20px;
  &::placeholder {
    color: #dcdcdc;
  }
  &:focus {
    outline: none;
  }
`;

export const PostThumbnailInput = styled.input``;

export const button = styled.div`
  color: white;
  background-color: black;
  border: 1px solid #000;
  width: 90px;
  height: 38px;
  border-radius: 20px;
  box-sizing: border-box;
  cursor: pointer;
  outline: none;
  vertical-align: middle;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  margin-top: 10px;
  &:hover {
    background-color: orange;
  }
`;
