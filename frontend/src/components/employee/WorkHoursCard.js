import React from 'react';

const WorkHoursCard = ({ workHours }) => {
  return (
    <div className="stat-card">
      <h3>Today's Work Hours</h3>
      <p>{workHours}</p>
    </div>
  );
};

export default WorkHoursCard;
