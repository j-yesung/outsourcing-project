import React, { useRef, useState } from 'react';
import userIcon from '../../assets/user.svg';
import { fileUpload } from 'api/firebase';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';

export const ImgUpload = () => {
  const imgRef = useRef();
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
    toast.success('이미지 업데이트 완료');
    if (!selectFile) return toast.error('이미지를 선택해 주세요.');
    const downloadURL = await fileUpload(selectFile);
    localStorage.setItem('userInfo', JSON.stringify({ ...userInfo, image: downloadURL }));
  };

  return (
    <>
      <img src={img} width={50} alt="사진" />
      <input type="file" ref={imgRef} onChange={handleImageUpload} />
      <button onClick={uploadHandler}>업로드</button>
      <ToastContainer autoClose={1000} />
      {/* <input ref={imgRef} onChange={handleImageUpload} type="file" style={{ display: 'none' }} /> */}
    </>
  );
};
