import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Typography, Paper, Box, Avatar } from '@mui/material';

const ProfilePage = () => {
  const { user } = useAuth();

  const getInitials = (name) => {
    if (!name) return '';
    const nameParts = name.split(' ');
    if (nameParts.length > 1) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
    }
    return name[0].toUpperCase();
  };

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Profile
      </Typography>
      {user && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Avatar sx={{ width: 100, height: 100, fontSize: '2.5rem' }}>
            {user.profile_picture ? (
              <img src={user.profile_picture} alt="Profile" style={{ width: '100%', height: '100%' }} />
            ) : (
              getInitials(user.first_name + ' ' + user.last_name)
            )}
          </Avatar>
          <Box>
            <Typography variant="h6">
              {user.first_name} {user.last_name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {user.email}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Username: {user.username}
            </Typography>
          </Box>
        </Box>
      )}
    </Paper>
  );
};

export default ProfilePage;