import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, user, allowedRoles = ['admin'] }) => {
  if (!user) {
    // Not logged in, redirect to login page
    return <Navigate to="/signin" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // User's role is not authorized, redirect to home page
    return <Navigate to="/" replace />;
  }

  // Authorized, render component
  return children;
};

export default ProtectedRoute; 