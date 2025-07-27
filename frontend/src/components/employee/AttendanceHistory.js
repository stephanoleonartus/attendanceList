import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AttendanceHistory = () => {
    const [attendance, setAttendance] = useState([]);

    useEffect(() => {
        fetchAttendance();
    }, []);

    const fetchAttendance = async () => {
        try {
            const response = await axios.get('/api/attendance/history/');
            setAttendance(response.data);
        } catch (error) {
            console.error('Failed to fetch attendance', error);
        }
    };

    return (
        <div>
            <h3>Attendance History</h3>
            <ul>
                {attendance.map((record) => (
                    <li key={record.id}>
                        {record.date}: {record.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AttendanceHistory;
