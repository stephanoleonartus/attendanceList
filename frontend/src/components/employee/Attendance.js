import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Attendance = () => {
    const [attendance, setAttendance] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const response = await axios.get('/api/attendance/today/', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setAttendance(response.data);
            } catch (error) {
                console.error('Error fetching attendance', error);
            }
        };
        fetchAttendance();
    }, []);

    const handleClockIn = async () => {
        try {
            const response = await axios.post('/api/attendance/clockin/', {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setAttendance(response.data);
        } catch (error) {
            setError('Already clocked in today');
        }
    };

    const handleClockOut = async () => {
        try {
            const response = await axios.post('/api/attendance/clockout/', {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setAttendance(response.data);
        } catch (error) {
            setError('Not clocked in yet');
        }
    };

    return (
        <div className="attendance-container">
            <h2>Attendance</h2>
            {error && <p>{error}</p>}
            {attendance ? (
                <div>
                    <p>Clock In: {attendance.clock_in}</p>
                    <p>Clock Out: {attendance.clock_out || 'Not clocked out yet'}</p>
                    <button onClick={handleClockOut} disabled={attendance.clock_out}>Clock Out</button>
                </div>
            ) : (
                <button onClick={handleClockIn}>Clock In</button>
            )}
        </div>
    );
};

export default Attendance;
