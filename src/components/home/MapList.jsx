import useKakaoMap from 'hooks/useKakaoMap';
import React, { useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import * as S from '../../styles/pages/Detail.styled';
import { addToMapListDatabase } from 'api/firebase';
import { ExtractCategoryNames } from 'utils/regex';
import Comment from 'components/user/Comment';

const MapList = () => {
  const params = useParams();
  const mapRef = useRef(null);

  const searchData = JSON.parse(localStorage.getItem('mapInfo')).find((data) => data.id === params.id);
  const detailData = JSON.parse(localStorage.getItem('ALL_DATA')).find((data) => data.id === params.id);
  const originData = searchData === undefined ? detailData : searchData;

  useKakaoMap(originData, mapRef);
  useEffect(() => {
    // 예외처리
    if (originData.id === params.id) {
      // console.log('추가 안함..');
      return;
    } else {
      addToMapListDatabase(originData, ExtractCategoryNames(originData));
      // console.log('추가..');
    }
  }, []);

  return (
    <>
      {originData !== undefined ? (
        <>
          <S.TopWrapper>
            <div ref={mapRef} style={{ width: '300px', height: '200px', borderRadius: '20px' }} />
            <S.DetailWrapper>
              <S.PlaceName>{originData.place_name}</S.PlaceName>
              <S.PlaceInfo>
                <span>{originData.road_address_name}</span>
                <span>{originData.address_name}</span>
                <span>{originData.phone}</span>
                <Link to={originData.place_url} target="_blank" rel="noopener noreferrer">
                  👉 상세 페이지로 이동
                </Link>
                {/* <a href={originData.place_url}></a> */}
              </S.PlaceInfo>
            </S.DetailWrapper>
          </S.TopWrapper>
          <hr />
          <Comment id={originData.id} /> {/* 댓글 컴포넌트 */}
        </>
      ) : (
        <div>...loading</div>
      )}
    </>
  );
};

export default MapList;
