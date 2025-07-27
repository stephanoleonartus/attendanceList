import React, { useState } from 'react';
import axios from 'axios';

const IndividualReport = () => {
    const [userId, setUserId] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [format, setFormat] = useState('pdf');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`/api/reports/individual/${userId}/${startDate}/${endDate}/${format}/`, {
                responseType: 'blob',
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `individual_report.${format}`);
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Failed to generate report', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Individual Report</h3>
            <input
                type="text"
                placeholder="User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
            />
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
            <select value={format} onChange={(e) => setFormat(e.target.value)}>
                <option value="pdf">PDF</option>
                <option value="excel">Excel</option>
            </select>
            <button type="submit">Generate Report</button>
        </form>
    );
};

export default IndividualReport;
