import useKakaoMap from 'hooks/useKakaoMap';
import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import * as S from '../../styles/pages/Detail.styled';
import { addToMapListDatabase } from 'api/firebase/firebase';

const MapList = () => {
  const params = useParams();
  const getItem = JSON.parse(localStorage.getItem('mapInfo'));
  const findData = getItem.find((data) => data.id === params.id);
  const mapRef = useRef(null);
  const DocId = findData.id; // 문서 ID 지정
  console.log('findData: ', findData);

  useKakaoMap(findData, mapRef);
  addToMapListDatabase(findData, DocId);

  return (
    <>
      {findData !== null ? (
        <>
          <S.TopWrapper>
            <div ref={mapRef} style={{ width: '300px', height: '200px', borderRadius: '20px' }} />
            <S.DetailWrapper>
              <S.PlaceName>{findData.place_name}</S.PlaceName>
              <S.PlaceInfo>
                <span>{findData.road_address_name}</span>
                <span>{findData.address_name}</span>
                <span>{findData.phone}</span>
              </S.PlaceInfo>
            </S.DetailWrapper>
          </S.TopWrapper>
          <hr />
        </>
      ) : (
        <div>loading...</div>
      )}
    </>
  );
};

export default MapList;
