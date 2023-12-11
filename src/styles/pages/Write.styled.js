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

export const PostThumbnailLabel = styled.label`
  display: inline-block;
  padding: 10px 20px;
  color: #fff;
  vertical-align: middle;
  background-color: #999999;
  cursor: pointer;
  height: 40px;
  margin-left: 14px;
`;
export const PostThumbnailInput = styled.input`
  display: inline-block;
  height: 40px;
  padding: 0 10px;
  vertical-align: middle;
  border: 1px solid #dddddd;
  width: 84%;
  color: #999999;
`;
export const PostThumbnailChkInput = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
`;
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
  margin-top: 15px;
  &:hover {
    background-color: orange;
  }
`;
