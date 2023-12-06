import React from 'react';
import Header from './Header';
import { Navigate, Outlet } from 'react-router-dom';
import Footer from './Footer';

const Layout = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const isLoggedIn = !!userInfo; // 로그인 여부 확인

  return (
    <>
      {isLoggedIn ? (
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      ) : (
        <Navigate to="/" replace />
      )}
    </>
  );
};

export default Layout;
