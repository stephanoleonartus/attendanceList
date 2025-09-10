import React from 'react';
import { Link } from 'react-router-dom';
import ProfileDropdown from './ProfileDropdown';
import NotificationBell from './NotificationBell';

export default function Header() {
  return (
    <div className="app-header">
      <div className="header-left">
        <Link to="/home" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h1>📋 E-Attendance System</h1>
        </Link>
      </div>
      
      <div className="header-right">
        <NotificationBell />
        <ProfileDropdown />
      </div>
    </div>
  );
}