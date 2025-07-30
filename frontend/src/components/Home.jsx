import React, { useState, useEffect } from 'react';
import Header from './Header';
import WorkHoursCard from './WorkHoursCard';
import AttendanceCard from './AttendanceCard';
import LocationCard from './LocationCard';

// Main App Component
export default function Home() {
  const [user, setUser] = useState(null);
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [allowedLocation, setAllowedLocation] = useState(null);
  const [locationVerified, setLocationVerified] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize app and load user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await fetch('/api/users/employees/', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });
        const userData = await response.json();
        setUser(userData[0]); // Assuming the first user is the logged in user
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    // TODO: Call Django logout endpoint
    // fetch('/api/auth/logout/', { method: 'POST' });
    // localStorage.removeItem('authToken');

    setUser(null);
    setIsAuthenticated(false);
    setCheckInTime(null);
    setCheckOutTime(null);
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="app-layout">
        <div className="content-area">
          <div className="auth-container">
            <h2>Please Login</h2>
            <p>Redirecting to login page...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="loading-container">
        <div className="mini-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="app-layout">

      <Header user={user} onLogout={handleLogout} />
      
      <div className="main-content">
        <div className="content-area">
          <div className="dashboard-welcome">
            <h2>Welcome back, {user.user.first_name} {user.user.last_name}! 👋</h2>
            <p>{getCurrentDate()}</p>
            <div className="user-meta">
              <span className="meta-item">
                <strong>Department:</strong> {user.department}
              </span>
              <span className="meta-item">
                <strong>ID:</strong> {user.id}
              </span>
              <span className="meta-item">
                <strong>Role:</strong>
                <span className={`role-badge ${user.role.toLowerCase()}`}>
                  {user.role}
                </span>
              </span>
            </div>
          </div>

          <div className="dashboard-stats">
            <div className="stat-card quick-stat">
              <h3>📅 This Week</h3>
              <p>32h 15m</p>
              <span className="stat-subtitle">Total Hours</span>
            </div>
            <div className="stat-card quick-stat">
              <h3>📊 This Month</h3>
              <p>22 days</p>
              <span className="stat-subtitle">Present Days</span>
            </div>
            <div className="stat-card quick-stat">
              <h3>⭐ Status</h3>
              <p className="status-excellent">Excellent</p>
              <span className="stat-subtitle">Attendance</span>
            </div>
          </div>
          
          <div className="home-grid">
            <WorkHoursCard
              checkInTime={checkInTime}
              checkOutTime={checkOutTime}
            />
            <LocationCard
              allowedLocation={allowedLocation}
              onLocationVerified={setLocationVerified}
            />
            <AttendanceCard
              onCheckIn={setCheckInTime}
              onCheckOut={setCheckOutTime}
              locationVerified={locationVerified}
            />
          </div>
        </div>
      </div>
    </div>
  );
}