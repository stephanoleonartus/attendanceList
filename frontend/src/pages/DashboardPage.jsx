import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';
import AttendanceCard from '../components/AttendanceCard';

const DashboardPage = () => {
  const { user, logout } = useAuth();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              Welcome, {user?.username}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {user?.is_staff ? 'Admin' : 'Employee'}
            </Typography>
            <Button variant="contained" onClick={logout}>Logout</Button>
            <Button component={Link} to="/attendance" sx={{ ml: 2 }}>
              View Attendance
            </Button>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <AttendanceCard />
      </Grid>
    </Grid>
  );
};

export default DashboardPage;
