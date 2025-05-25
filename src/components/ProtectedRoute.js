import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    alert('請先登入');
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
