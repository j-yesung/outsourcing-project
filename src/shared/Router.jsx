import Layout from 'layout/Layout';
import Home from 'pages/Home';
import Login from 'pages/Login';
import Signup from 'pages/Signup';
import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Layout />}>
          <Route path="/home" element={<Home />} />
        </Route>
        <Route path="*" element={<Navigate replace to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
