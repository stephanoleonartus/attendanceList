import React from 'react';
import Department from './Department';
import Designation from './Designation';
import Employee from './Employee';
import IndividualReport from './IndividualReport';
import DepartmentReport from './DepartmentReport';
import AttendancePolicy from './AttendancePolicy';
import BulkAttendance from './BulkAttendance';

const AdminDashboard = () => {
    return (
        <div>
            <h2>Admin Dashboard</h2>
            <Department />
            <Designation />
            <Employee />
            <IndividualReport />
            <DepartmentReport />
            <AttendancePolicy />
            <BulkAttendance />
        </div>
    );
};

export default AdminDashboard;
