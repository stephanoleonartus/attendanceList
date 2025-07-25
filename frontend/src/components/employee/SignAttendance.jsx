import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import { checkLocation } from '../pages/geolocation';

const SignAttendance = () => {
  const [status, setStatus] = useState('idle'); // idle, checking, success, error
  const [message, setMessage] = useState('');
  const [locationStatus, setLocationStatus] = useState(null);
  const { user } = useAuth();

  const handleCheckIn = async () => {
    setStatus('checking');
    try {
      // Check if user is in allowed location
      const isInLocation = await checkLocation();
      setLocationStatus(isInLocation ? 'success' : 'error');
      
      if (!isInLocation) {
        setMessage('You must be within the work area to check in');
        setStatus('error');
        return;
      }
      
      // TODO: Send check-in request to API
      setTimeout(() => {
        setStatus('success');
        setMessage('Checked in successfully!');
      }, 1000);
    } catch (error) {
      setStatus('error');
      setMessage(error.message || 'Failed to check in');
    }
  };

  const handleCheckOut = async () => {
    setStatus('checking');
    try {
      // TODO: Send check-out request to API
      setTimeout(() => {
        setStatus('success');
        setMessage('Checked out successfully!');
      }, 1000);
    } catch (error) {
      setStatus('error');
      setMessage(error.message || 'Failed to check out');
    }
  };

  return (
    <div className="sign-attendance">
      <h2>Attendance</h2>
      <div className="attendance-status">
        {status === 'idle' && (
          <div className="action-buttons">
            <button className="check-in" onClick={handleCheckIn}>Check In</button>
            <button className="check-out" onClick={handleCheckOut}>Check Out</button>
          </div>
        )}
        {status === 'checking' && <p>Processing...</p>}
        {status === 'success' && <p className="success">{message}</p>}
        {status === 'error' && <p className="error">{message}</p>}
      </div>
      {locationStatus === 'error' && (
        <div className="location-warning">
          <p>You are not within the designated work area.</p>
        </div>
      )}
    </div>
  );
};

export default SignAttendance;