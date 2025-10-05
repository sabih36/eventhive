
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { UserRole } from '../types';

interface PrivateRouteProps {
  // FIX: Replaced JSX.Element with React.ReactElement to resolve "Cannot find namespace 'JSX'" error.
  children: React.ReactElement;
  allowedRoles: UserRole[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/auth" state={{ from: location, isLogin: true }} replace />;
  }
  
  if (!allowedRoles.includes(user.role)) {
    // Optional: could navigate to an "Unauthorized" page
    // For now, redirecting to home
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
