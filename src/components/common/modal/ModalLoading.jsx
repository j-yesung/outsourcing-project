import React from 'react';
import * as S from '../../../styles/modal/Lodaing.styled';

export const ModalLoading = ({ isOpen }) => {
  return (
    <>
      <S.Loader $isOpen={isOpen} />
    </>
  );
};
