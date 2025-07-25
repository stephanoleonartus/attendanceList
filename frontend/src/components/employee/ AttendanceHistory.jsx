import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';

const AttendanceHistory = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    // TODO: Fetch attendance history from API
    const mockData = [
      { date: '2023-05-01', checkIn: '08:55', checkOut: '17:05', status: 'Present' },
      { date: '2023-05-02', checkIn: '09:05', checkOut: '17:10', status: 'Late' },
      { date: '2023-05-03', checkIn: '08:50', checkOut: '16:30', status: 'Early Departure' },
    ];
    setAttendance(mockData);
    setLoading(false);
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="attendance-history">
      <h2>Attendance History</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map((record, index) => (
            <tr key={index}>
              <td>{record.date}</td>
              <td>{record.checkIn}</td>
              <td>{record.checkOut || '-'}</td>
              <td>{record.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceHistory;