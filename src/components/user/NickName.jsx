import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as S from '../../styles/pages/Profile.styled';
import { nicknameUpdate } from 'api/firebase';
import { setUserInfo } from 'store/modules/authSlice';

const NickName = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.authSlice.userInfo);
  const [isEditing, setEditing] = useState(false);
  const nicknameRef = useRef();

  const onClickChangeNickName = async () => {
    const nickname = nicknameRef.current.value;
    setEditing(!isEditing);
    nicknameUpdate(nickname);
    dispatch(setUserInfo({ ...userInfo, nickname }));
  };

  return (
    <>
      {isEditing ? (
        <S.EditNameInput ref={nicknameRef} ype="text" maxLength={6} defaultValue={userInfo.nickname} />
      ) : (
        <S.Nickname>{userInfo.nickname}</S.Nickname>
      )}
      {isEditing ? (
        <S.UploadButton onClick={onClickChangeNickName}>저장</S.UploadButton>
      ) : (
        <S.UploadButton onClick={() => setEditing(!isEditing)}>닉네임 변경</S.UploadButton>
      )}
    </>
  );
};

export default NickName;
