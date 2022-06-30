import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const privateRoute = () => {
  const token = localStorage.getItem('token');
  if (token) {
    return <Outlet />;
  }
  return <Navigate to="/auth/login" />;
};

export default privateRoute;
