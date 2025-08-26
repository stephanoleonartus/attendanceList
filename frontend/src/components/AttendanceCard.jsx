import React, { useState } from 'react';
import api from '../services/api';

export default function AttendanceCard() {
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleCheck = async (e) => {
    const value = e.target.value;
    setStatus(value);
    setIsLoading(true);
    setMessage('');

    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const formData = new FormData();
      formData.append('latitude', position.coords.latitude);
      formData.append('longitude', position.coords.longitude);
      // Photo is required by the backend, but we are not implementing it in this version.
      // We will send a dummy file.
      formData.append('photo', new Blob(['']), 'dummy.jpg');


      if (value === 'check-in') {
        await api.post('/attendance/check-in/', formData);
        setMessage('✅ Successfully checked in!');
      }
      if (value === 'check-out') {
        await api.post('/attendance/check-out/', formData);
        setMessage('🏁 Successfully checked out!');
      }
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.error || error.message}`);
    } finally {
      setIsLoading(false);
    }
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

      {message && !isLoading && (
        <div className={`status-message ${message.includes('Error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}
    </div>
  );
}