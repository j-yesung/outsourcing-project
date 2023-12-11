import Layout from 'layout/Layout';
import Detail from 'pages/Detail';
import Home from 'pages/Home';
import Login from 'pages/Login';
import Post from 'pages/Post';
import PostDetail from 'pages/PostDetail';
import Profile from 'pages/Profile';
import Signup from 'pages/Signup';
import Write from 'pages/Write';
import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/write" element={<Write />} />
          <Route path="/mypage" element={<Profile />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/post" element={<Post />} />
          <Route path="/post/:id" element={<PostDetail />} />
        </Route>
        <Route path="*" element={<Navigate replace to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
