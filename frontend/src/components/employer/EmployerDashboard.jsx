import React from 'react';
import { useAuth } from '../auth/AuthContext';

const EmployerDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard">
      <h1>Manager Dashboard</h1>
      <p>Welcome, {user?.name}</p>
      <div className="stats-container">
        <div className="stat-card">
          <h3>Team Members</h3>
          <p>15</p>
        </div>
        <div className="stat-card">
          <h3>Present Today</h3>
          <p>12</p>
        </div>
        <div className="stat-card">
          <h3>Late Today</h3>
          <p>2</p>
        </div>
        <div className="stat-card">
          <h3>Absent Today</h3>
          <p>1</p>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;