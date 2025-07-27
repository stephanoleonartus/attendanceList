import React, { useState } from 'react';

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications] = useState([
    {
      id: 1,
      title: 'Check-in Reminder',
      message: 'Don\'t forget to check in for today',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      title: 'Break Time',
      message: 'Your break time starts in 15 minutes',
      time: '4 hours ago',
      read: true
    },
    {
      id: 3,
      title: 'Weekly Report',
      message: 'Your weekly attendance report is ready',
      time: '1 day ago',
      read: false
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const toggleNotifications = () => {
    setIsOpen(!isOpen);
  };

  const handleViewAll = (e) => {
    e.preventDefault();
    // Add navigation logic here
    console.log('View all notifications');
  };

  return (
    <div className="notification-container">
      <div className="notification-bell" onClick={toggleNotifications}>
        <div className="bell-icon">
          🔔
        </div>
        {unreadCount > 0 && (
          <div className="notification-badge">
            {unreadCount}
          </div>
        )}
      </div>

      {isOpen && (
        <div className="notification-dropdown">
          <div className="notification-header">
            <h3>Notifications</h3>
            <span className="notification-count">{unreadCount} new</span>
          </div>
          
          <div className="notification-list">
            {notifications.map(notification => (
              <div 
                key={notification.id} 
                className={`notification-item ${!notification.read ? 'unread' : ''}`}
              >
                <div className="notification-content">
                  <h4>{notification.title}</h4>
                  <p>{notification.message}</p>
                  <span className="notification-time">{notification.time}</span>
                </div>
                {!notification.read && <div className="unread-dot"></div>}
              </div>
            ))}
          </div>
          
          <div className="notification-footer">
            <button className="view-all" onClick={handleViewAll}>
              View All Notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
}