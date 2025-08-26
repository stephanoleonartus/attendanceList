import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';

const AdminDashboard = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              Admin Dashboard
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Welcome, Admin!
            </Typography>
            <Button component={Link} to="/attendance" variant="contained" sx={{ mr: 2 }}>
              View All Attendance
            </Button>
            <Button component={Link} to="/user-management" variant="contained">
              Manage Users
            </Button>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              Team Attendance Summary
            </Typography>
            <Typography sx={{ mt: 2 }}>
              (Placeholder for team attendance summary)
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default AdminDashboard;
