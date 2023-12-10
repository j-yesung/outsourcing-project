import styled from 'styled-components';

export const Wrapper = styled.div`
  top: 50%;
  left: 50%;
  width: 305px;
  padding: 20px;
  max-width: 100%;
  line-height: 2rem;
  border-radius: 10px;
  position: absolute;
  box-sizing: border-box;
  border: 1px solid #ccc;
  background-color: #fff;
  box-shadow: 2px 2px 8px #ccc;
  transform: translate(-50%, -50%);
  height: ${(props) => (props.$isWidth ? '200px' : '')};

  a {
    color: black;
    font-size: 12px;
    text-decoration: none;
  }
`;
export const Logo = styled.h1`
  display: flex;
  cursor: pointer;
  font-size: 30px;
  margin-bottom: 10px;
  justify-content: center;
  font-family: 'JalnanGothic';
`;
export const Form = styled.form`
  /* gap: 15px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
export const Input = styled.input`
  width: 100%;
  height: 35px;
  font-size: 13px;
  padding-left: 8px;
  border-radius: 3px;
  margin: 7px 0px 5px;
  background-color: #fafafa;
  border: 1px solid #dbdbdb;
`;
export const Button = styled.button`
  width: 100%;
  height: 30px;
  border: none;
  outline: none;
  margin: 20px 0px 10px 0px;
  border-radius: 5px;
  color: ${(props) => (props.$active ? 'gray' : 'white')};
  background-color: ${(props) => (props.$active ? '#F5F7F8' : '#e31c5f')};
`;
export const LinkWrapper = styled.div`
  text-align: center;
  margin-top: 15px;
`;
export const Caption = styled.p`
  color: #be3144;
  font-size: 12px;
`;
