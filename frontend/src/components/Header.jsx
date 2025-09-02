import React from 'react';
import ProfileDropdown from './ProfileDropdown';
import NotificationBell from './NotificationBell';

export default function Header() {
  return (
    <div className="app-header">
      <div className="header-left">
        <h1>📋 E-Attendance System</h1>
      </div>
      
      <div className="header-right">
        <NotificationBell />
        <ProfileDropdown />
      </div>
    </div>
  );
}