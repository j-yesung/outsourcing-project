import useKakaoMap from 'hooks/useKakaoMap';
import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import * as S from '../../styles/pages/Detail.styled';
import { addToMapListDatabase } from 'api/firebase/firebase';
import { ExtractCategoryNames } from 'utils/regex';
import { useSelector } from 'react-redux';

const MapList = () => {
  const params = useParams();
  const mapRef = useRef(null);
  const getItem = JSON.parse(localStorage.getItem('mapInfo'));
  const fnbData = useSelector((state) => state.mapInfoSlice.fnbInfo);
  const findData = getItem.find((data) => data.id === params.id);
  const homeData = fnbData.find((data) => data.id === params.id);
  const originData = findData === undefined ? homeData : findData;

  useKakaoMap(originData, mapRef);
  useEffect(() => {
    addToMapListDatabase(originData, ExtractCategoryNames(originData));
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
              </S.PlaceInfo>
            </S.DetailWrapper>
          </S.TopWrapper>
          <hr />
        </>
      ) : (
        <div>...loading</div>
      )}
    </>
  );
};

export default MapList;
