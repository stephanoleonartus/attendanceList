import React from 'react';
import { useAuth } from '../auth/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>
      <p>Welcome, {user?.name}</p>
      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Employees</h3>
          <p>0</p>
        </div>
        <div className="stat-card">
          <h3>Active Today</h3>
          <p>0</p>
        </div>
        <div className="stat-card">
          <h3>Locations</h3>
          <p>0</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;