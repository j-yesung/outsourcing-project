import React, { useRef, useState } from 'react';
import userIcon from '../../assets/user.svg';
import { fileUpload, getUser } from 'api/firebase';
import { useDispatch } from 'react-redux';
import { setUserInfo } from 'store/modules/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ImgUpload = () => {
  const imgRef = useRef();
  const dispatch = useDispatch();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
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

  const onClearImage = async () => {
    // if (window.confirm('이미지를 삭제하시겠습니까?')) {
    //   setDownloadURL(userIcon);
    //   inputRef.current.value = null;
    //   const imageRef = ref(storage, downloadURL);
    //   try {
    //     await deleteObject(imageRef);
    //     updateProfile(authUser, { photoURL: userIcon })
    //       .then(() => console.log('프로필 이미지가 제거되었습니다.'))
    //       .catch(error => console.error('프로필 이미지를 제거 실패했습니다.', error));
    //   } catch (error) {
    //     console.error('공습 경보!', error);
    //   }
    // }
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
