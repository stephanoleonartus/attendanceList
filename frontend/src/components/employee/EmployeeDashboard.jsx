import React from 'react';
import './EmployeeDashboard.css';

const EmployeeDashboard = () => {
  return (
    <div className="employee-dashboard">
      <div className="sidebar">
        {/* Profile will go here */}
      </div>
      <div className="main-content">
        <div className="header">
          {/* Notification bell will go here */}
        </div>
        <div className="content">
          <div className="left-column">
            <div className="time-box">
              {/* Time counter will go here */}
            </div>
            <div className="location-box">
              {/* Location identifier will go here */}
            </div>
          </div>
          <div className="actions-box">
            <button>Check In</button>
            <button>Check Out</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;