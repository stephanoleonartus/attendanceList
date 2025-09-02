const notifications = [
  {
    id: 1,
    title: 'Check-in Reminder',
    message: "Don't forget to check in for today",
    time: '2 hours ago',
    read: false,
  },
  {
    id: 2,
    title: 'Break Time',
    message: 'Your break time starts in 15 minutes',
    time: '4 hours ago',
    read: true,
  },
  {
    id: 3,
    title: 'Weekly Report',
    message: 'Your weekly attendance report is ready',
    time: '1 day ago',
    read: false,
  },
];

export const fetchNotifications = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(notifications);
    }, 500);
  });
};
