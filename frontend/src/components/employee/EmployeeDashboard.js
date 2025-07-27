import React from 'react';
import Attendance from './Attendance';
import LeaveRequest from './LeaveRequest';
import LeaveHistory from './LeaveHistory';

const EmployeeDashboard = () => {
    return (
        <div>
            <h2>Employee Dashboard</h2>
            <Attendance />
            <LeaveRequest />
            <LeaveHistory />
        </div>
    );
};

export default EmployeeDashboard;
