import React from 'react';
import { useAuth } from '../auth/AuthContext';

const EmployeeDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard">
      <h1>Employee Dashboard</h1>
      <p>Welcome, {user?.name}</p>
      <div className="quick-stats">
        <div className="stat-card">
          <h3>Today's Status</h3>
          <p>Not Checked In</p>
        </div>
        <div className="stat-card">
          <h3>This Month</h3>
          <p>20/22 Days Present</p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;