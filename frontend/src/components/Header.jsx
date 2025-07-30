import React from 'react';
import ProfileComponent from './ProfileComponent';
import NotificationBell from './NotificationBell';

export default function Header({ user, onLogout }) {
  return (
    <div className="app-header">
      <div className="header-left">
        <h1>📋 E-Attendance Register</h1>
      </div>
      <div className="header-right">
        <NotificationBell />
        <ProfileComponent user={user} onLogout={onLogout} />
      </div>
    </div>
  );
}