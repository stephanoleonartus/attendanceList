import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import AttendanceCard from '../AttendanceCard';
import WorkHoursCard from '../WorkHoursCard';
import api from '../../services/api';

const EmployeeDashboard = () => {
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState('');
  const [todaysAttendance, setTodaysAttendance] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        setLocationError('Unable to retrieve location.');
      }
    );

    const fetchTodaysAttendance = async () => {
      try {
        const response = await api.get('/attendance/history/');
        const today = new Date().toISOString().split('T')[0];
        const todayData = response.data.find(att => att.date === today);
        setTodaysAttendance(todayData);
      } catch (error) {
        console.error("Failed to fetch today's attendance", error);
      }
    };
    fetchTodaysAttendance();
  }, []);

  const handleCheck = async (type) => {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    const formData = new FormData();
    formData.append('latitude', position.coords.latitude);
    formData.append('longitude', position.coords.longitude);
    formData.append('photo', new Blob(['']), 'dummy.jpg');

    const response = await api.post(`/attendance/${type}/`, formData);
    setTodaysAttendance(response.data);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <AttendanceCard todaysAttendance={todaysAttendance} onCheck={handleCheck} />
      </Grid>
      <Grid item xs={12} md={6}>
        <WorkHoursCard checkInTime={todaysAttendance?.check_in} checkOutTime={todaysAttendance?.check_out} />
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              My Location
            </Typography>
            {location && (
              <Typography sx={{ mt: 2 }}>
                Latitude: {location.lat}, Longitude: {location.lng}
              </Typography>
            )}
            {locationError && <Typography color="error">{locationError}</Typography>}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default EmployeeDashboard;
