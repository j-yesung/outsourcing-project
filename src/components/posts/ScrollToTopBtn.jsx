import React from 'react';
import styled from 'styled-components';
function ScrollToTopBtn() {
  const handleClick = () => {
    if (!window.scrollY) return;
    // 현재 위치가 이미 최상단일 경우 return

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  return <Container onClick={handleClick}>TOP</Container>;
}

export default ScrollToTopBtn;

const Container = styled.button`
  position: fixed;
  top: 50%;
  right: 30px;
  width: 60px;
  height: 60px;
  transform: translateY(300px);
  background-color: #e31c5f;
  border-radius: 50%;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: -0.28px;
  text-align: center;
  color: #fff;
  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.16);
  cursor: pointer;
  z-index: 99999;
  border: 5px solid white;
`;
