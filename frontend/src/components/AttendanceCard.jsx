import React, { useState, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';

export default function AttendanceCard({ onCheckIn, onCheckOut, locationVerified }) {
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [showCamera, setShowCamera] = useState(false);
  const webcamRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCheck = async (e) => {
    const value = e.target.value;
    setShowCamera(true);
    setStatus(value);
  };

  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setShowCamera(false);

    if (status !== 'remote') {
      if (!locationVerified) {
        alert('Please verify your location before checking in/out');
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          await sendAttendanceRequest(status, imageSrc, latitude, longitude);
        },
        (error) => {
          alert('Unable to get location. Please enable GPS.');
          console.error('Location error:', error);
        }
      );
    } else {
      await sendAttendanceRequest(status, imageSrc);
    }
  };

  const sendAttendanceRequest = async (value, imageSrc, latitude, longitude) => {
    setIsLoading(true);

    try {
      const token = localStorage.getItem('authToken');
      const endpoint = value === 'check-in' ? '/api/attendance/check-in/' : '/api/attendance/check-out/';
      const body = {
        timestamp: new Date().toISOString(),
        photo: imageSrc,
      };
      if (latitude && longitude) {
        body.latitude = latitude;
        body.longitude = longitude;
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        if (value === 'check-in') {
          onCheckIn(new Date());
        }
        if (value === 'check-out') {
          onCheckOut(new Date());
        }
      } else {
        const errorData = await response.json();
        alert(errorData.detail || 'Failed to record attendance.');
      }
    } catch (error) {
      console.error('Attendance error:', error);
      alert('Failed to record attendance. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card">
      <h3>📌 Mark Attendance</h3>
      
      {showCamera ? (
        <div>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
          />
          <button onClick={capture}>Capture photo</button>
        </div>
      ) : (
        <div>
          <div className="attendance-status">
            <div className="current-time">
              <span className="time-label">Current Time:</span>
              <span className="time-value">{currentTime}</span>
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

            <label className={`attendance-option ${status === 'remote' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="attendance"
                value="remote"
                checked={status === 'remote'}
                onChange={handleCheck}
                disabled={isLoading}
              />
              <span className="option-icon">🏠</span>
              Remote Work
            </label>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="loading-indicator">
          <div className="mini-spinner"></div>
          <span>Recording attendance...</span>
        </div>
      )}

      {status && !isLoading && (
        <div className={`status-message ${status === 'check-in' ? 'success' : status === 'check-out' ? 'info' : 'success'}`}>
          {status === 'check-in' && '✅ Successfully checked in!'}
          {status === 'check-out' && '🏁 Successfully checked out!'}
          {status === 'remote' && '🏠 Remote work status updated!'}
        </div>
      )}
    </div>
  );
}