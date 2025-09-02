import React, { useState } from 'react';
import Header from '../components/Header';
import WorkHoursCard from '../components/WorkHoursCard';
import AttendanceCard from '../components/AttendanceCard';

export default function HomePage() {
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  
  // Mock user data - replace with actual user data from your auth system
  const user = {
    name: 'John Doe',
    email: 'john.doe@company.com',
    role: 'Employee',
    avatar: 'https://via.placeholder.com/40x40/3498db/ffffff?text=JD'
  };

  return (
    <div className="app-layout">
      <Header user={user} />
      
      <div className="main-content">
        <div className="content-area">
          <div className="dashboard-welcome">
            <h2>Welcome back, {user.name}! 👋</h2>
            <p>Track your attendance and working hours efficiently</p>
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
