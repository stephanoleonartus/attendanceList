import React, { useState } from 'react';
import Header from '../components/Header';
import WorkHoursCard from '../components/WorkHoursCard.jsx';
import AttendanceCard from '../components/AttendanceCard';
import { useAuth } from '../hooks/useAuth';

export default function HomePage() {
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const { user } = useAuth();

  return (
    <div className="app-layout">
      <Header user={user} />
      
      <div className="main-content">
        <div className="content-area">
          <div className="dashboard-welcome">
            <h2>Welcome back, {user ? user.first_name : 'Guest'}! 👋</h2>
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
