import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';

const SystemSetting = () => {
  const [settings, setSettings] = useState({
    attendanceRadius: 100,
    lateThreshold: 15,
    earlyDepartureThreshold: 30
  });
  const { user } = useAuth();

  const handleSave = () => {
    // TODO: Save system settings
    console.log('Saving system settings:', settings);
  };

  return (
    <div className="system-settings">
      <h2>System Settings</h2>
      <div className="setting-group">
        <label>
          Attendance Radius (meters):
          <input
            type="number"
            value={settings.attendanceRadius}
            onChange={(e) => setSettings({...settings, attendanceRadius: e.target.value})}
          />
        </label>
      </div>
      <div className="setting-group">
        <label>
          Late Threshold (minutes):
          <input
            type="number"
            value={settings.lateThreshold}
            onChange={(e) => setSettings({...settings, lateThreshold: e.target.value})}
          />
        </label>
      </div>
      <div className="setting-group">
        <label>
          Early Departure Threshold (minutes):
          <input
            type="number"
            value={settings.earlyDepartureThreshold}
            onChange={(e) => setSettings({...settings, earlyDepartureThreshold: e.target.value})}
          />
        </label>
      </div>
      <button onClick={handleSave}>Save Settings</button>
    </div>
  );
};

export default SystemSetting;