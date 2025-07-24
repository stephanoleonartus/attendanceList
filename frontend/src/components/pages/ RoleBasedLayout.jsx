import React from 'react';
import { useAuth } from '../auth/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';
import SideBar from './SideBar';
import Header from './Header';
import Spinner from './Spinner';

const RoleBasedLayout = ({ allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) return <Spinner />;

  if (!user) return <Navigate to="/login" replace />;

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return (
    <div className="app-layout">
      <Header />
      <div className="main-content">
        <SideBar />
        <div className="content-area">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default RoleBasedLayout;