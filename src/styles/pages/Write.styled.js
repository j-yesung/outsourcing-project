import styled from 'styled-components';

export const Container = styled.div`
  padding-top: 10px;
  width: 100vw;
  height: 100vh;
  background-color: #f0f0f0;
`;

export const PostInput = styled.input`
  border: none;
  font-size: 36px;
  width: 100%;
  padding: 20px;
  &::placeholder {
    color: #dcdcdc;
  }
  &:focus {
    outline: none;
  }
`;
