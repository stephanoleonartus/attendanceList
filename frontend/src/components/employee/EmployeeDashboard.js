import React, { useState } from 'react';

function EmployeeDashboard() {
  const [clockInTime, setClockInTime] = useState(null);
  const [clockOutTime, setClockOutTime] = useState(null);
  const [workingHours, setWorkingHours] = useState(null);

  const handleClockIn = () => {
    const now = new Date();
    setClockInTime(now);
    setClockOutTime(null);
    setWorkingHours(null);
  };

  const handleClockOut = () => {
    const now = new Date();
    setClockOutTime(now);
    if (clockInTime) {
      const diff = now.getTime() - clockInTime.getTime();
      const hours = Math.floor(diff / 1000 / 60 / 60);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      setWorkingHours(`${hours}h ${minutes}m`);
    }
  };

  return (
    <div className="container">
      <h1>Employee Dashboard</h1>
      <div className="attendance-form">
        <h2>Submit Attendance</h2>
        <button onClick={handleClockIn} disabled={clockInTime && !clockOutTime}>
          Clock In
        </button>
        <button onClick={handleClockOut} disabled={!clockInTime || clockOutTime}>
          Clock Out
        </button>
      </div>
      <div className="working-hours">
        <h2>Working Hours</h2>
        {clockInTime && <p>Clock In Time: {clockInTime.toLocaleTimeString()}</p>}
        {clockOutTime && <p>Clock Out Time: {clockOutTime.toLocaleTimeString()}</p>}
        {workingHours && <p>Total Hours: {workingHours}</p>}
      </div>
    </div>
  );
}

export default EmployeeDashboard;
