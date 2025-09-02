import React, { useState } from 'react';

export default function AttendanceCard({ onCheckIn, onCheckOut }) {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every second
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCheckIn = () => {
    const now = new Date();
    setIsCheckedIn(true);
    onCheckIn(now.toISOString());
  };

  const handleCheckOut = () => {
    const now = new Date();
    setIsCheckedIn(false);
    onCheckOut(now.toISOString());
  };

  const formatCurrentTime = () => {
    return currentTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatCurrentDate = () => {
    return currentTime.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="card">
      <h3>📋 Attendance Tracker</h3>
      
      <div className="attendance-info">
        <div className="current-time">
          <div className="time-display">{formatCurrentTime()}</div>
          <div className="date-display">{formatCurrentDate()}</div>
        </div>
      </div>

      <div className="attendance-status">
        <div className={`status-indicator ${isCheckedIn ? 'checked-in' : 'checked-out'}`}>
          <span className="status-dot"></span>
          {isCheckedIn ? 'Currently Working' : 'Not Clocked In'}
        </div>
      </div>

      <div className="attendance-actions">
        {!isCheckedIn ? (
          <button 
            className="btn-check-in"
            onClick={handleCheckIn}
          >
            <span className="btn-icon">🕐</span>
            Check In
          </button>
        ) : (
          <button 
            className="btn-check-out"
            onClick={handleCheckOut}
          >
            <span className="btn-icon">🕐</span>
            Check Out
          </button>
        )}
      </div>

      <div className="attendance-note">
        <small>
          {!isCheckedIn 
            ? "Click 'Check In' to start your work day" 
            : "Don't forget to check out when you're done!"
          }
        </small>
      </div>
    </div>
  );
}