import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Avatar, Box, Button, Divider, ListItemIcon, ListItemText, MenuItem, Menu } from '@mui/material';
import { AccountCircle, Settings, ExitToApp } from '@mui/icons-material';

const ProfileDropdown = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getInitials = (name) => {
    if (!name) return '';
    const nameParts = name.split(' ');
    if (nameParts.length > 1) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
    }
    return name[0].toUpperCase();
  };

  return (
    <div>
      <Button onClick={handleClick} color="inherit">
        <Avatar sx={{ width: 40, height: 40, mr: 1 }}>
          {user && user.profile_picture ? (
            <img src={user.profile_picture} alt="Profile" style={{ width: '100%', height: '100%' }} />
          ) : (
            getInitials(user ? `${user.first_name} ${user.last_name}` : '')
          )}
        </Avatar>
        <Box sx={{ textAlign: 'left' }}>
          <Typography variant="subtitle1" component="div">
            {user ? `${user.first_name} ${user.last_name}` : 'Guest'}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {user ? user.role : ''}
          </Typography>
        </Box>
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={() => navigate('/profile')}>
          <ListItemIcon>
            <AccountCircle fontSize="small" />
          </ListItemIcon>
          <ListItemText>My Profile</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => navigate('/settings')}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          <ListItemText>Settings</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <ExitToApp fontSize="small" />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default ProfileDropdown;
