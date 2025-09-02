import React, { useEffect, useState } from 'react';

export default function WorkHoursCard({ checkInTime, checkOutTime }) {
  const [workDuration, setWorkDuration] = useState('0h 0m');
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (checkInTime && checkOutTime) {
      const durationMs = new Date(checkOutTime) - new Date(checkInTime);
      const hours = Math.floor(durationMs / (1000 * 60 * 60));
      const minutes = Math.floor((durationMs / (1000 * 60)) % 60);
      setWorkDuration(`${hours}h ${minutes}m`);
      setIsActive(false);
    } else if (checkInTime && !checkOutTime) {
      setIsActive(true);
      // Update duration in real-time when checked in
      const interval = setInterval(() => {
        const now = new Date();
        const durationMs = now - new Date(checkInTime);
        const hours = Math.floor(durationMs / (1000 * 60 * 60));
        const minutes = Math.floor((durationMs / (1000 * 60)) % 60);
        setWorkDuration(`${hours}h ${minutes}m`);
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setWorkDuration('0h 0m');
      setIsActive(false);
    }
  }, [checkInTime, checkOutTime]);

  const formatTime = (date) => {
    if (!date) return '--:--';
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="card">
      <h3>🕒 Work Time Tracker</h3>

      <div className="work-time-display">
        <div className="duration-container">
          <span className="duration-label">Total Duration</span>
          <div className={`duration-value ${isActive ? 'active' : ''}`}>
            {workDuration}
            {isActive && <span className="pulse-dot"></span>}
          </div>
        </div>
      </div>

      <div className="time-details">
        <div className="time-detail-item">
          <span className="detail-label">Check In:</span>
          <span className="detail-value">{formatTime(checkInTime)}</span>
        </div>
        <div className="time-detail-item">
          <span className="detail-label">Check Out:</span>
          <span className="detail-value">{formatTime(checkOutTime)}</span>
        </div>
      </div>

      {isActive && (
        <div className="active-indicator">
          <span className="indicator-dot"></span>
          Currently working
        </div>
      )}
    </div>
  );
}