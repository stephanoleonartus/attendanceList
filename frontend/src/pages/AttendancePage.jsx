import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../hooks/useAuth';

const AttendancePage = () => {
  const [attendance, setAttendance] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const endpoint = user.is_staff ? '/attendance/all-history/' : '/attendance/history/';
        const response = await api.get(endpoint);
        setAttendance(response.data);
      } catch (error) {
        console.error('Failed to fetch attendance', error);
      }
    };

    if (user) {
      fetchAttendance();
    }
  }, [user]);

  return (
    <div>
      <h1>Attendance History</h1>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Date</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map((record) => (
            <tr key={record.id}>
              <td>{record.user}</td>
              <td>{record.date}</td>
              <td>{record.check_in}</td>
              <td>{record.check_out}</td>
              <td>{record.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendancePage;
