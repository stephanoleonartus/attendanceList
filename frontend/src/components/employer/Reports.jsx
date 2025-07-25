import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';

const Report = () => {
  const [reportType, setReportType] = useState('daily');
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  });
  const [reportData, setReportData] = useState([]);
  const { user } = useAuth();

  const generateReport = async () => {
    let url = '/api/reports/';
    if (reportType === 'daily') {
      url += `?type=daily&start_date=${dateRange.start}`;
    } else if (reportType === 'custom') {
      url += `?type=custom&start_date=${dateRange.start}&end_date=${dateRange.end}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      setReportData(data);
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };

  return (
    <div className="report">
      <h2>Attendance Reports</h2>
      <div className="report-controls">
        <select
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
        >
          <option value="daily">Daily Report</option>
          <option value="weekly">Weekly Report</option>
          <option value="monthly">Monthly Report</option>
          <option value="custom">Custom Range</option>
        </select>
        {reportType === 'custom' && (
          <div className="date-range">
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
            />
            <span>to</span>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
            />
          </div>
        )}
        <button onClick={generateReport}>Generate Report</button>
      </div>
      {reportData.length > 0 && (
        <div className="report-results">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Present</th>
                <th>Late</th>
                <th>Absent</th>
              </tr>
            </thead>
            <tbody>
              {reportData.map((row, index) => (
                <tr key={index}>
                  <td>{row.date}</td>
                  <td>{row.present}</td>
                  <td>{row.late}</td>
                  <td>{row.absent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Report;