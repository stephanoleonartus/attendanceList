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
    // TODO: Check authentication status
    // const token = localStorage.getItem('authToken');
    // if (token) {
    //   fetchUserData();
    // }

    // Mock user data for demonstration
    const mockUser = {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@company.com',
      role: 'Employee', // HR, Department, Employee
      avatar: 'https://via.placeholder.com/40x40/3498db/ffffff?text=JD',
      department: 'Engineering',
      employeeId: 'EMP001'
    };

    // Mock allowed location (would come from Django admin)
    const mockLocation = {
      name: 'TechCorp Headquarters',
      address: '123 Innovation Drive, Tech City, TC 12345',
      latitude: -6.7924,
      longitude: 39.2083
    };

    setUser(mockUser);
    setAllowedLocation(mockLocation);
    setIsAuthenticated(true);
  }, []);

  // Fetch user data from Django backend
  const fetchUserData = async () => {
    try {
      // TODO: Replace with actual Django API endpoint
      // const response = await fetch('/api/user/profile/', {
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      //     'Content-Type': 'application/json',
      //   }
      // });
      // const userData = await response.json();
      // setUser(userData);

      // Also fetch allowed locations for this user
      // const locationsResponse = await fetch('/api/user/allowed-locations/');
      // const locationsData = await locationsResponse.json();
      // setAllowedLocation(locationsData[0]); // Assuming first location is primary

    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

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
            <h2>Welcome back, {user.name}! 👋</h2>
            <p>{getCurrentDate()}</p>
            <div className="user-meta">
              <span className="meta-item">
                <strong>Department:</strong> {user.department}
              </span>
              <span className="meta-item">
                <strong>ID:</strong> {user.employeeId}
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