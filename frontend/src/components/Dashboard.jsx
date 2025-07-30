import React from 'react';

export default function Dashboard({ user }) {
  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
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
    </div>
  );
}