import React from 'react';
import { Link } from 'react-router-dom';
import AttendanceCard from '../components/AttendanceCard';
import { useAuth } from '../hooks/useAuth';

const DashboardPage = () => {
    const { user, logout } = useAuth();
  return (
    <div>
      <h1>Dashboard</h1>
      {user && <p>Welcome, {user.username}</p>}
      <button onClick={logout}>Logout</button>
      <nav>
        <ul>
          <li>
            <Link to="/attendance">View Attendance</Link>
          </li>
        </ul>
      </nav>
      <AttendanceCard />
    </div>
  );
};

export default DashboardPage;
