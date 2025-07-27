import React from 'react';
import CheckIn from './CheckIn';
import CheckOut from './CheckOut';
import AttendanceHistory from './AttendanceHistory';
import LeaveRequest from './LeaveRequest';
import LeaveHistory from './LeaveHistory';

const EmployeeDashboard = () => {
    return (
        <div>
            <h2>Employee Dashboard</h2>
            <CheckIn />
            <CheckOut />
            <AttendanceHistory />
            <LeaveRequest />
            <LeaveHistory />
        </div>
    );
};

export default EmployeeDashboard;
