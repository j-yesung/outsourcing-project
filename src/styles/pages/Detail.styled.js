const { default: styled } = require('styled-components');

export const TopWrapper = styled.div`
  display: inline-flex;
  border-radius: 10px;
  margin: 30px 0 0 530px;
`;
export const DetailWrapper = styled.div`
  display: flex;
  padding: 60px 0px 0px 30px;
  flex-direction: column;
  font-family: 'LINESeedKR-Bd';
`;
export const PlaceName = styled.h1`
  font-size: 30px;
  margin-bottom: 20px;
`;
export const PlaceInfo = styled.div`
  gap: 10px;
  display: flex;
  font-size: 15px;
  flex-direction: column;
  a {
    color: black;
    text-decoration: none;
    &:hover {
      color: #6db9ef;
    }
  }
`;
