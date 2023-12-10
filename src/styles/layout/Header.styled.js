import styled from 'styled-components';

export const HeaderWrapper = styled.header`
  display: flex;
  padding: 20px;
  align-items: center;
  justify-content: center;

  a {
    color: black;
    text-decoration: none;
    font-size: 15px;
    &:hover {
      color: #e31c5f;
    }
  }
`;
export const HeaderContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 560px 506px auto;
  -webkit-box-align: center;
  align-items: center;
  height: 100%;
  padding-left: 0px;
  padding-right: 0px;
  box-sizing: border-box;
`;
export const HeaderBox = styled.div`
  display: flex;
  align-items: center;
  max-width: 150px;
`;
export const HeaderLogo = styled.h1`
  cursor: pointer;
  font-size: 30px;
  font-weight: 900;
  font-family: 'JalnanGothic';
  display: flex;
  align-items: center;
`;
export const HeaderSearch = styled.div`
  max-width: 430px;
`;
export const HeaderButtons = styled.div`
  display: inline-flex;
  -webkit-box-pack: end;
  justify-content: flex-end;
  gap: 20px;
  box-sizing: border-box;
  width: 100%;
  height: 20px;
  padding-left: 24px;
  white-space: nowrap;
`;
