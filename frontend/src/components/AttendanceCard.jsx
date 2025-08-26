import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Card, CardContent, Typography, Button, Box, CircularProgress, Alert } from '@mui/material';

export default function AttendanceCard() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [todaysAttendance, setTodaysAttendance] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    const fetchTodaysAttendance = async () => {
      try {
        const response = await api.get('/attendance/history/');
        const today = new Date().toISOString().split('T')[0];
        const todayData = response.data.find(att => att.date === today);
        setTodaysAttendance(todayData);
      } catch (error) {
        console.error('Failed to fetch today\'s attendance', error);
      }
    };
    fetchTodaysAttendance();
    return () => clearInterval(timer);
  }, []);

  const handleCheck = async (type) => {
    setIsLoading(true);
    setMessage('');
    setError('');

    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const formData = new FormData();
      formData.append('latitude', position.coords.latitude);
      formData.append('longitude', position.coords.longitude);
      formData.append('photo', new Blob(['']), 'dummy.jpg');

      const response = await api.post(`/attendance/${type}/`, formData);
      setMessage(`Successfully checked ${type} at ${new Date().toLocaleTimeString()}`);
      setTodaysAttendance(response.data);
    } catch (err) {
      setError(err.response?.data?.error || `Failed to check ${type}.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          Mark Attendance
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Current Time: {currentTime.toLocaleTimeString()}
        </Typography>
        {todaysAttendance && (
          <Box>
            <Typography>Check-in: {todaysAttendance.check_in}</Typography>
            <Typography>Check-out: {todaysAttendance.check_out || 'Not yet'}</Typography>
          </Box>
        )}
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleCheck('check-in')}
            disabled={isLoading || todaysAttendance?.check_in}
          >
            Check In
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleCheck('check-out')}
            disabled={isLoading || !todaysAttendance?.check_in || todaysAttendance?.check_out}
          >
            Check Out
          </Button>
        </Box>
        {isLoading && <CircularProgress sx={{ mt: 2 }} />}
        {message && <Alert severity="success" sx={{ mt: 2 }}>{message}</Alert>}
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      </CardContent>
    </Card>
  );
}