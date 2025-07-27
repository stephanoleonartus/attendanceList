import React, { useState, useEffect } from 'react';
import Header from './Header';
import WorkHoursCard from './WorkHoursCard';
import AttendanceCard from './AttendanceCard';

export default function Dashboard() {
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [user, setUser] = useState(null);

  // Mock user data - replace with actual user data from your auth system
  useEffect(() => {
    // Simulate loading user data
    const mockUser = {
      name: 'John Doe',
      email: 'john.doe@company.com',
      role: 'Employee',
      avatar: 'https://via.placeholder.com/40x40/667eea/ffffff?text=JD',
      department: 'Engineering',
      employeeId: 'EMP001'
    };
    setUser(mockUser);
  }, []);

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!user) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="app-layout">
      <Header user={user} />
      
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
            <WorkHoursCard checkInTime={checkInTime} checkOutTime={checkOutTime} />
            <AttendanceCard
              onCheckIn={setCheckInTime}
              onCheckOut={setCheckOutTime}
            />
          </div>
        </div>
      </div>
    </div>
  );
}