import React, { useRef, useState } from 'react';
import userIcon from '../../assets/user.svg';
import { fileUpload } from 'api/firebase';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import NickName from 'components/user/NickName';
import * as S from '../../styles/pages/Profile.styled';
import { setUserInfo } from 'store/modules/authSlice';

export const ImgUpload = () => {
  const imgRef = useRef();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.authSlice.userInfo);
  const [img, setImg] = useState(userInfo.image || userIcon);
  const [selectFile, setSelectFile] = useState(null);

  // 파일 선택
  const handleImageUpload = (e) => {
    if (e.target.files.length === 0) return;

    // 미리보기
    const reader = new FileReader();
    reader.readAsDataURL(imgRef.current.files[0]);
    reader.onloadend = () => {
      setImg(reader.result);
    };
    setSelectFile(imgRef.current.files[0]);
  };

  // 업로드
  const uploadHandler = async () => {
    if (!selectFile) return toast.error('이미지를 선택해 주세요.');
    toast.success('이미지 업데이트 완료');
    const downloadURL = await fileUpload(selectFile);
    dispatch(setUserInfo({ ...userInfo, image: downloadURL }));
  };

  return (
    <>
      <S.Wrapper>
        <S.Image src={img} alt="사진" />
        <S.ButtonBox>
          <NickName /> {/**  */}
          <input type="file" ref={imgRef} onChange={handleImageUpload} style={{ display: 'none' }} />
          <S.UploadButton onClick={() => imgRef.current.click()}>파일 찾기</S.UploadButton>
          <S.UploadButton onClick={uploadHandler}>업로드</S.UploadButton>
        </S.ButtonBox>
      </S.Wrapper>
      <ToastContainer autoClose={1000} />
    </>
  );
};
