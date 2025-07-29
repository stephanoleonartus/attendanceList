import React, { useState } from 'react';

export default function AttendanceCard({ onCheckIn, onCheckOut }) {
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCheck = async (e) => {
    const value = e.target.value;
    setStatus(value);
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      if (value === 'check-in') {
        onCheckIn(new Date());
      }
      if (value === 'check-out') {
        onCheckOut(new Date());
      }
      setIsLoading(false);
    }, 1000);
  };

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="card">
      <h3>📌 Mark Attendance</h3>
      
      <div className="attendance-status">
        <div className="current-time">
          <span className="time-label">Current Time:</span>
          <span className="time-value">{getCurrentTime()}</span>
        </div>
      </div>

      <div className="attendance-options">
        <label className={`attendance-option ${status === 'check-in' ? 'selected' : ''}`}>
          <input
            type="radio"
            name="attendance"
            value="check-in"
            checked={status === 'check-in'}
            onChange={handleCheck}
            disabled={isLoading}
          />
          <span className="option-icon">🟢</span>
          Check In
        </label>

        <label className={`attendance-option ${status === 'check-out' ? 'selected' : ''}`}>
          <input
            type="radio"
            name="attendance"
            value="check-out"
            checked={status === 'check-out'}
            onChange={handleCheck}
            disabled={isLoading}
          />
          <span className="option-icon">🔴</span>
          Check Out
        </label>
      </div>

      {isLoading && (
        <div className="loading-indicator">
          <div className="mini-spinner"></div>
          <span>Processing...</span>
        </div>
      )}

      {status && !isLoading && (
        <div className={`status-message ${status === 'check-in' ? 'success' : 'info'}`}>
          {status === 'check-in' ? 
            '✅ Successfully checked in!' : 
            '🏁 Successfully checked out!'
          }
        </div>
      )}
    </div>
  );
}