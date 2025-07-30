import React, { useState } from 'react';

// Profile Component
export default function ProfileComponent({ user, onLogout }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    // TODO: Integrate with Django backend
    // await fetch('/api/auth/logout/', { method: 'POST' });
    onLogout();
    console.log('Logging out...');
  };

  const handleProfileClick = (e) => {
    e.preventDefault();
    console.log('Navigate to profile');
  };

  const handleSettingsClick = (e) => {
    e.preventDefault();
    console.log('Navigate to settings');
  };

  const handleReportsClick = (e) => {
    e.preventDefault();
    console.log('Navigate to reports');
  };

  return (
    <div className="profile-container">
      <div className="profile-dropdown">
        <div className="profile-trigger" onClick={toggleDropdown}>
          <div className="profile-avatar">
            <img 
              src={user?.avatar || "https://via.placeholder.com/40x40/3498db/ffffff?text=U"}
              alt="Profile" 
              className="avatar-image"
            />
          </div>
          <div className="profile-info">
            <span className="profile-name">{user?.name || 'User'}</span>
            <span className="profile-role">
              {user?.role || 'Employee'}
              <span className={`role-badge ${user?.role?.toLowerCase() || 'employee'}`}>
                {user?.role || 'EMP'}
              </span>
            </span>
          </div>
          <div className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`}>
            ▼
          </div>
        </div>

        {isDropdownOpen && (
          <div className="dropdown-menu">
            <button className="dropdown-item" onClick={handleProfileClick}>
              <span className="dropdown-icon">👤</span>
              My Profile
            </button>
            <button className="dropdown-item" onClick={handleSettingsClick}>
              <span className="dropdown-icon">⚙️</span>
              Settings
            </button>
            <button className="dropdown-item" onClick={handleReportsClick}>
              <span className="dropdown-icon">📊</span>
              My Reports
            </button>
            <div className="dropdown-divider"></div>
            <button className="dropdown-item logout" onClick={handleLogout}>
              <span className="dropdown-icon">🚪</span>
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
