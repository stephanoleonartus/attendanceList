import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  return (
    <div className="app-layout">
      <Header />
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
