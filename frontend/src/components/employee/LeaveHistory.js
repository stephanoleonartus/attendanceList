import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LeaveHistory = () => {
    const [leaves, setLeaves] = useState([]);

    useEffect(() => {
        fetchLeaves();
    }, []);

    const fetchLeaves = async () => {
        try {
            const response = await axios.get('/api/leave/requests/');
            setLeaves(response.data);
        } catch (error) {
            console.error('Failed to fetch leave history', error);
        }
    };

    return (
        <div>
            <h3>Leave History</h3>
            <ul>
                {leaves.map((leave) => (
                    <li key={leave.id}>
                        {leave.start_date} to {leave.end_date}: {leave.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LeaveHistory;
