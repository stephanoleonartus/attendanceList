import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';

const ManageWorkingHours = () => {
  const [workingHours, setWorkingHours] = useState({
    startTime: '09:00',
    endTime: '17:00',
    workingDays: [1, 2, 3, 4, 5] // Monday to Friday
  });
  const { user } = useAuth();

  const handleSave = () => {
    // TODO: Save working hours
    console.log('Saving working hours:', workingHours);
  };

  return (
    <div className="working-hours">
      <h2>Manage Working Hours</h2>
      <div className="time-settings">
        <div>
          <label>Start Time:</label>
          <input
            type="time"
            value={workingHours.startTime}
            onChange={(e) => setWorkingHours({...workingHours, startTime: e.target.value})}
          />
        </div>
        <div>
          <label>End Time:</label>
          <input
            type="time"
            value={workingHours.endTime}
            onChange={(e) => setWorkingHours({...workingHours, endTime: e.target.value})}
          />
        </div>
      </div>
      <div className="day-settings">
        <h3>Working Days</h3>
        {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day, index) => (
          <label key={day}>
            <input
              type="checkbox"
              checked={workingHours.workingDays.includes(index)}
              onChange={(e) => {
                if (e.target.checked) {
                  setWorkingHours({
                    ...workingHours,
                    workingDays: [...workingHours.workingDays, index]
                  });
                } else {
                  setWorkingHours({
                    ...workingHours,
                    workingDays: workingHours.workingDays.filter(d => d !== index)
                  });
                }
              }}
            />
            {day}
          </label>
        ))}
      </div>
      <button onClick={handleSave}>Save Settings</button>
    </div>
  );
};

export default ManageWorkingHours;