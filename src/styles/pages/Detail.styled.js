const { default: styled } = require('styled-components');

export const TopWrapper = styled.div`
  display: inline-flex;
  margin-top: 30px;
  border-radius: 10px;
`;
export const DetailWrapper = styled.div`
  display: flex;
  padding: 80px 0px 0px 30px;
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
`;
