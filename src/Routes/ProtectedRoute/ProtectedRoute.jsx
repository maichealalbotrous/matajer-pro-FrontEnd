import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext/AuthContext';
const ProtectedRoute = ({ children }) => {
  const { authenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#fcfcfc]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0f172a]"></div>
      </div>
    );
  }

  if (authenticated) {

    return <Navigate to="/Auth" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;