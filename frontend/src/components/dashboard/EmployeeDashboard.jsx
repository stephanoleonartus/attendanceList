import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import AttendanceCard from '../AttendanceCard';

const EmployeeDashboard = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        setError('Unable to retrieve location.');
      }
    );
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <AttendanceCard />
      </Grid>
      <Grid item xs={12} md={6}>
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
            {error && <Typography color="error">{error}</Typography>}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default EmployeeDashboard;
