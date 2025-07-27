import React, { useState } from 'react';
import axios from 'axios';

const BulkAttendance = () => {
    const [userIds, setUserIds] = useState('');
    const [status, setStatus] = useState('Present');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/administration/bulk-attendance/', {
                user_ids: userIds.split(','),
                status: status,
            });
            // Handle successful bulk update
        } catch (error) {
            console.error('Bulk update failed', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Bulk Attendance Update</h3>
            <input
                type="text"
                placeholder="User IDs (comma-separated)"
                value={userIds}
                onChange={(e) => setUserIds(e.target.value)}
            />
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
            </select>
            <button type="submit">Update</button>
        </form>
    );
};

export default BulkAttendance;
