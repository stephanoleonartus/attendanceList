import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, Box, CircularProgress, Alert } from '@mui/material';

export default function AttendanceCard({ todaysAttendance, onCheck }) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCheck = async (type) => {
    setIsLoading(true);
    setMessage('');
    setError('');
    try {
      await onCheck(type);
      setMessage(`Successfully checked ${type}`);
    } catch (err) {
      setError(err.message || `Failed to check ${type}.`);
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