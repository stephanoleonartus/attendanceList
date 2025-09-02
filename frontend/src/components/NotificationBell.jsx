import React, { useState, useEffect } from 'react';
import { fetchNotifications } from '../services/mockApi';
import { Badge, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function NotificationBell() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications().then(setNotifications);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        size="large"
        aria-label="show new notifications"
        color="inherit"
        onClick={handleClick}
      >
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {notifications.map(notification => (
          <MenuItem key={notification.id} onClick={handleClose}>
            <Typography variant="body1">{notification.title}</Typography>
            <Typography variant="body2">{notification.message}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}