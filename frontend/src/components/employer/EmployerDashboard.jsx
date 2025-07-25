import React from 'react';
import { useAuth } from '../auth/AuthContext';
import TodayAttendance from './TodayAttendance';
import Reports from './Reports';

const EmployerDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard">
      <h1>Manager Dashboard</h1>
      <p>Welcome, {user?.name}</p>
      <div className="dashboard-content">
        <TodayAttendance />
        <Reports />
      </div>
    </div>
  );
};

export default EmployerDashboard;