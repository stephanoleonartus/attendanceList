import React, { useState } from 'react';
import axios from 'axios';

const LeaveRequest = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reason, setReason] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/leave/requests/', {
                start_date: startDate,
                end_date: endDate,
                reason: reason,
            });
            // Handle successful leave request
        } catch (error) {
            console.error('Leave request failed', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Apply for Leave</h3>
            <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
            />
            <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
            />
            <textarea
                placeholder="Reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
            ></textarea>
            <button type="submit">Apply</button>
        </form>
    );
};

export default LeaveRequest;
