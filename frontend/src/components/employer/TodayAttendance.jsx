import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';

const TodayAttendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    // TODO: Fetch today's attendance from API
    const mockData = [
      { id: 1, name: 'John Doe', checkIn: '08:55', checkOut: '17:05', status: 'Present' },
      { id: 2, name: 'Jane Smith', checkIn: '09:15', checkOut: '-', status: 'Late' },
      { id: 3, name: 'Bob Johnson', checkIn: '-', checkOut: '-', status: 'Absent' },
    ];
    setAttendance(mockData);
    setLoading(false);
  }, []);

  if (loading) return <p>Loading attendance data...</p>;

  return (
    <div className="today-attendance">
      <h2>Today's Attendance</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map((record) => (
            <tr key={record.id}>
              <td>{record.name}</td>
              <td>{record.checkIn}</td>
              <td>{record.checkOut}</td>
              <td>{record.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodayAttendance;